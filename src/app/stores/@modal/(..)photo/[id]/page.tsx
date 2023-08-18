export default function PhotoModal({ params }) {
  const photo = photos.find((p) => p.id === params.id);
  return (
    <Modal>
      <Photo photo={photo} />
    </Modal>
  );
}
