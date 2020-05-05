export default function() {
  return [
    {
      title: "Overview",
      to: "/overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Add New Session",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-session",
    },
    {
      title: "All Sessions",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/all-sessions",
    },
    {
      title: "Compare",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/compare",
    },
    {
      title: "Supplements",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/supplements",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }
  ];
}
