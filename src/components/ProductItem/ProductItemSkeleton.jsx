import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./ProductItem.module.css";

export default function ProductItemSkeleton() {
  return (
    <SkeletonTheme baseColor="var(--accent-light)" highlightColor="var(--bg-light)">
      <div className={styles.card}>
        <div className={styles.imageContainer} style={{ padding: 0 }}>
          <Skeleton containerClassName="flex h-full w-full" borderRadius="1.75rem" />
        </div>

        <div className={styles.title}>
          <Skeleton count={2} height={16} width="85%" />
        </div>

        <div className={styles.ratingContainer}>
          <Skeleton width={100} height={20} />
          <Skeleton width={30} height={16} />
        </div>

        <div>
          <Skeleton width="45%" height={20} />
        </div>

        <div>
          <Skeleton height={40} borderRadius="var(--border-radius)" />
        </div>
      </div>
    </SkeletonTheme>
  );
}
