var request = require("request");
// Configure Cloudinary

const test = (req, res) => {
  // console.log("test");
  // console.log(req.body);
  var reservation_data = req.body.data;
  var user_data_from_hqrentals;
  // console.log(req.body.data.flight_airline);
  // console.log(req.body.data.flight_number);
  // console.log(req.body.data.flight_departure_airline);
  // console.log(req.body.data.flight_departure_number);
  // console.log(reservation_data.customer_id);
  if (
    reservation_data.customer_id != null ||
    reservation_data.customer_id != "" ||
    reservation_data.customer_id != undefined
  ) {
    var options = {
      method: "GET",
      url: `https://api-america-3.us5.hqrentals.app/api-america-3/contacts/categories/3/contacts/${reservation_data.customer_id}`,
      headers: {
        Authorization:
          "Basic MlVNUGQwNW1BVDZkZWczZExUaERIR0tFTGs5YWVzNE80bXdQcFVNNzFPSjI4MkNlRWg6aHc5aXRzc2lzTEVJb2pVU2ZvMlRtYVEwVWUyeTJRT1RzRG9rcTh3RVZpSXBkSUxmSFQ=",
      },
      formData: {},
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      // console.log(response.body);
      user_data_from_hqrentals = JSON.parse(response.body);
      // console.log(user_data_from_hqrentals.contact);
      // user_data_from_hqrentals.contact.email

      var url =
        "https://rentsmartrac.myfreshworks.com/crm/sales/api/contacts/view/26001853817";
      headers = {
        Authorization: "Token token=VxIxI3hJkd6ar2oyBmMquw",
        "Content-Type": "application/json",
      };
      options = {
        url,
        method: "GET",
        headers,
      };
      request(options, (error, response, body) => {
        if (error) {
          console.error(`Error: ${error}`);
        } else {
          // console.log(body)
          var contact_data_from_freshworks = JSON.parse(body);
          // console.log(contact_data_from_freshworks);
          // console.log(user_data_from_hqrentals.contact);
          contact_data_from_freshworks.contacts.forEach((element) => {
            //
            if (element.email == user_data_from_hqrentals.contact.email) {
              // console.log(req.body.data.pick_up_date);
              // const timestampString = '2023-12-07T08:00:00.000000Z';
              var pick_up_date1 = new Date(req.body.data.pick_up_date);
              pick_up_date1 = pick_up_date1.toLocaleDateString();
              var return_date2 = new Date(req.body.data.return_date);
              return_date2 = return_date2.toLocaleDateString();
              // console.log();
              // console.log(req.body.data.pick_up_time);
              // console.log(req.body.data.return_date);
              // console.log(req.body.data.return_time);
              var cf_wifihotspot1 = "NO";
              var cf_tire_and_glass_protection1 = "NO";
              var cf_sim_card1 = "NO";
              var cf_promo_sim_card1 = "NO";
              var cf_silla_para_nios1 = "NO";
              var cf_tablet__unlimited_internet_data1 = "NO";
              var options = {
                method: "GET",
                url: `https://api-america-3.us5.hqrentals.app/api-america-3/car-rental/reservations/${req.body.data.id}`,
                headers: {
                  Authorization:
                    "Basic MlVNUGQwNW1BVDZkZWczZExUaERIR0tFTGs5YWVzNE80bXdQcFVNNzFPSjI4MkNlRWg6aHc5aXRzc2lzTEVJb2pVU2ZvMlRtYVEwVWUyeTJRT1RzRG9rcTh3RVZpSXBkSUxmSFQ=",
                },
              };
              request(options, function (error, response) {
                if (error) throw new Error(error);
                var contact_data_from_freshworks43 = JSON.parse(response.body);

                // console.log(
                //   contact_data_from_freshworks43.data
                //     .selected_additional_charges
                // );

                contact_data_from_freshworks43.data.selected_additional_charges.forEach(
                  (element) => {
                    console.log(element.label);
                    switch (element.label) {
                      case "Sim Card": {
                        cf_sim_card1 = "YES";
                        break;
                      }
                      case "Silla Para Niños": {
                        cf_silla_para_nios1 = "YES";
                        break;
                      }
                      case "Tablet - Unlimited Internet Data": {
                        cf_tablet__unlimited_internet_data1 = "YES";
                        break;
                      }
                      case "PROMO ESPECIAL- 2 SIM CARD": {
                        cf_promo_sim_card1 = "YES";
                        break;
                      }
                      case "Wifi/Hotspot": {
                        cf_wifihotspot1 = "YES";
                        break;
                      }
                      case "Tire and Glass Protection": {
                        cf_tire_and_glass_protection1 = "YES";
                        break;
                      }
                      default:
                        break;
                    }
                    // console.log(element);
                  }
                );
              });

              url = `https://rentsmartrac.myfreshworks.com/crm/sales/api/contacts/${element.id}`;
              headers = {
                Authorization: "Token token=VxIxI3hJkd6ar2oyBmMquw",
                "Content-Type": "application/json",
              };
              requestData = {
                contact: {
                  first_name: req.body.data.first_name,
                  last_name: req.body.data.last_name,
                  display_name:
                    req.body.data.first_name + " " + req.body.data.last_name,
                  city: req.body.data.city,
                  state: req.body.data.state,
                  zipcode: req.body.data.zip,
                  country: req.body.data.country,
                  email: req.body.data.email,
                  mobile_number: req.body.data.phone_number,
                  address: req.body.data.street,
                  custom_field: {
                    // flight_departure_date

                    cf_flight_airline: req.body.data.flight_airline,
                    cf_flight_number: req.body.data.flight_number,
                    cf_departure_flight_airline:
                      req.body.data.flight_departure_airline,
                    cf_departure_flight_number:
                      req.body.data.flight_departure_number,
                    cf_pick_up_location: req.body.data.pick_up_location_label,
                    cf_drop_off_location: req.body.data.return_location_label,
                    cf_drop_off_time: req.body.data.return_time,
                    // cf_vehicle_class: req.body.data.,
                    // cf_terminal: req.body.data.,/

                    cf_wifihotspot: cf_wifihotspot1,
                    cf_tire_and_glass_protection: cf_tire_and_glass_protection1,
                    cf_sim_card: cf_sim_card1,
                    cf_promo_sim_card: cf_promo_sim_card1,
                    cf_silla_para_nios: cf_silla_para_nios1,
                    cf_tablet__unlimited_internet_data:
                      cf_tablet__unlimited_internet_data1,

                    cf_pick_up_date: req.body.data.pick_up_date,
                    cf_drop_off_date: req.body.data.return_date,
                    cf_pick_up_time: req.body.data.pick_up_time,
                    // cf_dl_number: req.body.data.,
                    // cf_dl_expiration_date: req.body.data.,
                  },
                },
              };
              options = {
                url,
                method: "PUT",
                headers,
                json: requestData, // Automatically sets the content-type to application/json
              };
              request(options, (error, response, body) => {
                if (error) {
                  console.error(`Error: ${error}`);
                } else {
                  console.log("data updated");
                  return res.status(200).json({ mgs: "Data Updated" });
                }
              });
            }
          });
        }
      });
    });
  }
  // pehla_data.customer_id;
  // {
  //   0|index  |   action: 'updated',
  //   0|index  |   item: 'App\\Modules\\CarRental\\Models\\Reservation',
  //   0|index  |   data: {
  //   0|index  |     id: 13207,
  //   0|index  |     prefixed_id: 'MIA - 13207',
  //   0|index  |     custom_reservation_number: null,
  //   0|index  |     pick_up_date: '2023-10-20T09:00:00.000000Z',
  //   0|index  |     initial_pick_up_date: '2023-10-20T09:00:00.000000Z',
  //   0|index  |     return_date: '2023-10-21T12:00:00.000000Z',
  //   0|index  |     initial_return_date: null,
  //   0|index  |     flight_arrival_date: '2023-10-20T09:00:00.000000Z',
  //   0|index  |     cancellation_date: null,
  //   0|index  |     cancellation_comments: null,
  //   0|index  |     cancellation_reason_id: null,
  //   0|index  |     cancelled_by: null,
  //   0|index  |     cancelled_at: null,
  //   0|index  |     brand_id: 1,
  //   0|index  |     initial_brand_id: 1,
  //   0|index  |     vehicle_class_id: 4,
  //   0|index  |     free_vehicle_class_upgrade_id: null,
  //   0|index  |     pick_up_location_id: 2,
  //   0|index  |     return_location_id: 2,
  //   0|index  |     flight_number: '',
  //   0|index  |     flight_airline: '',
  //   0|index  |     pick_up_location_custom: null,
  //   0|index  |     return_location_custom: '',
  //   0|index  |     local_address: null,
  //   0|index  |     customer_id: 31957,
  //   0|index  |     currency: 'usd',
  //   0|index  |     rack_price: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '57.60',
  //   0|index  |       usd_amount: '57.60',
  //   0|index  |       amount_for_display: '$57.60'
  //   0|index  |     },
  //   0|index  |     equipment_price: null,
  //   0|index  |     miscellaneous_price: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '4.31',
  //   0|index  |       usd_amount: '4.31',
  //   0|index  |       amount_for_display: '$4.31'
  //   0|index  |     },
  //   0|index  |     protections_price: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '73.30',
  //   0|index  |       usd_amount: '73.30',
  //   0|index  |       amount_for_display: '$73.30'
  //   0|index  |     },
  //   0|index  |     external_charges_price: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '0.00',
  //   0|index  |       usd_amount: '0.00',
  //   0|index  |       amount_for_display: '$0.00'
  //   0|index  |     },
  //   0|index  |     discounts_amount: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '14.40',
  //   0|index  |       usd_amount: '14.40',
  //   0|index  |       amount_for_display: '$14.40'
  //   0|index  |     },
  //   0|index  |     taxes_amount: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '4.31',
  //   0|index  |       usd_amount: '4.31',
  //   0|index  |       amount_for_display: '$4.31'
  //   0|index  |     },
  //   0|index  |     security_deposit: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '500.00',
  //   0|index  |       usd_amount: '500.00',
  //   0|index  |       amount_for_display: '$500.00'
  //   0|index  |     },
  //   0|index  |     security_deposit_excess: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '2500.00',
  //   0|index  |       usd_amount: '2500.00',
  //   0|index  |       amount_for_display: '$2,500.00'
  //   0|index  |     },
  //   0|index  |     manual_discount: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '0.00',
  //   0|index  |       usd_amount: '0.00',
  //   0|index  |       amount_for_display: '$0.00'
  //   0|index  |     },
  //   0|index  |     manual_discount_percentage: '0.00',
  //   0|index  |     manual_discount_is_percentage: 0,
  //   0|index  |     government_tax: '0.0000000',
  //   0|index  |     abb_tax: '7.0000000',
  //   0|index  |     location_fee: '0.0000000',
  //   0|index  |     outstanding_balance: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '0.00',
  //   0|index  |       usd_amount: '0.00',
  //   0|index  |       amount_for_display: '$0.00'
  //   0|index  |     },
  //   0|index  |     status: 'pending',
  //   0|index  |     completed_at: null,
  //   0|index  |     completed_by: null,
  //   0|index  |     reopened_by: null,
  //   0|index  |     after_sale_email_sent: false,
  //   0|index  |     forced_security_deposit_id: null,
  //   0|index  |     reservation_from_website: false,
  //   0|index  |     created_by: 26298,
  //   0|index  |     updated_by: 26298,
  //   0|index  |     deleted_at: null,
  //   0|index  |     created_at: '2023-10-20T09:53:57.000000Z',
  //   0|index  |     updated_at: '2023-10-20T11:29:52.000000Z',
  //   0|index  |     uuid: 'ykxtzrcm-xmlj-vgn1-pa0t-2uj3kmwttf7u',
  //   0|index  |     uuid_short: 'K4WyijP0ihdD',
  //   0|index  |     no_show_fee: null,
  //   0|index  |     cancellation_fee: null,
  //   0|index  |     direct_booker_ip: null,
  //   0|index  |     country_code: null,
  //   0|index  |     region_code: null,
  //   0|index  |     zip_code: null,
  //   0|index  |     booker_information: null,
  //   0|index  |     percentage_discount_from_to_commission: null,
  //   0|index  |     was_reopened: false,
  //   0|index  |     has_package_reservation: false,
  //   0|index  |     primary_agent_id: null,
  //   0|index  |     secondary_agents: null,
  //   0|index  |     primary_return_agent_id: null,
  //   0|index  |     secondary_return_agents: null,
  //   0|index  |     walk_in_customer: false,
  //   0|index  |     security_deposit_automatically_charged: false,
  //   0|index  |     security_deposit_paid: false,
  //   0|index  |     exchange_rate_from_currency_to_base: '1.000000000000000000000000000000',
  //   0|index  |     digital_signature: null,
  //   0|index  |     reservation_commission: null,
  //   0|index  |     loan_reservation: null,
  //   0|index  |     distance_limit_per_day: 0,
  //   0|index  |     distance_limit_per_week: 0,
  //   0|index  |     distance_limit_per_month: 0,
  //   0|index  |     return_reminder_email_sent: false,
  //   0|index  |     last_day_counts_for_calculations: null,
  //   0|index  |     reservation_interval: null,
  //   0|index  |     digital_signature_for_initials: null,
  //   0|index  |     signed_at: null,
  //   0|index  |     initials_signed_at: null,
  //   0|index  |     base_reservation_commission: '0.0000000',
  //   0|index  |     commission_type: 'percentage',
  //   0|index  |     disable_renewal: false,
  //   0|index  |     renew_contract_x_days_in_advance: 0,
  //   0|index  |     security_deposit_refunded: false,
  //   0|index  |     referral: null,
  //   0|index  |     security_deposit_charged_amount: 0,
  //   0|index  |     security_deposit_refunded_amount: null,
  //   0|index  |     distance_manually_updated: 0,
  //   0|index  |     transaction_fees_price: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '0.00',
  //   0|index  |       usd_amount: '0.00',
  //   0|index  |       amount_for_display: '$0.00'
  //   0|index  |     },
  //   0|index  |     distance_limit: 0,
  //   0|index  |     force_renewal_to_x_days: 0,
  //   0|index  |     reserved_from: '2023-10-20T09:53:57.000000Z',
  //   0|index  |     percentage_charges_over_discounted_rate: true,
  //   0|index  |     damages_price: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '0.00',
  //   0|index  |       usd_amount: '0.00',
  //   0|index  |       amount_for_display: '$0.00'
  //   0|index  |     },
  //   0|index  |     charge_distance_when_limit_is_zero: false,
  //   0|index  |     dont_include_location_fee_in_tax_calculation: false,
  //   0|index  |     reservation_type: 'short',
  //   0|index  |     ota_reservation_type: null,
  //   0|index  |     ota_reservation_id: null,
  //   0|index  |     user_digital_signature_id: null,
  //   0|index  |     user_digital_signature_for_initials_id: null,
  //   0|index  |     car_sharing_vehicle_returned: 0,
  //   0|index  |     total_price: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '130.90',
  //   0|index  |       usd_amount: '130.90',
  //   0|index  |       amount_for_display: '$130.90'
  //   0|index  |     },
  //   0|index  |     authorization_transaction_id: null,
  //   0|index  |     reservation_started_at: 1697792400,
  //   0|index  |     reservation_ended_at: 1697889600,
  //   0|index  |     flight_departure_date: '2023-10-21T12:00:00.000000Z',
  //   0|index  |     flight_departure_number: '',
  //   0|index  |     flight_departure_airline: '',
  //   0|index  |     total_rack_rate: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '57.60',
  //   0|index  |       usd_amount: '57.60',
  //   0|index  |       amount_for_display: '$57.60'
  //   0|index  |     },
  //   0|index  |     total_insurances: 0,
  //   0|index  |     total_extras: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '69.30',
  //   0|index  |       usd_amount: '69.30',
  //   0|index  |       amount_for_display: '$69.30'
  //   0|index  |     },
  //   0|index  |     total_taxes: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '8.31',
  //   0|index  |       usd_amount: '8.31',
  //   0|index  |       amount_for_display: '$8.31'
  //   0|index  |     },
  //   0|index  |     total_revenue: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '126.90',
  //   0|index  |       usd_amount: '126.90',
  //   0|index  |       amount_for_display: '$126.90'
  //   0|index  |     },
  //   0|index  |     total_paid: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '135.21',
  //   0|index  |       usd_amount: '135.21',
  //   0|index  |       amount_for_display: '$135.21'
  //   0|index  |     },
  //   0|index  |     total_refunded: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '0.00',
  //   0|index  |       usd_amount: '0.00',
  //   0|index  |       amount_for_display: '$0.00'
  //   0|index  |     },
  //   0|index  |     total_days: 1,
  //   0|index  |     rental_user_id: null,
  //   0|index  |     dont_include_vehicle_damages_in_location_fee: false,
  //   0|index  |     dont_include_vehicle_damages_in_taxes: false,
  //   0|index  |     synced_to_amazon_s3: 0,
  //   0|index  |     internal_reservation: false,
  //   0|index  |     total_location_fee: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '0.00',
  //   0|index  |       usd_amount: '0.00',
  //   0|index  |       amount_for_display: '$0.00'
  //   0|index  |     },
  //   0|index  |     total_abb_tax: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '4.31',
  //   0|index  |       usd_amount: '4.31',
  //   0|index  |       amount_for_display: '$4.31'
  //   0|index  |     },
  //   0|index  |     total_government_tax: null,
  //   0|index  |     include_external_charges_in_location_fee: true,
  //   0|index  |     include_external_charges_in_taxes: true,
  //   0|index  |     last_payment_request_sent_at: null,
  //   0|index  |     last_payment_at: '2023-10-20T00:00:00.000000Z',
  //   0|index  |     user_agent: null,
  //   0|index  |     security_deposit_was_manually_changed: null,
  //   0|index  |     security_deposit_excess_was_manually_changed: null,
  //   0|index  |     language: 'en',
  //   0|index  |     preferred_credit_card_id: null,
  //   0|index  |     external_charge_account_id: null,
  //   0|index  |     multiple_seasons_for_weekdays: 0,
  //   0|index  |     mandatory_charges_based_on_combinations_enabled: 1,
  //   0|index  |     website_internal_confirmation_email_sent: false,
  //   0|index  |     confirmation_email_sent: 1,
  //   0|index  |     round_amounts_to_two_decimals_on_calculations: 0,
  //   0|index  |     max_hours_before_daily_price: '3.00',
  //   0|index  |     max_hours_before_daily_price_additional_charges: '3.00',
  //   0|index  |     rate_type_id: 0,
  //   0|index  |     without_mandatory_charges: false,
  //   0|index  |     renew_contract_x_hours_after_planned_return_date: 0,
  //   0|index  |     extension_paid_until: '2023-10-21T12:00:00.000000Z',
  //   0|index  |     has_pending_extensions: false,
  //   0|index  |     grace_period_hours_for_picking_up_cars: '0.00',
  //   0|index  |     grace_period_hours_for_returning_cars: '1.00',
  //   0|index  |     no_show_by: null,
  //   0|index  |     no_show_at: null,
  //   0|index  |     check_value_pricing_on_daily_vs_weekly_rates: false,
  //   0|index  |     availability_percentage_at_creation: '10.0000',
  //   0|index  |     enable_multiple_seasons_bookings: 1,
  //   0|index  |     enable_season_rates_based_on_multipliers: 0,
  //   0|index  |     forced_close_reason: null,
  //   0|index  |     driver_validated: false,
  //   0|index  |     ready_for_pick_up: false,
  //   0|index  |     ready_for_pick_up_approval_user_id: null,
  //   0|index  |     ready_for_pick_up_at: null,
  //   0|index  |     f294: '[]',
  //   0|index  |     enable_self_service_test_mode: false,
  //   0|index  |     signature_metadata: null,
  //   0|index  |     initials_signature_metadata: null,
  //   0|index  |     enable_self_service: true,
  //   0|index  |     enable_auto_pick_up: false,
  //   0|index  |     enable_auto_return: false,
  //   0|index  |     reservation_email_template_name: null,
  //   0|index  |     f381: null,
  //   0|index  |     disable_all_emails: false,
  //   0|index  |     f393: null,
  //   0|index  |     pick_up_location_label: 'Miami International Airport',
  //   0|index  |     return_location_label: 'Miami International Airport',
  //   0|index  |     reservation_type_label: 'Short Term',
  //   0|index  |     brand_label: 'RS Miami',
  //   0|index  |     total_price_without_taxes: {
  //   0|index  |       currency: 'usd',
  //   0|index  |       currency_icon: '$',
  //   0|index  |       amount: '130.90',
  //   0|index  |       usd_amount: '130.90',
  //   0|index  |       amount_for_display: '$130.90'
  //   0|index  |     },
  //   0|index  |     pick_up_time: '5:00 AM',
  //   0|index  |     return_time: '8:00 AM',
  //   0|index  |     notes: ''
  //   0|index  |   }
  //   0|index  | }
  // return res.status(200).json({ msg: "done" });
  // https://api-america-2.caagcrm.com/api-america-2/
  // 2UMPd05mAT6deg3dLThDHGKELk9aes4O4mwPpUM71OJ282CeEh

  //   "id": 61,
  //   "additional_charge_category": {
  //       "id": 2,
  //       "label": {
  //           "en": "Equipment & Services",
  //           "es": "Equipos y Servicios"
  //       },
  //       "icon": null,
  //       "order": 2,
  //       "active": 1,
  //       "version": 1,
  //       "allowed_roles_for_edit": null
  //   },
  //   "label": "Wifi/Hotspot",
  //   "label_for_website": {
  //       "en": "Wifi/Hotspot",
  //       "es": "Wifi/Hotspot",
  //       "pt": "Wifi/Hotspot"
  //   },
  //   "icon": "fas fa-wifi",
  //   "image": null,
  //   "recommended": false,
  //   "short_description": "<p>Up&nbsp;to 40Gb Great option to use with WHATTSAPP, WAZE, GOOGLE MAPS from your own phone.</p>",
  //   "description": "Wifi/Hotspot",
  //   "order": null,
  //   "selected_quantity": 1,
  //   "charge_type": "amount",
  //   "base_price": "29.9900000",
  //   "base_price_with_taxes": {
  //       "currency": "usd",
  //       "currency_icon": "$",
  //       "amount": "32.09",
  //       "usd_amount": "32.09",
  //       "amount_for_display": "$32.09"
  //   },
  //   "total_price": {
  //       "currency": "usd",
  //       "currency_icon": "$",
  //       "amount": "29.99",
  //       "usd_amount": "29.99",
  //       "amount_for_display": "$29.99"
  //   },
  //   "total_price_with_taxes": {
  //       "currency": "usd",
  //       "currency_icon": "$",
  //       "amount": "32.09",
  //       "usd_amount": "32.09",
  //       "amount_for_display": "$32.09"
  //   },
  //   "distance_package": {
  //       "61_0": "None"
  //   },
  //   "distance_package_rates": false,
  //   "selection_type": "only_one"
  // }
  //update contact

  // eyJraWQiOiJjdXN0b20tb2F1dGgta2V5aWQiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmcmVzaGNoYXQiLCJzdWIiOiI1Y2UwY2UyNy03MDEwLTRjZjEtYmFmMS01NDY2OTNkNDZjMjUiLCJjbGllbnRJZCI6ImZjLTg5Y2U4OTI0LTE1ZGUtNGQ2OC05ZTA4LWI2Yzg5YmY3NzQyNSIsInNjb3BlIjoiYWdlbnQ6cmVhZCBhZ2VudDpjcmVhdGUgYWdlbnQ6dXBkYXRlIGFnZW50OmRlbGV0ZSBjb252ZXJzYXRpb246Y3JlYXRlIGNvbnZlcnNhdGlvbjpyZWFkIGNvbnZlcnNhdGlvbjp1cGRhdGUgbWVzc2FnZTpjcmVhdGUgbWVzc2FnZTpnZXQgYmlsbGluZzp1cGRhdGUgcmVwb3J0czpmZXRjaCByZXBvcnRzOmV4dHJhY3QgcmVwb3J0czpyZWFkIHJlcG9ydHM6ZXh0cmFjdDpyZWFkIGFjY291bnQ6cmVhZCBkYXNoYm9hcmQ6cmVhZCB1c2VyOnJlYWQgdXNlcjpjcmVhdGUgdXNlcjp1cGRhdGUgdXNlcjpkZWxldGUgb3V0Ym91bmRtZXNzYWdlOnNlbmQgb3V0Ym91bmRtZXNzYWdlOmdldCBtZXNzYWdpbmctY2hhbm5lbHM6bWVzc2FnZTpzZW5kIG1lc3NhZ2luZy1jaGFubmVsczptZXNzYWdlOmdldCBtZXNzYWdpbmctY2hhbm5lbHM6dGVtcGxhdGU6Y3JlYXRlIG1lc3NhZ2luZy1jaGFubmVsczp0ZW1wbGF0ZTpnZXQgZmlsdGVyaW5ib3g6cmVhZCBmaWx0ZXJpbmJveDpjb3VudDpyZWFkIHJvbGU6cmVhZCBpbWFnZTp1cGxvYWQiLCJpc3MiOiJmcmVzaGNoYXQiLCJ0eXAiOiJCZWFyZXIiLCJleHAiOjIwMDEyNDY1MDYsImlhdCI6MTY4NTYyNzMwNiwianRpIjoiM2MzNzA3NmYtYzc4My00ZTU3LWFhYjItYWU4ZTlmZjYxMWU3In0.4etd9AVNQxCigpKPPbKp-B0D387Y_BX4U0GnCvccU_c
};

const update_contact = (req, res) => {
  // console.log(req.body);
  const user_data_from_hqrentals = req.body.data;
  // console.log(user_data_from_hqrentals);
  // data: {
  //   0|-a  |     id: 35703,
  //   0|-a  |     label: 'Asif1 Ahmed Ali',
  //   0|-a  |     entity: 'person',
  //   0|-a  |     first_name: 'Asif1',
  //   0|-a  |     last_name: 'Ahmed Ali',
  //   0|-a  |     gender: null,
  //   0|-a  |     birthdate: '2000-05-09',
  //   0|-a  |     birthdate_day: '09',
  //   0|-a  |     birthdate_month: '05',
  //   0|-a  |     birthdate_year: '2000',
  //   0|-a  |     birthplace: null,
  //   0|-a  |     nationality: null,
  //   0|-a  |     street: 'H#599, St#45, B-17, Islamabad',
  //   0|-a  |     street2: null,
  //   0|-a  |     last_rental: null,
  //   0|-a  |     city: 'islamabad',
  //   0|-a  |     state: 'asdf',
  //   0|-a  |     zip: '44000',
  //   0|-a  |     county: null,
  //   0|-a  |     country: 'pk',
  //   0|-a  |     email: 'asif@mexil.it',
  //   0|-a  |     website: null,
  //   0|-a  |     phone_number: '03331871434',
  //   0|-a  |     uuid: 'piiprnxd-fnki-onmy-kafz-mu82hgs4gz2y',
  //   0|-a  |     created_by: 26298,
  //   0|-a  |     updated_by: 26298,
  //   0|-a  |     deleted_at: null,
  //   0|-a  |     created_at: '2023-11-10T01:57:15.000000Z',
  //   0|-a  |     updated_at: '2023-11-17T09:35:31.000000Z',
  //   0|-a  |     driver_license: null,
  //   0|-a  |     phone_alternative: null,
  //   0|-a  |     email_alternative: null,
  //   0|-a  |     housenumber: null,
  //   0|-a  |     suburb: null,
  //   0|-a  |     identification: null,
  //   0|-a  |     phone_cc: null,
  //   0|-a  |     phone_country: null,
  //   0|-a  |     accounting_list_id: null,
  //   0|-a  |     accounting_edit_sequence: null,
  //   0|-a  |     password: null,
  //   0|-a  |     reset_password_token: null,
  //   0|-a  |     expiration_date_for_password_reset_token: null,
  //   0|-a  |     phone_ext: null,
  //   0|-a  |     f193: null,
  //   0|-a  |     f194: null,
  //   0|-a  |     f195: null,
  //   0|-a  |     f196: null,
  //   0|-a  |     f198: null,
  //   0|-a  |     invoices_currency: '',
  //   0|-a  |     invoices_open_balance: null,
  //   0|-a  |     invoices_overdue_balance: null,
  //   0|-a  |     car_rental_reservation_count: 1,
  //   0|-a  |     external_contact_type: null,
  //   0|-a  |     external_contact_id: null,
  //   0|-a  |     car_rental_balance: null,
  //   0|-a  |     expiration_notification_sent: 0,
  //   0|-a  |     f252: null,
  //   0|-a  |     f254: null,
  //   0|-a  |     f256: null,
  //   0|-a  |     from_public_form: false,
  //   0|-a  |     verified: true,
  //   0|-a  |     language: 'en',
  //   0|-a  |     invoices_last_reminder_sent_at: null,
  //   0|-a  |     id_verification_id: null,
  //   0|-a  |     f298: 'Asif Ahmed Ali',
  //   0|-a  |     f299: null,
  //   0|-a  |     f300: null,
  //   0|-a  |     f301: null,
  //   0|-a  |     f309: '{"items":{"1":{"type":"mobile","number":"+923331871434","cc":"92","ext":"","id":"10058","country":"pk"}}}',
  //   0|-a  |     f354: null,
  //   0|-a  |     f356: null
  //   0|-a  |   }
  // cf_dl_number
  // cf_dl_expiration_date

  // driver_license:
  // f256:
  var url =
    "https://rentsmartrac.myfreshworks.com/crm/sales/api/contacts/view/26001853820";
  headers = {
    Authorization: "Token token=VxIxI3hJkd6ar2oyBmMquw",
    "Content-Type": "application/json",
  };
  options = {
    url,
    method: "GET",
    headers,
  };
  request(options, (error, response, body) => {
    if (error) {
      console.error(`Error: ${error}`);
    } else {
      // console.log(body)
      var contact_data_from_freshworks = JSON.parse(body);
      // console.log(contact_data_from_freshworks);
      contact_data_from_freshworks.contacts.forEach((element) => {
        //
        if (element.email == user_data_from_hqrentals.email) {
          url = `https://rentsmartrac.myfreshworks.com/crm/sales/api/contacts/${element.id}`;
          headers = {
            Authorization: "Token token=VxIxI3hJkd6ar2oyBmMquw",
            "Content-Type": "application/json",
          };
          requestData = {
            contact: {
              first_name: req.body.data.first_name,
              last_name: req.body.data.last_name,
              display_name:
                req.body.data.first_name + " " + req.body.data.last_name,
              city: req.body.data.city,
              state: req.body.data.state,
              zipcode: req.body.data.zip,
              country: req.body.data.country,
              email: req.body.data.email,
              mobile_number: req.body.data.phone_number,
              address: req.body.data.street,
              custom_field: {
                cf_dl_number: req.body.data.driver_license,
                cf_dl_expiration_date: req.body.data.f256,
              },
            },
          };
          options = {
            url,
            method: "PUT",
            headers,
            json: requestData, // Automatically sets the content-type to application/json
          };
          request(options, (error, response, body) => {
            if (error) {
              console.log(`Error: ${error}`);
            } else {
              console.log("data updated");
              return res.status(200).json({ mgs: "Data Updated" });
            }
          });
        }
      });
    }
  });
};

const create_contact = (req, res) => {
  // console.log(req.body);
  // data: {
  //   0|-a  |     verified: true,
  //   0|-a  |     entity: 'person',
  //   0|-a  |     first_name: 'Asif',
  //   0|-a  |     last_name: 'Ahmed Ali',
  //   0|-a  |     email: 'asif@mexil.it',
  //   0|-a  |     f309: '{"items":{"1":{"type":"mobile","number":"333 1871434","cc":"92","ext":"","id":"","country":"pk"}}}',
  //   0|-a  |     phone_number: '03331871434',
  //   0|-a  |     street: 'H#599, St#45, B-17, Islamabad',
  //   0|-a  |     street2: null,
  //   0|-a  |     city: 'islamabad',
  //   0|-a  |     state: 'aksbdf',
  //   0|-a  |     zip: '44000',
  //   0|-a  |     country: 'pk',
  //   0|-a  |     birthdate: '2023-11-09',
  //   0|-a  |     deleted_at: null,
  //   0|-a  |     updated_by: 26298,
  //   0|-a  |     label: 'Asif Ahmed Ali',
  //   0|-a  |     birthdate_day: '09',
  //   0|-a  |     birthdate_month: '11',
  //   0|-a  |     birthdate_year: '2023',
  //   0|-a  |     created_by: 26298,
  //   0|-a  |     language: 'en',
  //   0|-a  |     uuid: 'pjx8q0u3-t8o2-ajh9-hf2z-svnqspvaruxh',
  //   0|-a  |     updated_at: '2023-11-17T09:41:56.000000Z',
  //   0|-a  |     created_at: '2023-11-17T09:41:56.000000Z',
  //   0|-a  |     id: 36739
  //   0|-a  |   }
  const options = {
    url: "https://rentsmartrac.myfreshworks.com/crm/sales/api/contacts",
    method: "POST",
    headers: {
      Authorization: "Token token=VxIxI3hJkd6ar2oyBmMquw",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact: {
        first_name: req.body.data.first_name,
        last_name: req.body.data.last_name,
        display_name: req.body.data.first_name + " " + req.body.data.last_name,
        city: req.body.data.city,
        state: req.body.data.state,
        zipcode: req.body.data.zip,
        country: req.body.data.country,
        email: req.body.data.email,
        mobile_number: req.body.data.phone_number,
        address: req.body.data.street,
        custom_field: {
          cf_dl_number: req.body.data.driver_license,
          cf_dl_expiration_date: req.body.data.f256,
        },
      },
    }),
  };

  request(options, function (error, response, body) {
    if (error) {
      console.log(error);
    } else {
      console.log(response.body);
      // var created_contact = JSON.parse(response);
      // console.log(created_contact.body);
      console.log("----------------");
      // console.log(body);
      console.log("Contact Created");
    }
  });
};
const test1 = (req, res) => {
  return res.status(200).json({ msg: "heelo bete" });
};

module.exports = {
  create_contact,
  test,
  test1,
  update_contact,
};
