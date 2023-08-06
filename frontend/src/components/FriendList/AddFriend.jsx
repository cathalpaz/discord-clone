export default function AddFriend({ selectedTab, setSelectedTab }) {
  useEffect(() => {
    setSelectedTab("Add");
  }, [setSelectedTab]);

  return (
    <div className="content-add">
      <div>Add Friend</div>
      <div>You can add friends with their Discord username</div>
    </div>
  );
}
