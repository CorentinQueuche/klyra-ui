import React from "react";

const Image = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    priority?: boolean;
  }
>(({ fill, priority: _priority, ...props }, ref) => (
  <img
    ref={ref}
    {...props}
    style={fill ? { objectFit: "cover", width: "100%", height: "100%", ...props.style } : props.style}
  />
));

Image.displayName = "Image";

export default Image;
