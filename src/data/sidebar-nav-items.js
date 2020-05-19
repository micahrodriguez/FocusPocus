export default function() {
  return [
    {
      title: "Overview",
      to: "/overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Analyze",
      htmlBefore: '<i class="material-icons">compare</i>',
      to: "/compare",
    },
    {
      title: "Record",
      htmlBefore: '<i class="material-icons">headset</i>',
      to: "/all-sessions",
    },
    {
      title: "Sessions",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-session",
    },
    {
      title: "Supplements",
      htmlBefore: '<i class="material-icons">local_drink</i>',
      to: "/supplements",
    },
    {
      title: "Account",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile",
    },
    {
      title: "Settings",
      htmlBefore: '<i class="material-icons">settings</i>',
      to: "/settings",
    }
  ];
}
