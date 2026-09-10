import ClientOrderPage from "@/components/OrderClient";
import { getOrders } from "@/data/Orders";
import { getUsers } from "@/data/Users";

export default async function OrderPage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params
    const order = await getOrders().then(orders => orders.find(order => order.id === id));
    const user = await getUsers().then(users => users.find(user => user.id === order?.userId));

    if (order === undefined) {
        return <div>Order not found</div>;
    }
    if (user === undefined) {
        return <div>User not found</div>;
    }

    return (
        <ClientOrderPage order={order} user={user}  />
    )
}