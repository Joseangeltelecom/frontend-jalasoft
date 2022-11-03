import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteError } from "../../features/error/errorSlice";
import "./ErrorView.css";

const ErrorView = () => {
  const { error } = useAppSelector((state) => state.error);
  const dispatch = useAppDispatch();
  console.log(error);

  return (
    <div>
      {error.map((error) => (
        <div className="errorMessage">
          <p key={error.id}>{error.text}</p>
          <button
            style={{ color: "red" }}
            onClick={() => dispatch(deleteError({ id: error.id }))}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default ErrorView;
