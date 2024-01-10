import ProtectedRoutes, {
    ProtectedRoutesProvider,
} from "../components/ProtectedRoutes";
import "../styles/globals.css";
import "react-photo-view/dist/react-photo-view.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export default function App({
    Component,
    pageProps,
    id,
}: AppProps & { id?: string }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer
                position="top-right"
                pauseOnFocusLoss={false}
                autoClose={2500}
                closeButton
            />
            <ProtectedRoutesProvider id={id}>
                <Component {...pageProps} />
            </ProtectedRoutesProvider>
        </QueryClientProvider>
    );
}
App.getInitialProps = ProtectedRoutes;
