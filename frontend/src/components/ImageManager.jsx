/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import toast from "react-hot-toast";

import { GripVertical, Upload } from "lucide-react"; // or any icon library
import { upload_image } from "../Hooks/serveruploader";

export default function ImageManager({ MAX_IMAGES = 3, updateImageField, placeholderFn }) {
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [previewFiles, setPreviewFiles] = useState([]);
  const fileInputRef = useRef(null);
  const replaceIndexRef = useRef(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const [isUploading, setIsUploading] = useState(false);

  const triggerFileInput = (replaceIndex = null) => {
    if (images.length >= MAX_IMAGES && replaceIndex === null) {
      toast.error(`Upload limit reached`);
      return;
    }
    replaceIndexRef.current = replaceIndex;
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    if (replaceIndexRef.current !== null && previews.length === 1) {
      confirmAddImage(previews, true);
    } else {
      const remaining = MAX_IMAGES - images.length;
      setPreviewFiles(previews.slice(0, remaining));
    }

    e.target.value = "";
  };

  const confirmAddImage = (fileList = previewFiles, isReplace = false) => {
    const startIndex = images.length;

    fileList.forEach((preview, i) => {
      const file = preview.file;
      const name = file.name;
      const url = preview.url;
      const id = isReplace ? replaceIndexRef.current : startIndex + i;

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress((prev) => ({ ...prev, [id]: progress }));

        if (progress >= 100) {
          clearInterval(interval);
          const newImage = { id: `${Date.now()}-${i}`, url, name };

          setImages((prev) => {
            const copy = [...prev];
            if (isReplace) {
              copy[id] = newImage;
              replaceIndexRef.current = null;
              return copy;
            } else {
              return [...copy, newImage];
            }
          });

          setPreviewFiles([]);
        }
      }, 100);
    });
  };

  const deleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setUploadProgress((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);
      setImages((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const uploadImage = async (images) => {
    setIsUploading(true);
    try {
      const updated = [...images];

      // Build an array of upload promises
      const uploadPromises = images.map((img, index) => {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
          try {
            // Convert to File (if not already)
            let file = img.file;
            if (!file) {
              const res = await fetch(img.url);
              const blob = await res.blob();
              file = new File([blob], img.name || `image-${index}.jpg`, {
                type: blob.type || "image/jpeg",
              });
            }

            // Show progress initially
            setUploadProgress((prev) => ({ ...prev, [index]: 0 }));

            // Upload image with progress tracking
            const uploaded = await upload_image(file, (progressEvent) => {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              setUploadProgress((prev) => ({ ...prev, [index]: percent }));
            });

            if (uploaded?.url) {
              updated[index] = {
                ...updated[index],
                url: uploaded.url,
                name: uploaded.filename,
              };
              setUploadProgress((prev) => ({ ...prev, [index]: 100 }));
            } else {
              toast.error(`Failed to upload image ${img.name || index + 1}`);
            }

            resolve(); // resolve each Promise
          } catch (err) {
            console.error(`Error uploading image ${index}:`, err);
            toast.error(`Upload failed for image ${img.name || index + 1}`);
            resolve(); // still resolve so Promise.all doesn't hang
          }
        });
      });

      // Run all uploads concurrently
      await Promise.all(uploadPromises);

      // Update state once all are done
      setImages(updated);

      await updateImageField(updated.map((img) => img.url));
      setImages([]);
      setIsUploading(false);
    } catch (err) {
      setIsUploading(false);
      console.error("Upload process failed:", err);
      toast.error("Something went wrong while uploading images.");
    }
  };

  return (
    <div className="space-y-6">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Sortable List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={images.map((img) => img.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-6">
            {images.map((img, index) => (
              <SortableItem
                key={img.id}
                id={img.id}
                index={index}
                image={img}
                onDelete={() => deleteImage(index)}
                onReplace={() => triggerFileInput(index)}
                progress={uploadProgress[index] || 100}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add Button */}
      {
        <div className="xs:flex-row xs:items-center flex flex-col items-start gap-5">
          <button
            onClick={() => triggerFileInput()}
            disabled={images.length >= MAX_IMAGES}
            className={`rounded px-4 py-2 ${
              images.length >= MAX_IMAGES
                ? "cursor-not-allowed bg-gray-400"
                : "bg-orange-600 text-white"
            }`}
          >
            Add Image ({images.length}/{MAX_IMAGES})
          </button>

          {images && images.length > 0 && (
            <button
              onClick={() => uploadImage(images)}
              disabled={isUploading}
              className={`flex items-center gap-2 rounded bg-green-600 px-4 py-2 text-white`}
            >
              <Upload size={22} /> Update Images
            </button>
          ) || <button
              onClick={() => placeholderFn()}
              disabled={isUploading}
              className={`flex items-center gap-2 rounded bg-gray-600 px-4 py-2 text-white`}
            >
              Use Placeholder
            </button>}
        </div>
      }

      {/* Preview Modal */}
      {previewFiles.length > 0 && <PreviewImages previewFiles={previewFiles} cancelFn={() => setPreviewFiles([])} confirmFn={() => confirmAddImage()} />}
    </div>
  );
}

export const PreviewImages = ({previewFiles, cancelFn, confirmFn }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">Preview Images</h2>
        <div className="mb-4 max-h-[300px] space-y-4 overflow-y-auto">
          {previewFiles.map((preview, i) => (
            <div key={i} className="flex items-center gap-4">
              <img
                src={preview.url}
                alt={`preview-${i}`}
                className="h-20 w-20 rounded border object-cover"
              />
              <p className="break-all text-sm">{preview.file.name}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between gap-4">
          <button
            onClick={cancelFn}
            className="w-full rounded bg-gray-300 py-2 text-black"
          >
            Cancel
          </button>
          <button
            onClick={confirmFn}
            className="w-full rounded bg-blue-600 py-2 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Sortable wrapper for each image item
function SortableItem({ id, index, image, onDelete, onReplace, progress }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 border-b pb-3"
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-move p-2"
        title="Drag to reorder"
      >
        <GripVertical className="text-gray-400" />
      </div>

      <img
        src={image.url}
        alt={`Img-${index}`}
        className="h-24 w-24 rounded border object-cover"
      />
      <div className="flex-1">
        <p className="break-all text-sm font-medium">{image.name}</p>
        {progress < 100 && (
          <div className="mt-1 h-1 w-full rounded bg-gray-200">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        <div className="mt-2 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReplace();
            }}
            className="rounded bg-blue-500 px-3 py-1 text-xs text-white"
          >
            Replace
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="rounded bg-red-500 px-3 py-1 text-xs text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
