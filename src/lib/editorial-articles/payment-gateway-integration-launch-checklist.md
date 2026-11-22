A payment gateway integration is ready when your team can match a customer’s payment, the storefront order, the gateway record and the settlement report. Test more than a successful checkout. Failed, cancelled and late confirmations can reveal duplicate orders, mismatched stock or support processes that are unclear to the buyer.

## Prepare the merchant account and checkout rules

### Confirm eligibility and payment options

Check which payment methods your business can accept in the relevant merchant account. In India this can include UPI, cards, net banking or other methods supported by your chosen provider and the platform configuration. Confirm the payment methods shown on mobile and desktop. Review applicable provider charges, settlement cycles and refund terms directly with the provider. Keep a record of who owns billing and who receives gateway alerts.

Agree which checkout methods apply to specific products, order values or delivery addresses. A fragile or high-value item may need an exception. If your site offers cash on delivery, make the distinction clear in order status and reporting. Ask finance to verify how shipping, discounts and GST details appear in the invoice where relevant. Verify that the customer sees the final total before they confirm payment.

### Separate test and production settings

Use the gateway’s test mode and supported test data while validating ordinary and exceptional scenarios. Confirm the production store never depends on test credentials. Keep server credentials in the deployment environment or an approved secret store, with access restricted to responsible staff. Document who can rotate credentials and where the team can check integration health. Use the provider’s current setup documentation for exact configuration details.

## Test the buyer journey on a real mobile device

Begin with two representative carts. Include a straightforward order and one that needs shipping, a discount or a product variant. Verify that the gateway receives the same order identifier, amount and currency that the shopper saw. On success, confirm the buyer receives one order confirmation and staff see the order in the expected fulfilment queue.

- Try a successful payment, a declined payment and a cancellation.
- Close the checkout or switch apps before completion and review the recovery flow.
- Verify the correct status when the customer returns slowly or reopens the order.
- Check confirmation content for order reference, items, amount and support details.
- Run an accessibility check on errors, mobile navigation and keyboard operation.

Give shoppers a clear way to recover from an uncertain outcome. A message such as “We’re checking your payment” can point to order status and support instead of forcing an immediate retry. Ask staff how they will confirm an order if the buyer has a gateway reference but never saw a success page.

## Verify what makes an order paid

### Agree which signal is authoritative

An order page is a customer-facing response, while your server should verify payment using the provider’s documented process. Check the provider’s signature or verification requirements and make sure an incoming event corresponds to the expected merchant account, amount and order. Store identifiers the support and finance teams can use for reconciliation.

Review the order lifecycle with the developer. An order may be created pending payment, move to paid after confirmation and later be refunded. Define who can change each state and how actions such as stock reservation or shipment are triggered. Keep an audit trail so your team can investigate a disputed or incomplete order.

### Rehearse delayed and repeated notifications

Gateways may deliver events later than expected or repeat them after an interruption. Test duplicate deliveries by using supported test events and confirm the same payment changes the order only once. Also check what happens when a browser confirms before the server event arrives, or the store receives a confirmation after the shopper closes checkout. The rest of the workflow should produce one coherent order record.

## Check refunds, reconciliation and support

Request a partial and full refund in test mode if the provider supports those scenarios. Verify the order and gateway displays show the expected status and reference. A refund may have processing stages. Tell staff which status is enough to acknowledge a request and which status means resolution. Review tax adjustments and stock changes according to your business’s procedure.

Walk the finance team through matching order references, payment references, settlement entries, fees and refunds. A payment can be captured before it appears in a settlement. The report should identify this as an expected timing difference where appropriate. Define who follows up when an amount cannot be matched or an order remains in a pending status beyond the agreed window.

## Example of an exception worth testing

A customer sees a pending message after paying with a mobile app and tries to place the same order again. The first payment confirms shortly afterwards. Decide how the website lets the buyer check the first order, how support can identify both attempts and how staff resolve a duplicate if one occurs. Review which action triggers stock or shipment so the buyer does not receive two dispatches unexpectedly.

Stage the exercise with customer support, finance and fulfilment. Ask each team to find the same transaction without sharing confidential details across chat or screenshots. Include the gateway reference, order number and last known status in the handoff instructions.

## Final checks before launch

- Verify production credentials, payment methods and notification endpoints.
- Confirm which employee receives alerts and can contact gateway support.
- Save a signed-off test report and a plan for checkout maintenance.
- Run an approved low-value live purchase and refund when appropriate.
- Continue reviewing payment failures and mismatches after launch.

A successful launch means the merchant knows which orders can ship, customers know where to check a payment and finance can explain the settlement. Use that shared definition to decide whether your integration is ready.

### Assign a stop condition for the launch

Before enabling live checkout, agree which outcomes require pausing transactions. Examples include repeated success messages with no matching order or a shipping amount that changes at the payment step. Document who can disable the affected payment method, what customers should see while the issue is investigated and which other methods can safely stay available. Record a repeatable validation step for re-enabling checkout, including a sample order, order record and settlement reference.

Store the final checklist where the on-call team can find it. Add the date, merchant account and deployment version so staff know which setup was tested if the payment provider or checkout theme changes.

[Razorpay payment gateway documentation](https://razorpay.com/docs/payments/payment-gateway/) · [Ecommerce development](/solutions/ecommerce-development) · [Inventory and CRM planning](/blog/ecommerce-inventory-crm-integration-plan)

## Frequently asked questions

### What payment cases should I test before going live?
Test successful, declined, cancelled and delayed payments, plus duplicates and refunds. Observe the customer message, order status, emails, stock and finance records in each case.

### Why can a payment be successful while an order is pending?
The store may still be processing confirmation, or the provider notification may be delayed. Staff should verify with the gateway and order reference before asking the buyer to try again.

### Can a webhook be delivered twice?
Yes. Providers can retry events. The integration should recognise events already handled so a repeated confirmation does not create another order or shipment.

### Should I make a live payment after launch?
Where approved by the business and supported by the provider, try a low-value purchase and refund after production configuration. Document the references and confirm both systems report the expected outcome.
