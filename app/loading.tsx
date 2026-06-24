import Pic from "@/components/image/Pic";

export default function() { 
    return (
        <div role="heading" className="absolute inset-0 bg-foreground">
            <Pic 
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