import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { ReactPlayerComponent } from "@/app/components/ReactPlayerComponent";
/**
 * Props for `ReactPlayerMp4`.
 */
export type ReactPlayerMp4Props =
  SliceComponentProps<Content.ReactPlayerMp4Slice>;

/**
 * Component for "ReactPlayerMp4" Slices.
 */
const ReactPlayerMp4: FC<ReactPlayerMp4Props> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <p>react_player_mp4</p>
      <br />
      <div className="w-[100vw] h-[100vh] block relative bg-green-800 mb-[400px]">
        <ReactPlayerComponent source={slice.primary.video.url} />
      </div>
      {/* <video autoPlay controls>
        <source src={slice.primary.video.url} type="video/mp4" />
      </video> */}
    </section>
  );
};

export default ReactPlayerMp4;
