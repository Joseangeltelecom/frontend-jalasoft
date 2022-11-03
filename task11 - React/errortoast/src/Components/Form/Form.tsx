import { useForm, SubmitHandler } from "react-hook-form";
import "./Form.css";
import { useAppDispatch } from "../../app/hooks";
import { addError, deleteError } from "../../features/error/errorSlice";

type Inputs = {
  productName: string;
  description: string;
  price: string;
};

const uniqueId = () => Math.floor(Math.random() * Date.now());

export default function Form() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<Inputs>();

  const handleError = (errors: any) => {
    if (errors.productName) {
      const productNameId = uniqueId();
      dispatch(
        addError({ text: errors.productName?.message, id: productNameId })
      );
      setTimeout(() => dispatch(deleteError({ id: productNameId })), 3000);
    }

    if (errors.price) {
      const priceId = uniqueId();
      dispatch(addError({ text: errors.price?.message, id: priceId }));
      setTimeout(() => dispatch(deleteError({ id: priceId })), 4000);
    }

    if (errors.description) {
      const descriptionId = uniqueId();
      dispatch(
        addError({ text: errors.description?.message, id: descriptionId })
      );
      setTimeout(() => dispatch(deleteError({ id: descriptionId })), 5000);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit, handleError)}>
      <>
        <input
          placeholder="productName"
          {...register("productName", { required: "productName is Required" })}
        />
        <input
          placeholder="description"
          {...register("description", { required: "description is Required" })}
        />

        <input
          placeholder="price"
          {...register("price", {
            required: "Price is Required",
            pattern: {
              value: /\d+/,
              message: "Price is number only.",
            },
            maxLength: {
              value: 4,
              message: "The number should only have 4 digits",
            },
          })}
        />
        <button>Submit</button>
      </>
    </form>
  );
}
