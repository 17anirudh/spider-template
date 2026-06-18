import { PixelatedLoadingImage } from "./image/Component";

export default function() { 
    return (
        <div role="heading" className="absolute inset-0 bg-foreground">
            <PixelatedLoadingImage 
                id="loading"
                src="/kirby.gif"
                alt="Loading"
                look="default"
                className="rounded-full"
                unoptimized
            />
        </div>
    )
}
