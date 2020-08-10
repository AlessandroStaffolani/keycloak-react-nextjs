const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    actions: [
      {
        title: "Primary admin action",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia pharetra tincidunt. Mauris euismod et neque sed ornare. Duis auctor, diam a laoreet facilisis, eros mi tincidunt leo, quis lobortis nulla magna id sapien. Cras eu hendrerit turpis, sed molestie lacus. Nunc accumsan nunc sit amet efficitur auctor.",
        resource: "admin",
        action: "primary",
      },
      {
        title: "Secondary admin action",
        content:
          "Sed id tortor massa. Nunc sodales faucibus elit, et eleifend libero vehicula vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam tellus erat, vehicula in nisi ac, pharetra facilisis purus. Vestibulum ac nisi eu mi scelerisque consequat id vitae arcu. Quisque varius ut purus nec blandit. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sapien elit, sagittis vel dapibus quis, rutrum eu nulla. Maecenas porta dui in venenatis luctus. Etiam tempor euismod viverra.",
        resource: "admin",
        action: "secondary",
      },
    ],
  });
});

router.get("/primary", (req, res, next) => {
  res.json({
    title: "Primary action",
    message: "This is the primary action of the admin section",
    visibility: "ADMIN",
  });
});

router.get("/secondary", (req, res, next) => {
  res.json({
    title: "Secondary action",
    message: "This is the secondary action of the admin section",
    visibility: "ADMIN",
  });
});

module.exports = router;
