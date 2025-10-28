import { db } from "../config/createProductTable.js";

// Returns top 5 products by price
export const getTopProducts = async(req, res) => {
    try {
        const products = await db.all(
            "SELECT * FROM products ORDER BY price DESC LIMIT 5"
        );
        //
        res
            .status(200)
            .json({ success: true, data: Array.isArray(products) ? products : [] });
    } catch (error) {
        console.error("getTopProducts error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Returns products with their suppliers grouped
export const getProductsWithSuppliers = async(req, res) => {
    try {
        const rows = await db.all(
            `SELECT 
         p.id AS product_id, p.name AS product_name, p.price, p.image,
         s.id AS supplier_id, s.name AS supplier_name, s.contact, s.address
       FROM products p
       LEFT JOIN suppliers s ON s.product_id = p.id
       ORDER BY p.id`
        );
        //LEFT JOIN: This is important. It means "Get all products, even if they have no matching supplier." If we used INNER JOIN, products without a supplier would be missing from our list.
        // group suppliers under each product
        const productsMap = new Map();
        for (const r of rows) {
            const pid = r.product_id;
            if (!productsMap.has(pid)) {
                productsMap.set(pid, {
                    id: pid,
                    name: r.product_name,
                    price: r.price,
                    image: r.image,
                    suppliers: [],
                });
            }
            if (r.supplier_id) {
                productsMap.get(pid).suppliers.push({
                    id: r.supplier_id,
                    name: r.supplier_name,
                    contact: r.contact,
                    address: r.address,
                });
            }
        }

        const products = Array.from(productsMap.values());
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("getProductsWithSuppliers error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
/*Conclusion (Key Takeaways)

We use CRUD operations (INSERT, SELECT, UPDATE, DELETE) for basic data handling.

We use Parameterized Queries (?) to prevent SQL Injection and ensure data security.

We use advanced SQL like JOIN, ORDER BY, and LIMIT to build complex reports and manage data relationships.

Finally, we often use our application code (JavaScript) to transform the raw data from SQL into the perfect format for our users. */