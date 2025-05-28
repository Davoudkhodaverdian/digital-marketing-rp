import Loading from "@/components/common/loading";
import { useTranslations } from "next-intl";
import React from "react";


const LoadingProcess: React.FC = () => {

    const t = useTranslations('loading');
    return (
        <div className='py-5'><Loading text={t("send_data")} /></div>
    )
}
export default LoadingProcess;