import { compactFormatter, currencyFormatter } from '@/lib/utils';

interface OverviewSummaryProps {
  totalRevenue: number;
  sales: number;
  productsInStock: number;
}

const OverviewSummary: React.FC<OverviewSummaryProps> = ({
  totalRevenue,
  sales,
  productsInStock,
}) => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
      <div className="stat">
        <div className="stat-title">Total Revenue</div>
        <div className="stat-value">
          {currencyFormatter.format(totalRevenue)}
        </div>
        {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
      </div>
      <div className="stat">
        <div className="stat-title">Sales</div>
        <div className="stat-value">+{compactFormatter.format(sales)}</div>
        {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
      </div>
      <div className="stat">
        <div className="stat-title">Products in Stock</div>
        <div className="stat-value">
          {compactFormatter.format(productsInStock)}
        </div>
        {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
      </div>
    </div>
  );
};

export default OverviewSummary;
