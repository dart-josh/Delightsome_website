/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { usePageHooks } from "../Hooks/useGeneralHooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import MetaWrap from "../utils/MetaWrap";
import {
  CheckCircle,
  ChevronLeft,
  Edit,
  Edit2,
  Replace,
  Trash2,
} from "lucide-react";
import TextInput from "../components/TextInput";
import SelectDropdown from "../components/SelectDropdown";
import toast from "react-hot-toast";
import {
  add_update_products,
  delete_product,
  find_product,
  update_image,
} from "../Hooks/serverHooks";
import ImageManager, { PreviewImages } from "../components/ImageManager";
import {
  delete_image,
  fetch_image,
  replace_image,
} from "../Hooks/serveruploader";

const categoryList = [
  "Juice",
  "Smoothies",
  "Tigernut",
  "Yoghurt",
  "Granola",
  "Honey",
  "Parfait",
];

const tagList = [
  "juice",
  "smoothies",
  "tigernut",
  "yoghurt",
  "whole-foods",
  "parfait",
  "detox",
];

const ManageProducts = ({ path }) => {
  const { link } = useParams();

  const { setCurrentPage } = usePageHooks();

  const [product, setProduct] = useState();

  useEffect(() => {
    if (link) {
      setCurrentPage("Manage Product");
      get_product(link);
    } else {
      setCurrentPage("Create Product");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link]);

  useEffect(() => {
    if (product) {
      setProductData(convertProductToFormData(product));
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  async function get_product(link) {
    const prod = await find_product(link);

    if (prod != null) {
      setCurrentPage(`${"Manage " + prod.name || ""}`);
      setProduct(prod);
    } else {
      toast.error("Product not found", { id: "pnf" });
    }
  }

  const data = [
    {
      name: "name",
      label: "Product Name",
      value: product?.name ? product.name : "",
      placeholder: "e.g: Brighter Side",
      required: true,
    },
    {
      name: "slogan",
      label: "Slogan",
      value: "",
      placeholder: "e.g: Mixed Carrot Juice with Ginger",
    },
    {
      name: "link",
      label: "Product Link",
      value: "",
      placeholder: "e.g: brighter-side",
      required: true,
    },
    {
      name: "price",
      label: "Product Cost",
      value: "",
      placeholder: "",
      required: true,
    },
    {
      name: "category",
      label: "Category",
      value: "",
      placeholder: "e.g: Juice",
      required: true,
      options: categoryList.map((i) => {
        return { value: i, label: i };
      }),
    },
    {
      name: "tag",
      label: "Tags",
      value: "",
      placeholder: "e.g juice",
      options: tagList.map((i) => {
        return { value: i, label: i };
      }),
      isMulti: true,
    },
    {
      name: "productCode",
      label: "ProductCode",
      value: "",
      placeholder: "e.g: DJJCBS",
    },
    {
      name: "ingredients",
      label: "Ingredients",
      value: "",
      placeholder: "eg: date, tiger-nut",
      rows: 4,
    },
    {
      name: "healthBenefits",
      label: "Health Benefits",
      value: "",
      placeholder: "",
      rows: 4,
    },
    {
      name: "introText",
      label: "Intro Text",
      value: "",
      placeholder: "",
    },
    {
      name: "shortDescription",
      label: "Short Description",
      value: "",
      placeholder: "",
      rows: 4,
    },
    {
      name: "fullDescription",
      label: "FullDescription",
      value: "",
      placeholder: "",
      rows: 8,
    },
    {
      name: "summaryText",
      label: "Summary Text",
      value: "",
      placeholder: "",
      rows: 4,
    },
    {
      name: "isAvailable",
      label: "Availabilty",
      value: { value: true, label: "Available" },
      placeholder: "Available",
      options: [
        { value: true, label: "Available" },
        { value: false, label: "UnAvailable" },
      ],
    },
  ];

  const [productData, setProductData] = useState(data);

  const updateData = (xdata, fieldName, newValue) => {
    return xdata.map((item) => {
      if (item.name === fieldName) {
        const updatedItem = { ...item, value: newValue };

        // If the field being updated is "name", also update the "link" field
        if (fieldName === "name") {
          const slug = toSlug(newValue); // convert to slug format

          const link_index = xdata.findIndex((e) => e.name === "link");
          xdata[link_index] = { ...xdata[link_index], value: slug };
        }

        if (fieldName === "category") {
          const slug = [
            {
              value: newValue.value.toLowerCase(),
              label: newValue.label.toLowerCase(),
            },
          ]; // convert to slug format

          const link_index = xdata.findIndex((e) => e.name === "tag");
          xdata[link_index] = { ...xdata[link_index], value: slug };
        }

        return updatedItem;
      }

      // If this is the "link" field and "name" was just changed, skip — will be updated above
      if (fieldName === "name" && item.name === "link") {
        return item; // filtered out, updated already
      }

      if (fieldName === "category" && item.name === "tag") {
        return item; // filtered out, updated already
      }

      return item;
    }); // Remove nulls
  };

  function validateRequiredFields(fields) {
    const errors = {};

    fields.forEach((field) => {
      const { name, value, required } = field;

      if (!required || !name) return;

      const isEmpty =
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" &&
          !Array.isArray(value) &&
          Object.keys(value).length === 0);

      if (isEmpty) {
        errors[name] = `${field.label || name} is required.`;
      }
    });

    return errors;
  }

  const [isSubmitingForm, setIsSubmitingForm] = useState(false);
  const navigate = useNavigate();

  const submitForm = async () => {
    const errors = validateRequiredFields(productData);

    if (errors && Object.values(errors).length > 0) {
      Object.values(errors).map((v) => {
        toast.error(v, { id: v });
      });
      return;
    }

    const final_data = extractNameValueMap(productData);
    if (product?._id) final_data.id = product._id;

    setIsSubmitingForm(true);
    const response = await add_update_products(final_data);

    setIsSubmitingForm(false);

    if (response.success) {
      setProduct(response.product);
      setEditForm(false);

      if (response.product?.link)
        navigate(`/manage-product/${response.product.link}`, { replace: true });

      toast.success(response.message, { id: response.message });
    } else {
      toast.error(response.message, { id: response.message });
    }
  };

  const [editForm, setEditForm] = useState(link ? false : true);
  const [editImage, setEditImage] = useState(false);

  const [previewFiles, setPreviewFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [replaceIndexRef, setReplaceIndexRef] = useState(null);

  async function call_update_img(images) {
    return await update_image({
      link: product?.link || link,
      images,
    });
  }

  async function updateImg(images) {
    const response = await call_update_img([...product.images, ...images]);

    if (response.success) {
      setProduct(response.product);
      setEditImage(false);

      toast.success(response.message, { id: response.message });
    } else {
      toast.error(response.message, { id: response.message });
    }
  }

  async function replaceImg(image, index) {
    const imgs = product.images;
    if (image === "delete") {
      imgs.splice(index, 1);
    } else {
      imgs[index] = image;
    }
    const response = await call_update_img(imgs);

    if (response.success) {
      setProduct(response.product);
      setEditImage(false);

      toast.success(response.message, { id: response.message });
    } else {
      toast.error(response.message, { id: response.message });
    }
  }

  async function uploadImg({ prevImg, img, index }) {
    try {
      // Convert to File (if not already)
      let file = img.file;
      if (!file) {
        const res = await fetch(img.url);
        const blob = await res.blob();
        file = new File([blob], img.name || "", {
          type: blob.type || "image/jpeg",
        });
      }

      // Upload image with progress tracking
      const uploaded = await replace_image(
        prevImg.replace("/products/", ""),
        file,
      );

      if (uploaded?.url) {
        replaceImg(uploaded?.url, index);
      } else {
        toast.error(`Failed to upload image ${img.name || ""}`);
      }
    } catch (err) {
      console.error(`Error uploading image:`, err);
      toast.error(`Upload failed for image ${img.name || ""}`);
    }
  }

  const confirmAddImage = async ({ fileList = previewFiles, images }) => {
    if (!images || images.length === 0) return;

    const preview = fileList[0];
    const file = preview.file;
    const name = file.name;
    const url = preview.url;
    const id = replaceIndexRef;

    if (id == null || !images[id]) {
      toast.error("Invalid Image Request", { id: "pfn" });
      return;
    }

    const newImage = { id: `${Date.now()}-${id}`, url, name, file };

    await uploadImg({ prevImg: images[id], img: newImage, index: id });

    setReplaceIndexRef(null);
    setPreviewFiles([]);
  };

  const triggerFileInput = (replaceIndex) => {
    setReplaceIndexRef(replaceIndex);
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviewFiles(previews);
    e.target.value = "";
  };

  async function deleteImg(index) {
    const img = product?.images[index];

    if (!img) {
      return toast.error("Invalid Image", { id: "pfn" });
    }

    const conf = confirm("Are you sure you want to delete this image?");

    if (!conf) return;

    const deleted = await delete_image(img.replace("/products/", ""));

    replaceImg("delete", index);

    if (deleted?.success) {
      // replaceImg('delete', index);
    } else {
      toast.error(`Failed to delete image ${img.name || ""}`);
    }
  }

  async function placeholderFn() {
    const conf = confirm('Use the default Placeholder Image for this product');

    if (!conf) return;
    
    const response = await call_update_img(['/products/placeholder.png']);

    if (response.success) {
      setProduct(response.product);
      setEditImage(false);

      toast.success(response.message, { id: response.message });
    } else {
      toast.error(response.message, { id: response.message });
    }
  }

  return (
    <MetaWrap path={path}>
      <div className="xs:px-1 xs:mx-5 relative mx-4 mb-32 max-w-[1200px] justify-center pt-5 sm:px-5 md:mx-auto md:px-10">
        {/* Top bar */}
        <div className="block">
          <div className="text-md mb-6 flex justify-between">
            <div className="flex gap-3">
              <Link to="/dashboard">Dashboard</Link>
              <span>/</span>
              <span>{product?.name}</span>
            </div>

            <div
              onClick={() => navigate(-1)}
              className="flex cursor-pointer items-center gap-3 text-black"
            >
              <ChevronLeft size={18} />
              <span>Previous Page</span>
            </div>
          </div>

          {/* Page Title */}
          <div className="mb-8 flex items-center text-2xl font-bold">
            {!link
              ? "Create Product"
              : `${editForm ? "Manage" : ""} ${product?.name || "No Product"}`}

            {product && (
              <div
                className="ml-4 cursor-pointer rounded-full border border-gray-300 bg-gray-300 p-2 text-gray-800 shadow-md transition duration-300 hover:scale-110 hover:border-green-800 hover:bg-transparent hover:text-green-800"
                onClick={() => {
                  setProductData(convertProductToFormData(product));
                  setEditForm(!editForm);
                }}
              >
                {(editForm && <CheckCircle size={22} />) || <Edit size={22} />}
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        {((!link || product) && (
          <div className="">
            {/* product form */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {productData.map((data, index) => {
                return (
                  <div key={index}>
                    <InputComponent
                      label={data.label}
                      name={data.name}
                      value={data.value}
                      setValue={(value) => {
                        const updatedData = updateData(
                          productData,
                          data.name,
                          value,
                        );

                        setProductData(updatedData);
                      }}
                      placeholder={data.placeholder}
                      type={data.name === "price" ? "num" : "text"}
                      required={data.required}
                      rows={data.rows}
                      options={data.options}
                      isMulti={data.isMulti}
                      readOnly={!editForm}
                    />
                  </div>
                );
              })}
            </div>

            {editForm && (
              <div className="flex justify-end lg:justify-center">
                <div className="ml mt-10 flex w-full flex-col gap-4 md:w-1/2 lg:w-1/3">
                  <SubmitButton
                    onClick={submitForm}
                    loading={isSubmitingForm}
                    product={product}
                  />

                  <DeleteButton link={product?.link} />
                </div>
              </div>
            )}

            {product?._id && (
              <div>
                <div className="mt-10 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-100 p-3 text-lg font-semibold">
                  Images
                  <div
                    className="cursor-pointer rounded-full border border-gray-300 bg-gray-300 p-2 text-gray-800 shadow-md transition duration-300 hover:scale-110 hover:border-green-800 hover:bg-transparent hover:text-green-800"
                    onClick={() => {
                      setEditImage(!editImage);
                    }}
                  >
                    {(editImage && <CheckCircle size={20} />) || (
                      <Edit2 size={20} />
                    )}
                  </div>
                </div>
                <ImageComponent
                  images={product.images}
                  editImage={editImage}
                  onReplace={triggerFileInput}
                  onDelete={deleteImg}
                />
              </div>
            )}

            {editImage && (
              <div>
                <ImageManager
                  MAX_IMAGES={3 - product.images.length}
                  updateImageField={updateImg}
                  placeholderFn={placeholderFn}
                />
              </div>
            )}
          </div>
        )) || <div className="min-h-[300px]"></div>}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Preview Modal */}
      {previewFiles.length > 0 && (
        <PreviewImages
          previewFiles={previewFiles}
          cancelFn={() => setPreviewFiles([])}
          confirmFn={() => confirmAddImage({ images: product?.images || [] })}
        />
      )}
    </MetaWrap>
  );
};

const InputComponent = ({
  label,
  name,
  value,
  setValue,
  placeholder,
  type,
  required,
  rows,
  options,
  isMulti,
  readOnly = true,
}) => {
  const [error, setError] = useState("");

  // Remove commas and non-digit characters
  const removeFormatting = (str) => str.replace(/[^0-9]/g, "");

  const handleChange = (e) => {
    if (type === "num") {
      const raw = removeFormatting(e.target.value);
      setValue(raw);
    } else {
      setValue(e.target.value);
    }
    if (required) setError(e.target.value ? "" : "This field is required");
  };

  const handleSelectChange = (selected) => {
    setValue(selected);
    if (required) setError(selected ? "" : "This field is required");
  };

  return (
    <div className="w-full">
      {(options && (
        <SelectDropdown
          label={label}
          options={options}
          value={value}
          isMulti={isMulti}
          onChange={handleSelectChange}
          error={error}
          required={required}
          readOnly={readOnly}
        />
      )) || (
        <TextInput
          label={label}
          name={name}
          value={value}
          onChange={handleChange}
          error={error}
          type={type}
          placeholder={placeholder}
          rows={rows}
          required={required}
          readOnly={readOnly}
        />
      )}
    </div>
  );
};

const ImageComponent = ({ images, onReplace, onDelete, editImage }) => {
  return (
    <div className="xs:grid-cols-2 mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
      {images &&
        images.map((img, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 rounded-lg border bg-white p-4 shadow-md"
          >
            {/* Main Image */}
            <img
              src={fetch_image(img)}
              alt={`Main ${index}`}
              className="h-full w-full rounded object-cover"
            />

            {/* Thumbnail */}
            <img
              src={fetch_image(img)}
              alt={`Thumb ${index}`}
              className="h-16 w-16 rounded border object-cover"
            />

            {/* Action Buttons */}
            {editImage && (
              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => onReplace(index)}
                  className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
                  title="Replace Image"
                >
                  <Replace size={18} />
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="rounded bg-red-600 p-2 text-white hover:bg-red-700"
                  title="Delete Image"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

const SubmitButton = ({
  onClick,
  loading = false,
  product,
  text = product?._id ? "Update" : "Submit",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`w-full rounded-2xl px-6 py-3 font-semibold text-white transition-all duration-300 ${loading ? "animate-pulse cursor-not-allowed bg-green-400" : "bg-green-600 shadow-md hover:bg-green-700"} `}
    >
      {loading ? (text === "Update" ? "Updating..." : "Submitting...") : text}
    </button>
  );
};

const DeleteButton = ({ link }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  return (
    <button
      onClick={async () => {
        if (!link) {
          return toast.error("Invalid product", { id: "ipl" });
        }

        const conf = confirm(
          "You are about to delete this product. This cannot be undone",
        );

        if (!conf) return;

        setIsDeleting(true);
        const del = await delete_product(link);
        setIsDeleting(false);

        if (del.success) {
          toast.success("Product Deleted", { id: "pll" });
          navigate("/dashboard");
        } else {
          toast.error("Delete Failed", { id: "dlm" });
        }
      }}
      disabled={isDeleting}
      className={`w-full rounded-2xl px-6 py-3 font-semibold text-white transition-all duration-300 ${isDeleting ? "animate-pulse cursor-not-allowed bg-red-400" : "bg-red-600 shadow-md hover:bg-red-700"} `}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
};

//? FUNCTIONS

function convertProductToFormData(product) {
  return [
    {
      name: "name",
      label: "Product Name",
      value: product?.name || "",
      placeholder: "e.g: Brighter Side",
      required: true,
    },
    {
      name: "slogan",
      label: "Slogan",
      value: product?.slogan || "",
      placeholder: "e.g: Mixed Carrot Juice with Ginger",
    },
    {
      name: "link",
      label: "Page Link",
      value: product?.link || "",
      placeholder: "e.g: brighter-side",
    },
    {
      name: "price",
      label: "Product Cost",
      value: "" + product?.price || "",
      placeholder: "",
      required: true,
    },
    {
      name: "category",
      label: "Category",
      value: product?.category
        ? { value: product.category, label: product.category }
        : "",
      placeholder: "e.g: Juice",
      required: true,
      options: categoryList.map((i) => {
        return { value: i, label: i };
      }),
    },
    {
      name: "tag",
      label: "Tags",
      value: product?.tag
        ? product.tag.split(", ").map((p) => {
            return { value: p, label: p };
          })
        : "",
      placeholder: "e.g juice",
      options: tagList.map((i) => {
        return { value: i, label: i };
      }),
      isMulti: true,
    },
    {
      name: "productCode",
      label: "ProductCode",
      value: product?.productCode || "",
      placeholder: "e.g: DJJCBS",
    },
    {
      name: "ingredients",
      label: "Ingredients",
      value: product?.ingredients || "",
      placeholder: "eg: date. tiger-nut",
      rows: 4,
    },
    {
      name: "healthBenefits",
      label: "Health Benefits",
      value: product?.healthBenefits || "",
      placeholder: "",
      rows: 4,
    },
    {
      name: "introText",
      label: "Intro Text",
      value: product?.introText || "",
      placeholder: "",
    },
    {
      name: "shortDescription",
      label: "Short Description",
      value: product?.shortDescription || "",
      placeholder: "",
      rows: 4,
    },
    {
      name: "fullDescription",
      label: "FullDescription",
      value: product?.fullDescription || "",
      placeholder: "",
      rows: 8,
    },
    {
      name: "summaryText",
      label: "Summary Text",
      value: product?.summaryText || "",
      placeholder: "",
      rows: 4,
    },
    {
      name: "isAvailable",
      label: "Availabilty",
      value: {
        value: product?.isAvailable ? true : false,
        label: product?.isAvailable ? "Available" : "UnAvailable",
      },
      placeholder: "Available",
      options: [
        { value: true, label: "Available" },
        { value: false, label: "UnAvailable" },
      ],
    },
  ];
}

function extractNameValueMap(fields) {
  const result = {};

  fields.forEach((field) => {
    const { name, value } = field;

    if (!name) return;

    // Handle multi-select or array values (e.g. value is an array of objects)
    if (Array.isArray(value)) {
      result[name] = value.map((item) => item.value).join(", ");
    }
    // Handle objects with 'value' inside (e.g. { label: 'Juice', value: 'Juice' })
    else if (value && typeof value === "object" && "value" in value) {
      result[name] = value.value;
    }
    // Handle primitive values
    else {
      if (name === "price") {
        result[name] = Number(value);
      } else {
        result[name] = value;
      }
    }
  });

  return result;
}

function toSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove non-word characters
    .replace(/--+/g, "-"); // Replace multiple hyphens with one
}

export default ManageProducts;
