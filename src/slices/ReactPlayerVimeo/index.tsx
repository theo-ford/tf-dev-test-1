import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { ReactPlayerVimeoComponent } from "@/app/components/ReactPlayerVimeoComponent";

/**
 * Props for `ReactPlayerVimeo`.
 */
export type ReactPlayerVimeoProps =
  SliceComponentProps<Content.ReactPlayerVimeoSlice>;

/**
 * Component for "ReactPlayerVimeo" Slices.
 */
const ReactPlayerVimeo: FC<ReactPlayerVimeoProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <p>react_player_vimeo</p>
      <br />
      <div className="w-[100vw] h-[100vh] block relative bg-green-800 mb-[400px]">
        <ReactPlayerVimeoComponent
          source={slice.primary.vimeo_embed.embed_url}
        />
      </div>
    </section>
  );
};

export default ReactPlayerVimeo;
