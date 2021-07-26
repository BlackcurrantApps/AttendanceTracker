declare var Swal: any;

export class SwalHelper {
  public static showSavedToast() {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      type: "success",
      title: "Saved",
    });
  }

  public static successTimerSwal(title: any) {
    Swal.fire({
      title,
      type: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
  }

  public static showToast(type: string = "success", message: string) {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      type,
      title: message,
    });
  }

  public static showErrorSwal(err: any) {
    Swal.fire({
      title: 'Whoops',
      text: err.error ? err.error.message : err,
      type: 'error',
    });
  }

  public static showSuccessSwal(title: string, text: string) {
    Swal.fire({
      title,
      text,
      type: 'success',
    });
  }

  public static showErrorToast(err: any) {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      type: "error",
      title: "Whoops, something went wrong",
    });
  }

  public static showWarningSwal(err: any) {
    Swal.fire({
      title: 'Whoops',
      text: err.error ? err.error.message : err,
      type: 'warning',
    });
  }

  public static dismiss() {
    Swal.close();
  }

}
