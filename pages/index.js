import HomepageCarousel from '@/components/Banner/HomepageCarousel';
import Skeleton from '@/components/Card/Skeleton';
import FrontPageLayout from 'components/Layouts/FrontPage';

export default function index() {
  return (
    <FrontPageLayout>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <HomepageCarousel />
        </div>

        <Skeleton className="col-span-12 lg:col-span-8 h-80 bg-gray-200" />
        <Skeleton className="col-span-12 lg:col-span-4 bg-gray-200" />

        <Skeleton
          className="col-span-12 grid grid-cols-12 gap-2 bg-gray-200"
          loadingChildren={Array(4)
            .fill(null)
            .map((_, k) => (
              <Skeleton
                key={k}
                className="col-span-3 m-2 h-20 !bg-gray-100 rounded-md"
              />
            ))}
        />
        <Skeleton className="col-span-6 lg:col-span-4 w-80 h-8 bg-gray-200" />
        <Skeleton className="col-span-6 lg:col-start-10 lg:col-span-3 w-48 h-8 bg-gray-200 place-self-end" />
        {Array(18)
          .fill(null)
          .map((_, k) => (
            <Skeleton
              key={k}
              className="col-span-6 lg:col-span-2 p-2 h-64 bg-gray-200 rounded-md hover:shadow-lg hover:border"
            />
          ))}
      </div>
    </FrontPageLayout>
  );
}
