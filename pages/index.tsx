import HomepageCarousel from "@/components/Banner/HomepageCarousel";
import Skeleton from "@/components/Skeleton/Skeleton";
import FrontPageLayout from "components/Layouts/FrontPage";

export default function index() {
  return (
    <FrontPageLayout>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <HomepageCarousel />
        </div>

        <Skeleton className="col-span-12 lg:col-span-8 h-80" />
        <Skeleton className="col-span-12 lg:col-span-4" />

        <Skeleton
          className="col-span-12 grid grid-cols-12 gap-2"
          loadingChildren={Array(4)
            .fill(null)
            .map((_, k) => (
              <Skeleton
                key={k}
                className="col-span-3 m-2 h-20 !bg-gray-100 dark:!bg-popover-dark rounded-md"
              />
            ))}
        />
        <Skeleton className="col-span-6 lg:col-span-4 w-80 h-8" />
        <Skeleton className="col-span-6 lg:col-start-10 lg:col-span-3 w-48 h-8 place-self-end" />
        {Array(18)
          .fill(null)
          .map((_, k) => (
            <Skeleton
              key={k}
              className="col-span-6 lg:col-span-2 p-2 h-64 rounded-md hover:shadow-lg hover:border"
            />
          ))}
      </div>
    </FrontPageLayout>
  );
}
