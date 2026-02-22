interface TrailerPlayerProps {
    url: string;
}

const TrailerPlayer = ({ url }: TrailerPlayerProps) => {
    return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-secondary">
            <iframe
                src={url}
                title="Movie Trailer"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default TrailerPlayer;
