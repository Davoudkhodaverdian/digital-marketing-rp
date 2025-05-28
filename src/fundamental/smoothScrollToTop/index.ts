const smoothScrollToTop = (): Promise<void> => {
    return new Promise((resolve) => {
        const checkIfDone = () => {
            const scrollTop = window?.scrollY || document?.documentElement?.scrollTop;
            if (scrollTop <= 0) {
                resolve();
            } else {
                requestAnimationFrame(checkIfDone);
            }
        };
        window.scrollTo({ top: 0, behavior: 'smooth' });
        checkIfDone();
    });
};
export default smoothScrollToTop