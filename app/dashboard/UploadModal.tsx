import CloseIcon from "@mui/icons-material/Close";
import AddModeratorOutlinedIcon from "@mui/icons-material/AddModeratorOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { SubmitHandler, useForm } from "react-hook-form";
import useUpLoadPDF from "../hooks/useUploadPDF";
import { useRouter } from "next/navigation";

export type Inputs = {
  title: string;
  description: string;
  pdf: FileList | null;
};

const UploadModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (state: boolean) => void;
}) => {
  const router = useRouter();
  const { loading, securePDF, feedback, feedbackMessage } = useUpLoadPDF();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const canRenderChip = watch("pdf")?.[0]?.name;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const uploadData = securePDF(data);
  };

  const continueHandler = () => {
    router.push("/owlguard-ai");
  };

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto transition-all ease-in-out delay-50 ${
        isOpen ? "visible opacity-100 " : "invisible opacity-0"
      }`}
    >
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => onClose(false)}
      ></div>
      <div
        className={`flex items-center min-h-screen px-4 py-8  ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div className="relative w-fit p-4 mx-auto bg-gray-darker rounded-md shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold">Secure & Upload PDF</h3>
            <button
              title="Close"
              type="button"
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => onClose(false)}
            >
              <CloseIcon className="hover:text-white" />
            </button>
          </div>
          {!loading && !feedback ? (
            <div className="flex flex-col md:flex-row gap-2 justify-between w-fit">
              <div className=" border-gray-dark max-w-sm mx-auto  space-y-3 text-center p-4">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col"
                >
                  <div className="relative max-w-xs">
                    <input
                      autoFocus
                      type="text"
                      placeholder="Document Title"
                      className={
                        "w-full px-3 py-2 border-emerald-600 border-opacity-30 text-white bg-transparent outline-none border focus:border-emerald-600 shadow-sm rounded-lg"
                      }
                      {...register("title", { required: true })}
                    />
                    <div className="text-red-500 max-w-xs text-left text-xs pl-2 h-7">
                      {errors.title && (
                        <span className="">Title is required</span>
                      )}
                    </div>
                  </div>
                  <div className="relative max-w-xs">
                    <textarea
                      placeholder="Document Description"
                      className={`w-full px-3 py-2 border-emerald-600 border-opacity-30 text-white bg-transparent outline-none border focus:border-emerald-600 shadow-sm rounded-lg h-20`}
                      {...register("description", { required: true })}
                    />
                    <div className="text-red-500 max-w-xs text-left text-xs pl-2 h-7">
                      {errors.description && (
                        <span className="">Description is required</span>
                      )}
                    </div>
                    <div className="max-w-md h-40 rounded-lg border-2 border-emerald-600 border-opacity-30 border-dashed flex items-center justify-center">
                      <label
                        htmlFor="file"
                        className="cursor-pointer text-center p-4 md:p-8"
                      >
                        <AddModeratorOutlinedIcon
                          fontSize="large"
                          className="text-emerald-500"
                        />
                        <p className="mt-3 text-gray-700 max-w-xs mx-auto">
                          Click to{" "}
                          <span className="font-medium text-emerald-600">
                            Upload a PDF
                          </span>{" "}
                          or drag and drop your file here
                        </p>
                      </label>
                      <input
                        id="file"
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        max={1}
                        {...register("pdf", { required: true })}
                      />
                    </div>
                    <div className="text-red-500 max-w-xs text-left text-xs pl-2 h-7">
                      {errors.pdf && (
                        <span className="">Don&apos;t forget your PDF</span>
                      )}
                    </div>
                    {canRenderChip && (
                      <div className="my-2 flex items-center justify-between p-2 text-emerald-500 h-10 bg-emerald-600 bg-opacity-10 hover:bg-opacity-20 transition ease-in-out delay-50 rounded shadow">
                        <span>{<span>{watch("pdf")?.[0]?.name}</span>}</span>
                        <button
                          onClick={() => {
                            setValue("pdf", null);
                          }}
                          title="Remove File"
                          type="button"
                        >
                          <RemoveCircleOutlineIcon className="cursor-pointer" />
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full px-3 py-2 mt-4 text-white font-semibold bg-emerald-700 rounded-md hover:bg-emerald-600  transition ease-in-out delay-50"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <>
              {feedback && !loading && (
                <div className=" h-64 flex text-7xl  flex-col gap-2 items-center justify-center ">
                  <VerifiedUserOutlinedIcon
                    fontSize="inherit"
                    className="text-emerald-500"
                  />
                  <p className="mt-4 w-64 text-center text-base text-s">
                    Your PDF has been secured by{" "}
                    <span className="text-emerald-500 ">
                      OwlGuard & ULedger
                    </span>
                    <br /> AI is ready to be prompted.
                  </p>
                  <button
                    type="button"
                    className=" text-base w-full px-3 py-2 mt-4 text-white font-semibold bg-emerald-700 rounded-md hover:bg-emerald-600  transition ease-in-out delay-50"
                    onClick={continueHandler}
                  >
                    Continue
                  </button>
                </div>
              )}

              {!feedback && loading && (
                <div className=" h-64 w-64 text-center flex text-7xl flex-col gap-2 items-center justify-center ">
                  <ShieldOutlinedIcon
                    fontSize="inherit"
                    className="text-emerald-500 animate-pulse"
                  />
                  <p className="mt-4 text-base">{feedbackMessage}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default UploadModal;
