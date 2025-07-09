/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";
import { metadata } from "../Hooks/useGeneralHooks";

const MetaWrap = ({children, path}) => {
    // meta details
  const meta = metadata[path] || {};

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>
      {children}
    </>
  );
};

export default MetaWrap;
