export const DiasyToast = ({data}) => {
  return (
    <div className="toast toast-center toast-top">
      <div className="alert alert-success">
        <span>{data}</span>
      </div>
    </div>
  );
};
