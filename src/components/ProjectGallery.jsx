export default function ProjectGallery({ images, onImageClick }) {
  return (
    <div className="gallery-compact">
      {images.map((src) => (
        <button
          key={src}
          type="button"
          className="gallery-item"
          style={{ backgroundImage: `url(${src})` }}
          onClick={() => onImageClick(`url("${src}")`)}
          aria-label="View image"
        />
      ))}
    </div>
  );
}
