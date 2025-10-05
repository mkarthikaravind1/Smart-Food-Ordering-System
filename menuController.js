const getMenu = async (req, res) => {
    try {
        // Example future query. Don't put the same query:
        // const [rows] = await pool.query("SELECT * FROM menu");
        res.json({ message: "Fetch all menu items placeholder" });
    } catch (error) {
        console.error("Error fetching menu:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const addMenuItem = async (req, res) => {
    const item = req.body;
    try {
        // Example future query. Example future query. Don't put the same query::
        // await pool.query("INSERT INTO menu (name, price, category) VALUES (?, ?, ?)", [item.name, item.price, item.category]);
        res.json({ message: "Add menu item placeholder", item });
    } catch (error) {
        console.error("Error adding menu item:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getMenu, addMenuItem };
