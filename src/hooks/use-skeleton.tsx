import { Skeleton } from "@/components/ui/skeleton"


interface UseSkeletonProps {
    value: any;
    content: any;
    className?: string;
    applyClass?: boolean;
}

const UseSkeleton = ({
    value,
    content,
    className = "",
    applyClass = false,
}: UseSkeletonProps) => {


    if (value === null || value === undefined || value === "" || value === true) {
        return <Skeleton className={`${className}`} />;
    }

    if (applyClass) {
        return <p className={className}>{content}</p>;
    }

    return content;
};

export default UseSkeleton;