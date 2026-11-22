A B2B ecommerce portal lets approved buyers view applicable prices, place bulk orders and request quotes under the rules your sales team already uses. Start with account approval, contract pricing and order exceptions. If a salesperson must correct most quotes or orders in a spreadsheet, those business rules need to be documented before development.

## Define buyers, accounts and permissions

### Decide what visitors can see before signing in

A wholesale catalogue can show public specifications and keep contract prices private. Decide whether visitors can see minimum quantities, lead times and delivery zones before registration. A distributor may want more transparent catalogue information to attract new buyers while restricting price and stock details to approved accounts.

Define each role in plain terms. An account administrator can add colleagues. A buyer can prepare an order. A manager may approve it before it reaches sales. A salesperson may review credit exceptions. Give developers examples of who sees which records, including buyers representing multiple branches. Confirm which records must remain separated by company or location.

### Keep account approval easy to audit

Decide which information your team needs to approve a buyer and which parts can be collected later. If you sell on credit, give the finance team a workflow to record approvals, credit limits and payment terms. Show the buyer whether an account is pending, approved or restricted and who they can contact for help.

## Design a price model you can explain

Work out how list prices, contract prices, volume tiers and promotions interact. Specify which rule takes precedence. Show a real SKU with an account discount and a higher quantity tier. Agree whether the tier applies across variants, across an entire order or per line item. Define how prices are rounded and what taxes and freight are shown to the buyer.

- Decide whether prices are tax-inclusive or exclusive for each customer journey.
- Document whether a quoted price is held until a deadline or recalculated upon conversion.
- Include minimum order quantities and pack multiples in the catalogue data.
- Verify how a credit limit interacts with orders already approved and invoices still open.
- Identify who can override a price and how the change is recorded.

Give support staff a way to answer how a price was calculated without exposing another dealer’s terms. A readable order summary with quantity, unit price and applicable adjustment can reduce disputes.

## Build quotes and approvals around visible states

### Map the request-for-quote workflow

A buyer may need a quote for a non-standard item, a delivery commitment or a volume price. Decide whether they can send a product list, upload a specification or select items from the catalogue. Establish an owner, expected response time and what happens if more details are needed. Keep the request and response history available to appropriate staff.

An RFQ often progresses through submitted, under review, quoted, accepted and expired. Agree which actions are allowed at each stage and whether the buyer can revise quantities. On conversion, the order should retain its link to the accepted quote and identify any delivery or payment terms the parties agreed.

### Decide which orders require approval

An order may need buyer-side approval because it exceeds a team budget, and it may need seller-side approval because of a stock, price or credit exception. Distinguish the two. A buyer should understand which party is reviewing the order and whether it is reserved, pending or ready to ship.

For example, an account has a credit limit of ₹2 lakh. An incoming order would exceed the limit after pending invoices are included. The portal can flag it for review instead of quietly accepting or rejecting it. Sales can offer revised quantities or alternative payment terms, with finance approval recorded for later reconciliation.

## Connect orders, stock and invoices

Identify which system owns item details, price lists, account terms and stock. If ERP owns stock, define how frequently changes reach the portal and how stale counts are shown. If you reserve stock during quote acceptance, specify when those reservations expire or are released. Test a short shipment and a return, since both can affect inventory and invoices.

Consider whether you need buyer purchase order numbers and invoice downloads. Agree how staff handle split shipments and partial fulfilment. For GST-related information, verify the expected business details and appropriate invoicing workflow with your finance team and current provider.

## Run a realistic acceptance test

Create two dealer accounts with different contract terms. Give them access to identical products and verify that prices and order history remain isolated. Test a quantity below the minimum, a bulk tier, an expired quote, a credit review and an order that cannot be dispatched in full. Observe what the buyer, sales and finance teams can see at each point.

- Confirm a dealer can reorder a previous purchase without accidentally using an old price.
- Verify company permissions on account pages, invoices and order exports.
- Check that repeated confirmation events do not create duplicate orders in the ERP.
- Review the mobile journey for a buyer who orders from a warehouse floor.
- Reconcile approved quotes with delivered orders and invoices.

Start with the rules that cover the highest share of your transactions. Track exceptions manually during the pilot where appropriate, then decide which patterns justify automation. A portal that handles core workflows reliably gives sales and operations a clearer starting point for growth.

## Make repeat ordering work for the buyer

Start with a previous order from a dealer who buys the same product every month. Their reorder may include retired SKUs, a new pack size or prices that changed since their last shipment. Show which quantities can be accepted and which lines need a substitute or quote. Give buyers a choice to keep working on the order while sales reviews an exception.

For buyers who send a spreadsheet, agree on the required columns and a way to confirm how items were matched before submission. Include purchase order references that the buyer’s own accounting team can search. Test a large basket on a slow phone network, so staff can recover if they leave before submitting. Compare the time required to complete these tasks with your current email or spreadsheet process. The difference can help you decide whether a dedicated bulk-order interface is worth building at launch.

Ask the sales team to log cases where a dealer abandons an order and calls for help. If the same price or pack question keeps coming up, improve the order summary before adding another approval screen.

[B2B commerce solutions](/solutions/b2b-commerce) · [API integration planning](/blog/ecommerce-inventory-crm-integration-plan) · [Web portal development](/services/web-portal-development)

## Frequently asked questions

### How is a B2B portal different from a retail ecommerce store?
A B2B portal typically supports approved company accounts, contract pricing, pack sizes, quotes and order approvals. Retail stores typically show public pricing and accept orders directly from individual shoppers.

### Can dealers get their own prices for the same SKU?
Yes, when the pricing model supports account-specific terms. Test precedence between contract prices, quantity tiers and temporary offers with real examples before launch.

### Does every wholesale customer need an account to request a quote?
That depends on your lead qualification process. A portal can accept initial public enquiries and reserve account-specific pricing or order actions for approved businesses.

### Can the portal support multiple warehouses?
Yes, subject to your stock source and fulfilment rules. Decide which locations can fulfil orders, whether stock is reserved and how often availability is updated.
