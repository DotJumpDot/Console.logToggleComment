function calculateTotal(items: any[]): number {
  console.log("Calculating total for items:", items);
  const total = items.reduce((sum, item) => sum + item.price, 0);
  console.log("Calculated total:", total);
  return total;
}

function processUserData(user: { name: string; age: number; email: string }): void {
  console.log("Processing user data...");
  console.log("User:", user);

  if (!user.email.includes("@")) {
    console.error("Invalid email address:", user.email);
    return;
  }

  console.warn("User age is below 18:", user.age < 18);
  console.info("User validation completed");
}

function fetchData(url: string): Promise<any> {
  console.log("Fetching data from:", url);
  console.debug("Request headers:", { "Content-Type": "application/json" });

  return fetch(url)
    .then((response) => {
      console.log("Response status:", response.status);
      return response.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
}

class ShoppingCart {
  private items: any[] = [];

  addItem(item: any): void {
    console.log("Adding item to cart:", item);
    this.items.push(item);
    console.info("Cart size:", this.items.length);
  }

  removeItem(itemId: string): void {
    const index = this.items.findIndex((item) => item.id === itemId);
    console.log("Removing item at index:", index);

    if (index !== -1) {
      this.items.splice(index, 1);
      console.warn("Item removed, cart size:", this.items.length);
    } else {
      console.error("Item not found:", itemId);
    }
  }

  checkout(): void {
    console.log("Starting checkout process...");
    console.info("Items in cart:", this.items.length);

    if (this.items.length === 0) {
      console.error("Cannot checkout: Cart is empty");
      return;
    }

    console.log("Checkout completed successfully!");
  }
}

async function main(): Promise<void> {
  console.log("=== Application Started ===");

  const items = [
    { id: 1, name: "Product A", price: 29.99 },
    { id: 2, name: "Product B", price: 49.99 },
    { id: 3, name: "Product C", price: 19.99 },
  ];

  console.log("Items to process:", items);
  const total = calculateTotal(items);
  console.log("Final total:", total);

  processUserData({
    name: "John Doe",
    age: 25,
    email: "john@example.com",
  });

  const cart = new ShoppingCart();
  cart.addItem(items[0]);
  cart.addItem(items[1]);
  cart.checkout();

  try {
    await fetchData("https://api.example.com/data");
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

  console.debug("Debug: main function completed");
  console.log("=== Application Ended ===");
}

main();
