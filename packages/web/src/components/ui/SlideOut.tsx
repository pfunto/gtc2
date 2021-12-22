import tw from 'twin.macro';
import 'styled-components/macro';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { currencyFormatter } from '../Item/ItemButton';

const SlideOut = () => {
  const state = useAppSelector((state) => state);
  const { buyer, calculation } = state;
  const [open, setOpen] = useState(true);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog tw="fixed inset-0 overflow-hidden" onClose={setOpen}>
          <div tw="absolute inset-0 overflow-hidden">
            <Dialog.Overlay tw="absolute inset-0" />

            <div tw="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="enter"
                enterFrom="enterFrom"
                enterTo="enterTo"
                leave="leave"
                leaveFrom="leaveFrom"
                leaveTo="leaveTo"
              >
                <div tw="w-screen max-w-xs">
                  <div tw="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                    <div tw="px-4 sm:px-6">
                      <div tw="flex items-start justify-between">
                        <Dialog.Title tw="text-lg font-medium text-gray-900">
                          Totals
                        </Dialog.Title>
                        <div tw="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            tw="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            <span tw="sr-only">Close panel</span>
                            <XIcon tw="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div tw="mt-6 relative flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div tw="absolute inset-0 px-4 sm:px-6">
                        <div
                          tw="h-full border-2 border-dashed border-gray-200 p-4"
                          aria-hidden="true"
                        >
                          <div>
                            {Object.entries(calculation.buyerReceipts).map(
                              ([key, buyerReceipt]) => {
                                const { buyerId, totalCost } = buyerReceipt;
                                const buyerName =
                                  buyer.byId[parseInt(buyerId)].name;
                                return (
                                  <div tw="flex justify-between">
                                    <span>{buyerName}</span>
                                    <span>
                                      {currencyFormatter.format(totalCost)}
                                    </span>
                                  </div>
                                );
                              }
                            )}
                          </div>

                          <div tw="flex justify-between">
                            <span>Group Total</span>
                            <span>
                              {currencyFormatter.format(calculation.finalCost)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <button
        onClick={() => setOpen(true)}
        tw="absolute -right-4 top-28 justify-between inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-t-md shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 ml-1 -rotate-90"
      >
        <ChevronUpIcon tw="h-6 w-6" />
      </button>
    </>
  );
};

export default SlideOut;
