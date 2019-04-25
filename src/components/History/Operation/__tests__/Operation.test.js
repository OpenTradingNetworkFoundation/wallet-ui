import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { format } from 'date-fns';

import { getAssetsByName } from 'src/__fixtures__/assets';

import Operation from '../index';

const DEFAULT_PARAMS = {
  operation: {
    amount: {
      amount: '0.1',
      asset: { id: '1.3.0', name: 'OTN', displayName: 'OTN', precision: 8 }
    },
    confirmations: '',
    fee: {
      amount: '21000',
      asset: { id: '1.3.0', name: 'OTN', displayName: 'OTN', precision: 8 }
    },

    lastUpdated: '2018-02-01T01:01:01Z',
    renderAsset: true,

    timeCreated: '2018-01-01T01:01:01Z',
    transactionId: null,

    userId: 1,

    state: 'failed',
    internalState: 'failed',
    internalType: 'detokenize'
  },
  className: 'history__item',
  disableDetails: true,
  renderAsset: true
};

const testRender = (testParams, printDebug = false) => {
  const createdDate = format(
    DEFAULT_PARAMS.operation.timeCreated,
    'MMM D YYYY'
  );
  const createTime = format(DEFAULT_PARAMS.operation.timeCreated, 'h:mm A');

  const { operation, ...customParams } = testParams.params;

  const params = {
    ...DEFAULT_PARAMS,
    ...customParams,
    operation: { ...DEFAULT_PARAMS.operation, ...operation }
  };
  const asset = { ...params.operation.amount.asset };

  const { queryByText, container, debug, queryByTestId } = render(
    <Operation {...params} />
  );

  if (printDebug) {
    debug(container);
  }

  expect(container).not.toBeNull();

  expect(queryByText(createdDate)).not.toBeNull();
  expect(queryByText(createTime)).not.toBeNull();

  expect(queryByText(asset.displayName)).not.toBeNull();
  expect(queryByText(testParams.status.text)).not.toBeNull();

  expect(queryByText(testParams.asset.icon)).not.toBeNull();

  const operationStatusContainer = queryByText(testParams.status.icon);
  expect(operationStatusContainer).not.toBeNull();

  const operationStatusClassName = `operation__status--${
    testParams.mods.operation
  }`;
  const operationStatus = queryByTestId(
    `operation-status-${params.operation.id}`
  );
  expect(operationStatus).not.toBeNull();
  expect(operationStatus.className).toContain(operationStatusClassName);

  const amountSpan = queryByText(testParams.asset.displayAmount);

  expect(amountSpan).not.toBeNull();
  expect(amountSpan.classList).toContain(
    `operation__amount--${testParams.mods.amount}`
  );
};

describe('<Operation/> component', () => {
  afterEach(cleanup);

  describe('External className', () => {
    it('should add expernal css class', () => {
      const { container, queryByTestId } = render(
        <Operation {...DEFAULT_PARAMS} />
      );
      expect(container).not.toBeNull();

      const externalClass = 'history__item';
      const div = queryByTestId(
        `operation-container-${DEFAULT_PARAMS.operation.id}`
      );

      expect(div).not.toBeNull();
      expect(div.className).toContain(externalClass);
    });
  });

  describe('Collapsed', () => {
    describe('by asset', () => {
      describe('OTN', () => {
        it('should render properly', () => {
          const otn = getAssetsByName('OTN');

          testRender({
            params: {
              operation: {
                amount: {
                  amount: '0.1',
                  asset: otn
                }
              }
            },
            asset: {
              icon: 'otn-coin.svg',
              displayAmount: '-0.1'
            },
            status: {
              icon: 'failed.svg',
              text: 'Detokenization failed'
            },
            mods: {
              amount: 'detokenize',
              operation: 'failed'
            }
          });
        });
      });

      describe('BTC', () => {
        it('should render properly', () => {
          const btc = getAssetsByName('BTC');

          testRender({
            params: {
              operation: {
                amount: {
                  amount: '0.1',
                  asset: btc
                }
              }
            },
            asset: {
              icon: 'btc-coin.svg',
              displayAmount: '-0.1'
            },
            status: {
              icon: 'failed.svg',
              text: 'Detokenization failed'
            },
            mods: {
              amount: 'detokenize',
              operation: 'failed'
            }
          });
        });
      });
    });

    describe('by status', () => {
      describe('Unknown status', () => {
        it('should render properly', () => {
          testRender({
            params: {
              operation: {
                state: '',
                internalState: 'unknown'
              }
            },
            asset: {
              icon: 'otn-coin.svg',
              displayAmount: '-0.1'
            },
            status: {
              icon: 'question.svg',
              text: 'Unknown'
            },
            mods: {
              amount: 'detokenize',
              operation: 'unknown'
            }
          });
        });
      });

      describe('Pending status', () => {
        ['pending', 'sending', 'waiting', 'confirmed'].forEach(status => {
          describe(status, () => {
            it('should render properly', () => {
              testRender({
                params: {
                  operation: {
                    internalState: 'pending',
                    state: status
                  }
                },
                asset: {
                  icon: 'otn-coin.svg',
                  displayAmount: '-0.1'
                },
                status: {
                  icon: 'pending-small.svg',
                  text: 'Detokenize'
                },
                mods: {
                  amount: 'detokenize',
                  operation: 'pending'
                }
              });
            });
          });
        });
      });

      describe('Done status', () => {
        it('should render properly', () => {
          testRender({
            params: {
              operation: {
                internalState: 'done',
                state: 'processed'
              }
            },
            asset: {
              icon: 'otn-coin.svg',
              displayAmount: '-0.1'
            },
            status: {
              icon: 'detokenize.svg',
              text: 'Detokenize'
            },
            mods: {
              amount: 'detokenize',
              operation: 'done'
            }
          });
        });
      });

      describe('Failed status', () => {
        ['failed', 'canceled'].forEach(status => {
          describe(status, () => {
            it('should render properly', () => {
              testRender({
                params: {
                  operation: {
                    internalState: 'failed',
                    status: status
                  }
                },
                asset: {
                  icon: 'otn-coin.svg',
                  displayAmount: '-0.1'
                },
                status: {
                  icon: 'failed.svg',
                  text: 'Detokenization failed'
                },
                mods: {
                  amount: 'detokenize',
                  operation: 'failed'
                }
              });
            });
          });
        });
      });
    });

    describe('by type', () => {
      describe('external', () => {
        describe('Deposit type', () => {
          it('should render properly', () => {
            testRender({
              params: {
                operation: {
                  state: 'processed',
                  internalState: 'done',
                  internalType: 'tokenize'
                }
              },
              asset: {
                icon: 'otn-coin.svg',
                displayAmount: '+0.1'
              },
              status: {
                icon: 'tokenize.svg',
                text: 'Tokenize'
              },
              mods: {
                amount: 'tokenize',
                operation: 'done'
              }
            });
          });
        });

        describe('Deposit type in progress', () => {
          it('should render properly', () => {
            testRender({
              params: {
                operation: {
                  state: 'pending',
                  internalState: 'pending',
                  internalType: 'tokenize'
                }
              },
              asset: {
                icon: 'otn-coin.svg',
                displayAmount: '+0.1'
              },
              status: {
                icon: 'pending-small.svg',
                text: 'Tokenize'
              },
              mods: {
                amount: 'tokenize',
                operation: 'pending'
              }
            });
          });
        });

        describe('Withdrawal type', () => {
          it('should render properly', () => {
            testRender({
              params: {
                operation: {
                  internalState: 'done',
                  state: 'processed',
                  internalType: 'detokenize'
                }
              },
              asset: {
                icon: 'otn-coin.svg',
                displayAmount: '-0.1'
              },
              status: {
                icon: 'detokenize.svg',
                text: 'Detokenize'
              },
              mods: {
                amount: 'detokenize',
                operation: 'done'
              }
            });
          });
        });

        describe('Withdrawal type in progress', () => {
          it('should render properly', () => {
            testRender({
              params: {
                operation: {
                  internalState: 'pending',
                  state: 'pending',
                  internalType: 'detokenize'
                }
              },
              asset: {
                icon: 'otn-coin.svg',
                displayAmount: '-0.1'
              },
              status: {
                icon: 'pending-small.svg',
                text: 'Detokenize'
              },
              mods: {
                amount: 'detokenize',
                operation: 'pending'
              }
            });
          });
        });
      });

      describe('internal', () => {
        describe('Receiving type', () => {
          it('should render properly', () => {
            testRender({
              params: {
                operation: {
                  internalState: 'pending',
                  state: 'pending',
                  internalType: 'receive'
                }
              },
              asset: {
                icon: 'otn-coin.svg',
                displayAmount: '+0.1'
              },
              status: {
                icon: 'pending-small.svg',
                text: 'Receiving'
              },
              mods: {
                amount: 'receive',
                operation: 'pending'
              }
            });
          });
        });

        describe('Sending type', () => {
          it('should render properly', () => {
            testRender({
              params: {
                operation: {
                  internalState: 'pending',
                  state: 'pending',
                  internalType: 'send'
                }
              },
              asset: {
                icon: 'otn-coin.svg',
                displayAmount: '-0.1'
              },
              status: {
                icon: 'pending-small.svg',
                text: 'Sending'
              },
              mods: {
                amount: 'send',
                operation: 'pending'
              }
            });
          });
        });

        describe('Exchange-in in progress type', () => {
          it('should render properly', () => {
            testRender({
              params: {
                operation: {
                  internalState: 'pending',
                  state: 'pending',
                  internalType: 'exchange-in'
                }
              },
              asset: {
                icon: 'otn-coin.svg',
                displayAmount: '+0.1'
              },
              status: {
                icon: 'pending-small.svg',
                text: 'Exchange'
              },
              mods: {
                amount: 'exchange-in',
                operation: 'pending'
              }
            });
          });
        });

        describe('Exchange-out in progress type', () => {
          it('should render properly', () => {
            testRender({
              params: {
                operation: {
                  internalState: 'pending',
                  state: 'pending',
                  internalType: 'exchange-out'
                }
              },
              asset: {
                icon: 'otn-coin.svg',
                displayAmount: '-0.1'
              },
              status: {
                icon: 'pending-small.svg',
                text: 'Exchange'
              },
              mods: {
                amount: 'exchange-out',
                operation: 'pending'
              }
            });
          });
        });

        describe('Received type', () => {
          it('should render properly', () => {
            testRender({
              params: {
                operation: {
                  internalState: 'done',
                  state: 'processed',
                  internalType: 'receive'
                }
              },
              asset: {
                icon: 'otn-coin.svg',
                displayAmount: '+0.1'
              },
              status: {
                icon: 'withdraw.svg',
                text: 'Received'
              },
              mods: {
                amount: 'receive',
                operation: 'done'
              }
            });
          });
        });

        describe('Send type', () => {
          it('should render properly', () => {
            testRender({
              params: {
                operation: {
                  internalState: 'done',
                  state: 'processed',
                  internalType: 'send'
                }
              },
              asset: {
                icon: 'otn-coin.svg',
                displayAmount: '-0.1'
              },
              status: {
                icon: 'send.svg',
                text: 'Sent'
              },
              mods: {
                amount: 'send',
                operation: 'done'
              }
            });
          });
        });

        describe('Exchange-in type', () => {
          it('should render properly', () => {
            testRender({
              params: {
                operation: {
                  internalState: 'done',
                  state: 'processed',
                  internalType: 'exchange-in'
                }
              },
              asset: {
                icon: 'otn-coin.svg',
                displayAmount: '+0.1'
              },
              status: {
                icon: 'exchange-mono.svg',
                text: 'Exchange'
              },
              mods: {
                amount: 'exchange-in',
                operation: 'done'
              }
            });
          });
        });

        describe('Exchange-out type', () => {
          it('should render properly', () => {
            testRender({
              params: {
                operation: {
                  internalState: 'done',
                  state: 'processed',
                  internalType: 'exchange-out'
                }
              },
              asset: {
                icon: 'otn-coin.svg',
                displayAmount: '-0.1'
              },
              status: {
                icon: 'exchange-mono.svg',
                text: 'Exchange'
              },
              mods: {
                amount: 'exchange-out',
                operation: 'done'
              }
            });
          });
        });
      });
    });
  });
});
