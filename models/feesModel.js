const dbconnection = require('../config/db');
class Fees {
    constructor() {
        this.pool = dbconnection;

        this.market_timings = {
            equity: {
                open: '09:15',
                close: '15:30'
            },
            fno: {
                open: '09:15',
                close: '15:30'
            }
        }
    }


    // brokerage regulation
    fees = {
        groww: {
            "account_opening": {
                "trading_demat_opening": {
                    "type": "flat",
                    "price": "0"
                },
                "maintenance_charges": {
                    "type": "flat",
                    "price": "0"
                }
            },
            "brokerage": {
                "for": "executed order",
                "equity": {
                    "fees_one": {
                        "type": "flat",
                        "price": "20"
                    },
                    "fees_two": {
                        "type": "percentage",
                        "price": "0.05"
                    }
                },
                "futures_options": {
                    "type": "flat",
                    "price": "20",
                    "for": "executed order"
                }
            },
            "pledge": {
                "pledge_order": {
                    "type": "flat",
                    "price": "0"
                },
                "unpledge_order": {
                    "type": "flat",
                    "price": "20",
                    "info": "per ISIN per request"
                }
            },
            "regulatory_statutory_charges": {
                "stt": {
                    "equity": {
                        "intraday": {
                            "sell": {
                                "type": "percentage",
                                "price": "0.025"
                            }
                        },
                        "delivery": {
                            "sell": {
                                "type": "percentage",
                                "price": "0.1"
                            },
                            "buy": {
                                "type": "percentage",
                                "price": "0.1"
                            }
                        }
                    },
                    "futures": {
                        "sell": {
                            "type": "percentage",
                            "price": "0.0125"
                        }
                    },
                    "options": {
                        "sell": {
                            "type": "percentage",
                            "price": "0.0625",
                            "info": "on premium"
                        }
                    }
                },
                "stamp_duty": {
                    "equity": {
                        "intraday": {
                            "buy": {
                                "type": "percentage",
                                "price": "0.003"
                            },
                            "sell": {
                                "type": "percentage",
                                "price": "0"
                            }
                        },
                        "delivery": {
                            "buy": {
                                "type": "percentage",
                                "price": "0.015"
                            },
                            "sell": {
                                "type": "percentage",
                                "price": "0"
                            }
                        }
                    },
                    "futures": {
                        "buy": {
                            "type": "percentage",
                            "price": "0.002"
                        }
                    },
                    "options": {
                        "buy": {
                            "type": "percentage",
                            "price": "0.003"
                        }
                    }
                },
                "exchange_transaction_charge": {
                    "equity": {
                        "intrady": {
                            "nse": {
                                "buy": {
                                    "type": "percentage",
                                    "price": "0.00322"
                                },
                                "sell": {
                                    "type": "percentage",
                                    "price": "0.00322"
                                }
                            },
                            "bse": {
                                "buy": {
                                    "type": "percentage",
                                    "price": "0.00375"
                                },
                                "sell": {
                                    "type": "percentage",
                                    "price": "0.00375"
                                }
                            }
                        },
                        "delivery": {
                            "nse": {
                                "buy": {
                                    "type": "percentage",
                                    "price": "0.00322"
                                },
                                "sell": {
                                    "type": "percentage",
                                    "price": "0.00322"
                                }
                            },
                            "bse": {
                                "buy": {
                                    "type": "percentage",
                                    "price": "0.00375"
                                },
                                "sell": {
                                    "type": "percentage",
                                    "price": "0.00375"
                                }
                            }
                        }
                    },
                    "futures": {
                        "nse": {
                            "buy": {
                                "type": "percentage",
                                "price": "0.00188"
                            },
                            "sell": {
                                "type": "percentage",
                                "price": "0.00188"
                            }
                        },
                        "bse": {
                            "buy": {
                                "type": "percentage",
                                "price": "0"
                            },
                            "sell": {
                                "type": "percentage",
                                "price": "0"
                            }
                        }
                    },
                    "options": {
                        "buy": {
                            "type": "percentage",
                            "price": "0.0495",
                            "info": "on premium"
                        },
                        "sell": {
                            "type": "percentage",
                            "price": "0.0495",
                            "info": "on premium"
                        }
                    }
                },
                "sebi_turnover_charge": {
                    "equity": {
                        "intraday": {
                            "buy": {
                                "type": "percentage",
                                "price": "0.0001"
                            },
                            "sell": {
                                "type": "percentage",
                                "price": "0.0001"
                            }
                        },
                        "delivery": {
                            "buy": {
                                "type": "percentage",
                                "price": "0.0001"
                            },
                            "sell": {
                                "type": "percentage",
                                "price": "0.0001"
                            }
                        }
                    },
                    "futures": {
                        "buy": {
                            "type": "percentage",
                            "price": "0.0001"
                        },
                        "sell": {
                            "type": "percentage",
                            "price": "0.0001"
                        }
                    },
                    "options": {
                        "buy": {
                            "type": "percentage",
                            "price": "0.0001"
                        },
                        "sell": {
                            "type": "percentage",
                            "price": "0.0001"
                        }
                    }
                },
                "dp_charges": {
                    "info": "13 per company (irrespective of quantity) + GST",
                    "equity": {
                        "intrady": {
                            "buy": {
                                "type": "flat",
                                "price": "0"
                            },
                            "sell": {
                                "type": "flat",
                                "price": "0"
                            }
                        },
                        "delivery": {
                            "buy": {
                                "type": "flat",
                                "price": "0"
                            },
                            "sell": {
                                "type": "flat",
                                "info": "Depository Participant (DP) charges are applicable for Delivery trades only. DP charges are charged by the Depository (CDSL) and Depository Participant (Groww).",
                                "depositary": {
                                    "by": "CDSL",
                                    "price": "5.5",
                                    "type": "flat"
                                }
                            }
                        }
                    },
                    "futures": {
                        "buy": {
                            "type": "flat",
                            "price": "0"
                        },
                        "sell": {
                            "type": "flat",
                            "price": "0"
                        }
                    },
                    "options": {
                        "buy": {
                            "type": "flat",
                            "price": "0"
                        },
                        "sell": {
                            "type": "flat",
                            "price": "0"
                        }
                    }
                },
                "investor_protection_fund_trust_charge": {
                    "equity": {
                        "intraday": {
                            "nse": {
                                "buy": {
                                    "type": "percentage",
                                    "price": "0.0001"
                                },
                                "sell": {
                                    "type": "percentage",
                                    "price": "0.0001"
                                }
                            }
                        },
                        "delivery": {
                            "nse": {
                                "buy": {
                                    "type": "percentage",
                                    "price": "0.0001"
                                },
                                "sell": {
                                    "type": "percentage",
                                    "price": "0.0001"
                                }
                            }
                        }
                    },
                    "futures": {
                        "buy": {
                            "type": "percentage",
                            "price": "0.0001"
                        },
                        "sell": {
                            "type": "percentage",
                            "price": "0.0001"
                        }
                    },
                    "options": {
                        "buy": {
                            "type": "percentage",
                            "price": "0.0005"
                        },
                        "sell": {
                            "type": "percentage",
                            "price": "0.0005"
                        }
                    }
                }
            },
            "penalties": {
                "auto_square_off_charges": {
                    "type": "flat",
                    "price": "50",
                    "info": "auto square off charges for intraday positions squared off by Groww"
                },
                "auction": "As per actual penalty by exchange",
                "delayed_payment_charges": "0.045% per day, simple interest, compounded monthly",
                "gst": "18% on various charges"
            },
            "tax": {
                "cgst": {
                    "type": "percentage",
                    "price": "9",
                    "on": ["brokerage", "exchange_transaction_charge", "sebi_turnover_charge"]
                },
                "sgst": {
                    "type": "percentage",
                    "price": "9",
                    "on": ["brokerage", "exchange_transaction_charge", "sebi_turnover_charge"]
                },
                "igst": {
                    "type": "percentage",
                    "price": "18",
                    "on": ["brokerage", "exchange_transaction_charge", "sebi_turnover_charge"]
                },
                "utt": {
                    "type": "percentage",
                    "price": "0.005",
                    "on": ["brokerage", "exchange_transaction_charge", "sebi_turnover_charge"]
                }
            },
            "physical_delivery_derivatives": "₹20 per executed transaction",
            "bse_equity_exchange_transaction_charges": "0.00345% for all groups except R, SS, ST, ZP (1.0%) X,XT,Z (0.1%) A,B,E,F,FC,G,GC,W,T (0.00375%)",
            "buyback_charges": {
                "brokerage": "₹20 per executed transaction",
                "dp_charges": "₹13.5 per company"
            },
            "other_charges": {
                "demat_remat": "₹150 per certification + courier charges",
                "failed_demat_transactions": "₹50 per ISIN",
                "pledge_invocation": "₹20",
                "periodic_adhoc_statement_request": {
                    "email": "Free",
                    "physical": "₹10 per page"
                },
                "kyc_modification_request": "₹50",
                "kra_upload_download": "₹50",
                "delivery_instruction_slip": {
                    "first_10_leaves": "Free",
                    "additional_10_leaves": "₹100 + courier charges"
                },
                "physical_cmr": "₹20 + courier charges",
                "courier_charges": "Max of ₹100 or actual",
                "inter_settlement_charges": "₹13.5 + GST",
                "margin_re_pledge": "₹5",
                "release_margin_re_pledge": "₹5",
                "restat_soa_redemption": "₹20 + GST"
            },
            "additional_charges": {
                "fund_transfer": {
                    "type": "flat",
                    "price": "0",
                    "info": "Free online fund transfer; bank charges may apply separately"
                },
                "account_closing_fee": {
                    "type": "flat",
                    "price": "0",
                    "info": "No fee for closing demat account"
                },
                "annual_demat_maintenance": {
                    "type": "flat",
                    "price": "0",
                    "info": "Free demat maintenance"
                }
            }
        }
    }

    async fno_nifty_fees(txnData) {
        try {
            // Helper function to sum an array of fees
            const sumFees = (feesArray) => feesArray.reduce((acc, fee) => acc + fee, 0);
            // Helper function to compute fee using fee_type method
            const computeFee = (feeConfig, amount) => this.fee_type(feeConfig, amount);

            // Destructure common fields from txnData and calculate order amount
            const {
                txn_type,
                instrument_type,
                txn_nature,
                stock_qty,
                stock_price,
                market_type,
                exchange_name
            } = txnData;
            const orderAmount = stock_qty * stock_price;

            // Get the fee configuration (assumed to be under this.fees.groww)
            const feeConfig = this.fees.groww;

            // Initialize fee breakdown variables
            let brokerage = 0,
                stt = 0,
                stampDuty = 0,
                exchangeTxnCharge = 0,
                sebiTurnoverCharge = 0,
                penalty = 0,
                cgst = 0,
                sgst = 0,
                igst = 0,
                utt = 0,
                ipft = 0;

            // --------------------- BUY TRANSACTION ---------------------
            if (txn_type === 'buy') {
                // Calculate Brokerage
                if (instrument_type === 'futures') {
                    brokerage = computeFee(feeConfig.brokerage.futures_options, orderAmount);
                } else if (instrument_type === 'EQ') {
                    const feeOne = computeFee(feeConfig.brokerage.equity.fees_one, orderAmount);
                    const feeTwo = computeFee(feeConfig.brokerage.equity.fees_two, orderAmount);
                    brokerage = Math.min(feeOne, feeTwo);
                }

                // STT is zero for buy orders
                stt = 0;

                // Stamp Duty Calculation
                if (instrument_type === 'futures') {
                    stampDuty = computeFee(feeConfig.regulatory_statutory_charges.stamp_duty.futures, orderAmount);
                    // Minimum threshold check (if less than ₹50, set to 0)
                    if (stampDuty < 50) stampDuty = 0;
                } else if (instrument_type === 'EQ') {
                    const eqStampDuty = feeConfig.regulatory_statutory_charges.stamp_duty.equity;
                    stampDuty =
                        txn_nature === 'intraday'
                            ? computeFee(eqStampDuty.intraday.buy, orderAmount)
                            : txn_nature === 'delivery'
                                ? computeFee(eqStampDuty.delivery.buy, orderAmount)
                                : 0;
                }

                // Exchange Transaction Charge Calculation
                if (instrument_type === 'futures') {
                    if (market_type === 'NSE') {
                        exchangeTxnCharge = computeFee(feeConfig.regulatory_statutory_charges.exchange_transaction_charge.futures.nse.buy, orderAmount);
                    }
                } else if (instrument_type === 'EQ') {
                    if (market_type === 'NSE') {
                        // For equities, using the intraday fee config (adjust if needed for delivery)
                        exchangeTxnCharge = computeFee(feeConfig.regulatory_statutory_charges.exchange_transaction_charge.equity.intrady.nse.buy, orderAmount);
                    }
                }

                // SEBI Turnover Charge Calculation
                if (instrument_type === 'futures') {
                    sebiTurnoverCharge = computeFee(feeConfig.regulatory_statutory_charges.sebi_turnover_charge.futures.buy, orderAmount);
                } else if (instrument_type === 'EQ') {
                    sebiTurnoverCharge = computeFee(feeConfig.regulatory_statutory_charges.sebi_turnover_charge.equity.intraday.buy, orderAmount);
                }

                // Penalty is currently not applied (could add delayed payment penalty logic if needed)
                penalty = 0;

                // For Equity transactions, calculate tax components based on the taxable base (brokerage + exchangeTxnCharge + sebiTurnoverCharge)
                if (instrument_type === 'EQ') {
                    const taxableBase = sumFees([brokerage, exchangeTxnCharge, sebiTurnoverCharge]);
                    cgst = computeFee(feeConfig.tax.cgst, taxableBase);
                    sgst = computeFee(feeConfig.tax.sgst, taxableBase);
                    igst = computeFee(feeConfig.tax.igst, taxableBase);
                    utt = computeFee(feeConfig.tax.utt, taxableBase);
                }

                // Investor Protection Fund Trust Charge for equities
                if (instrument_type === 'EQ') {
                    ipft = computeFee(feeConfig.regulatory_statutory_charges.investor_protection_fund_trust_charge.equity.intraday.nse.buy, orderAmount);
                }

                // Sum up all regulatory/statutory charges
                const regulatoryCharges = sumFees([stt, stampDuty, exchangeTxnCharge, sebiTurnoverCharge, penalty]);
                // Total fees is the sum of brokerage and regulatory charges
                const totalFees = sumFees([brokerage, regulatoryCharges]);
                // Total tax is the sum of applicable GST, etc.
                const totalTax = sumFees([cgst, sgst, igst, utt]);
                // For buy transactions, total net amount can be defined as order amount plus fees (if fees are added)
                const totalNetAmount = orderAmount + totalFees;

                return {
                    total_fees: totalFees,
                    total_tax: totalTax,
                    total_net_amount: totalNetAmount,
                    total_amount: orderAmount,
                    breakdown: {
                        brokerage,
                        stt,
                        stamp_duty: stampDuty,
                        exchange_transaction_charge: exchangeTxnCharge,
                        sebi_turnover_charge: sebiTurnoverCharge,
                        penalty,
                        cgst,
                        sgst,
                        igst,
                        utt,
                        ipft,
                        regulatory_statutory_charges: regulatoryCharges
                    }
                };
            }

            // --------------------- SELL TRANSACTION ---------------------
            if (txn_type === 'sell') {
                // For sell orders, brokerage is calculated from futures_options fees (adjust if needed for equities)
                brokerage = computeFee(feeConfig.brokerage.futures_options, orderAmount);

                // STT for sell transactions (using futures sell fee)
                stt = computeFee(feeConfig.regulatory_statutory_charges.stt.futures.sell, orderAmount);

                // Stamp Duty for sell transactions (using futures configuration)
                stampDuty = computeFee(feeConfig.regulatory_statutory_charges.stamp_duty.futures, orderAmount);

                // Exchange Transaction Charge for sell; check exchange name
                if (exchange_name === 'nse') {
                    exchangeTxnCharge = computeFee(feeConfig.regulatory_statutory_charges.exchange_transaction_charge.futures.nse.sell, orderAmount);
                }

                // SEBI Turnover Charge for sell transactions (futures)
                sebiTurnoverCharge = computeFee(feeConfig.regulatory_statutory_charges.sebi_turnover_charge.futures.sell, orderAmount);

                // Penalty remains zero unless additional logic is added
                penalty = 0;

                // Total tax is the sum of stt, stamp duty, exchange transaction charge, sebi turnover charge, and any penalty
                const totalTax = sumFees([stt, stampDuty, exchangeTxnCharge, sebiTurnoverCharge, penalty]);
                const totalFees = brokerage + totalTax;
                const totalNetAmount = orderAmount - totalFees;

                return {
                    total_fees: totalFees,
                    total_tax: totalTax,
                    total_net_amount: totalNetAmount,
                    total_amount: orderAmount
                };
            }

            throw new Error("Invalid transaction type");
        } catch (error) {
            return error;
        }
    }


    fee_type(fee, price) {
        let fees;
        if (fee.price) {
            fee.price = fee.price.replace(/[^0-9.]/g, '');
        }

        if (fee.type === 'flat') {
            fees = fee.price;
        }
        if (fee.type === 'percentage') {
            fees = (price * fee.price) / 100;
        }

        return parseFloat(fees).toFixed(2);
    }

    sum_fees(fees) {
        const sum = fees.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
        return parseFloat(sum).toFixed(2);
    }
}

module.exports = Fees;