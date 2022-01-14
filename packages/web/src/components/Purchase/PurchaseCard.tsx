import 'twin.macro';
import 'styled-components/macro';
import { CalendarIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Purchase } from '../../services/PurchaseService';
import { Link } from 'react-router-dom';

interface PurchaseCardProps {
  purchase: Purchase;
}

const PurchaseCard = ({ purchase }: PurchaseCardProps) => {
  return (
    <li>
      <Link to={`/purchases/testing`} tw="block hover:bg-gray-50">
        <div tw="px-4 py-4 flex items-center sm:px-6">
          <div tw="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div tw="truncate">
              <div tw="flex text-sm">
                <p tw="font-medium text-indigo-600 truncate">
                  {/* {position.title} */}
                </p>
              </div>
              <div tw="mt-2 flex">
                <div tw="flex items-center text-sm text-gray-500">
                  <CalendarIcon
                    tw="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <p>
                    {/* Closing on{' '} */}
                    <time dateTime={purchase.createdAt}>
                      {purchase.createdAt}
                    </time>
                  </p>
                </div>
              </div>
            </div>
            <div tw="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
              {/* <div tw="flex overflow-hidden -space-x-1">
                    {position.applicants.map((applicant) => (
                      <img
                        key={applicant.email}
                        tw="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                        src={applicant.imageUrl}
                        alt={applicant.name}
                      />
                    ))}
                  </div> */}
            </div>
          </div>
          <div tw="ml-5 flex-shrink-0">
            <Link
              to={`/purchases/${purchase.id}`}
              tw="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-400"
            >
              Edit
            </Link>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default PurchaseCard;
