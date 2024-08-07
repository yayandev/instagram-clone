import HighlightSection from "./HighlightSection";
import TabsSection from "./TabsSection";
import UserProfileSection from "./UserProfileSection";

const UserProfileView = () => {
  return (
    <div className="w-full space-y-3 md:space-y-5">
      <UserProfileSection />
      <HighlightSection />
      <TabsSection />
    </div>
  );
};

export default UserProfileView;
