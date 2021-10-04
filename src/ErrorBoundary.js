import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="bg-red-400 p-5 rounded-lg shadow-lg mt-24 mx-auto max-w-form w-9/10">
          <h1 className="font-bold text-white text-center pb-4">
            Bir hata oluştu.
          </h1>
          <p>
            Gerçekleştirmek istediğiniz işlemi sayfayı yenileyerek tekrar
            deneyin, sorun düzelmezse bize ulaşın.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
