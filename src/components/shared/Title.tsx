import { Helmet } from "react-helmet-async";

const Title = ({
  title = "NewChat",
  description = "this is the Chat App called NewChat",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
