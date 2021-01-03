export default {
  items: [
    {
      id: "navigation",
      title: "Navigation",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/dashboard/default",
          icon: "feather icon-home",
        },
      ],
    },

    {
      id: "pages",
      title: "Pages",
      type: "group",
      icon: "icon-pages",
      children: [
        // {
        // 	id: "auth",
        // 	title: "Authentication",
        // 	type: "collapse",
        // 	icon: "feather icon-lock",
        // 	badge: {
        // 		title: "New",
        // 		type: "label-danger",
        // 	},
        // 	children: [
        // 		{
        // 			id: "signup-1",
        // 			title: "Sign up",
        // 			type: "item",
        // 			url: "/auth/signup",
        // 			target: true,
        // 			breadcrumbs: false,
        // 		},
        // 		{
        // 			id: "signin-1",
        // 			title: "Sign in",
        // 			type: "item",
        // 			url: "/auth/signin",
        // 			target: true,
        // 			breadcrumbs: false,
        // 		},
        // 	],
        // },
        {
          id: "Blog",
          title: "Blog",
          type: "item",
          url: "/Blog",
          classes: "nav-item",
          icon: "feather icon-sidebar",
        },
        {
          id: "Product Category",
          title: "Category",
          type: "item",
          url: "/ProductCategory",
          classes: "nav-item",
          icon: "feather icon-sidebar",
        },
        {
          id: "Site-content",
          title: "Site Content",
          type: "collapse",
          icon: "feather icon-menu",
          // badge: {
          // 	title: "New",
          // 	type: "label-danger",
          // },
          children: [
            {
              id: "Home",
              title: "Home",
              type: "item",
              url: "/Home",
              classes: "nav-item",
              icon: "feather icon-sidebar",
            },
            {
              id: "Shop",
              title: "Shop",
              type: "item",
              url: "/Shop",
              classes: "nav-item",
              icon: "feather icon-sidebar",
            },
            {
              id: "Category",
              title: "Category",
              type: "item",
              url: "/Category",
              classes: "nav-item",
              icon: "feather icon-sidebar",
            },
            {
              id: "Banner",
              title: "Banner",
              type: "item",
              url: "/Banner",
              classes: "nav-item",
              icon: "feather icon-sidebar",
            },
            {
              id: "Learn",
              title: "Learn",
              type: "item",
              url: "/Learn",
              classes: "nav-item",
              icon: "feather icon-sidebar",
            },
          ],
        },

        // {
        // 	id: "menu-level",
        // 	title: "Menu Levels",
        // 	type: "collapse",
        // 	icon: "feather icon-menu",
        // 	children: [
        // 		{
        // 			id: "menu-level-1.1",
        // 			title: "Menu Level 1.1",
        // 			type: "item",
        // 			url: "#!",
        // 		},
        // 		{
        // 			id: "menu-level-1.2",
        // 			title: "Menu Level 2.2",
        // 			type: "collapse",
        // 			children: [
        // 				{
        // 					id: "menu-level-2.1",
        // 					title: "Menu Level 2.1",
        // 					type: "item",
        // 					url: "#",
        // 				},
        // 				{
        // 					id: "menu-level-2.2",
        // 					title: "Menu Level 2.2",
        // 					type: "collapse",
        // 					children: [
        // 						{
        // 							id: "menu-level-3.1",
        // 							title: "Menu Level 3.1",
        // 							type: "item",
        // 							url: "#",
        // 						},
        // 						{
        // 							id: "menu-level-3.2",
        // 							title: "Menu Level 3.2",
        // 							type: "item",
        // 							url: "#",
        // 						},
        // 					],
        // 				},
        // 			],
        // 		},
        // 	],
        // },
        // {
        // 	id: "disabled-menu",
        // 	title: "Disabled Menu",
        // 	type: "item",
        // 	url: "#",
        // 	classes: "nav-item disabled",
        // 	icon: "feather icon-power",
        // },
        /*{
                    id: 'buy-now',
                    title: 'Buy Now',
                    type: 'item',
                    icon: 'feather icon-user',
                    classes: 'nav-item',
                    url: 'https://codedthemes.com',
                    target: true,
                    external: true,
                    badge: {
                        title: 'v1.0',
                        type: 'label-primary'
                    }
                }*/
      ],
    },
  ],
};
