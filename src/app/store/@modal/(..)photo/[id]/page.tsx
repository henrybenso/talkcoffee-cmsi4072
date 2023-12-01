export default function PhotoModal({ params }) {
  const photo = images.find((p) => p.id === params.id);
  return (
    <Modal>
      <Photo photo={photo} />
    </Modal>
  );
}
