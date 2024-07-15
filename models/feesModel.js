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

    async fnoFees(data) { }

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
                    },
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
                                "price": "0.025%"
                            },
                        },
                        "delivery": {
                            "sell": {
                                "type": "percentage",
                                "price": "0.1%"
                            },
                            "buy": {
                                "type": "percentage",
                                "price": "0.1%"
                            }
                        }
                    },
                    "futures": {
                        "sell": {
                            "type": "percentage",
                            "price": "0.0125%"
                        }
                    },
                    "options": {
                        "sell": {
                            "type": "percentage",
                            "price": "0.0625%",
                            "info": "on premium"
                        }
                    }
                },

                "stamp_duty": {
                    // "equity_intraday": "0.003% BUY",
                    // "equity_delivery": "0.015% BUY",
                    // "futures": "0.002% BUY",
                    // "options": "0.003% BUY"
                    "equity": {
                        "intraday": {
                            "buy": {
                                "type": "percentage",
                                "price": "0.003%"
                            },
                            "sell": {
                                "type": "percentage",
                                "price": "0"
                            }
                        },
                        "delivery": {
                            "buy": {
                                "type": "percentage",
                                "price": "0.015%"
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
                            "price": "0.002%"
                        },
                    },
                    "options": {
                        "buy": {
                            "type": "percentage",
                            "price": "0.003%"
                        },
                    }
                },
                "exchange_transaction_charge": {
                    "equity": {
                        "intrady": {
                            "nse": {
                                "buy": {
                                    "type": "percentage",
                                    "price": "0.00322%"
                                },
                                "sell": {
                                    "type": "percentage",
                                    "price": "0.00322%"
                                }
                            },
                            "bse": {
                                "buy": {
                                    "type": "percentage",
                                    "price": "0.00375%"
                                },
                                "sell": {
                                    "type": "percentage",
                                    "price": "0.00375%"
                                }
                            }
                        },
                        "delivery": {
                            "nse": {
                                "buy": {
                                    "type": "percentage",
                                    "price": "0.00322%"
                                },
                                "sell": {
                                    "type": "percentage",
                                    "price": "0.00322%"
                                }
                            },
                            "bse": {
                                "buy": {
                                    "type": "percentage",
                                    "price": "0.00375%"
                                },
                                "sell": {
                                    "type": "percentage",
                                    "price": "0.00375%"
                                }
                            }
                        }
                    },
                    "futures": {
                        "nse": {
                            "buy": {
                                "type": "percentage",
                                "price": "0.00188%"
                            },
                            "sell": {
                                "type": "percentage",
                                "price": "0.00188%"
                            }
                        },
                        "bse": {
                            "buy": {
                                "type": "percentage",
                                "price": "0%"
                            },
                            "sell": {
                                "type": "percentage",
                                "price": "0%"
                            }
                        }
                    },
                    "options": {
                        "buy": {
                            "type": "percentage",
                            "price": "0.0495%",
                            "info": "on premium"
                        },
                        "sell": {
                            "type": "percentage",
                            "price": "0.0495%",
                            "info": "on premium"
                        }
                    }
                },
                "sebi_turnover_charge": {
                    "equity": {
                        "intraday": {
                            "buy": {
                                "type": "percentage",
                                "price": "0.0001%"
                            },
                            "sell": {
                                "type": "percentage",
                                "price": "0.0001%"
                            }
                        },
                        "delivery": {
                            "buy": {
                                "type": "percentage",
                                "price": "0.0001%"
                            },
                            "sell": {
                                "type": "percentage",
                                "price": "0.0001%"
                            }
                        }
                    },
                    "futures": {
                        "buy": {
                            "type": "percentage",
                            "price": "0.0001%"
                        },
                        "sell": {
                            "type": "percentage",
                            "price": "0.0001%"
                        }
                    },
                    "options": {
                        "buy": {
                            "type": "percentage",
                            "price": "0.0001%"
                        },
                        "sell": {
                            "type": "percentage",
                            "price": "0.0001%"
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
                                    "type": "flat",
                                },
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
                },
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
            }
        },
    }

    async calculate_fno_fees(txnData) { }

    async fno_nifty_fees(txnData) {
        const _this = this;
        try {
            if (txnData.txn_type === 'buy') {
                let total_fees = 0;
                let total_tax = 0;
                let total_net_amount = 0;
                let total_amount = 0;

                let order_amount = txnData.stock_qty * txnData.stock_price;

                // brokerage
                let brokerage = 0;

                // calculate brokerage
                const fees = _this.fees.groww.brokerage.futures_options;
                brokerage = _this.fee_type(fees, order_amount);

                // stt no charge for buy
                let stt = 0;

                // stamp duty
                let stamp_duty = 0;
                const stamp_duty_fees = _this.fees.groww.regulatory_statutory_charges.stamp_duty.futures;
                stamp_duty = _this.fee_type(stamp_duty_fees, order_amount);

                // exchange transaction charge
                let exchange_transaction_charge = 0;
                if(txnData.exchange_name === 'nse') {
                    const exchange_transaction_charge_fees = _this.fees.groww.regulatory_statutory_charges.exchange_transaction_charge.futures.nse.buy;
                    exchange_transaction_charge = _this.fee_type(exchange_transaction_charge_fees, order_amount);
                }

                // sebi turnover charge
                let sebi_turnover_charge = 0;
                const sebi_turnover_charge_fees = _this.fees.groww.regulatory_statutory_charges.sebi_turnover_charge.futures.buy;
                sebi_turnover_charge = _this.fee_type(sebi_turnover_charge_fees, order_amount);

                // any penalty
                let penalty = 0;
                // const time = new Date(txnData.trade_date);
                // const today = new Date();

                // if (time > today ) {
                //     penalty = _this.fees.groww.penalties.delayed_payment_charges;
                // }

                total_tax = stt + stamp_duty + exchange_transaction_charge + sebi_turnover_charge + penalty;

                total_fees = brokerage + total_tax;

                total_net_amount = order_amount + total_fees;

                return {
                    total_fees: total_fees,
                    total_tax: total_tax,
                    total_net_amount: total_net_amount,
                    total_amount: total_amount
                }
            }
            if (txnData.txn_type === 'sell') {
            }
        } catch (error) {
            return error;
        }
    }

    async fee_type(fee, price) {
        if (fee.type === 'flat') {
            return price;
        }
        if (fee.type === 'percentage') {
            return (price * fee.price) / 100;
        }

        return fee.price;
    }
}