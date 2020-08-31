//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.01] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for singul column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  visible = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optomized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.01:
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
 *
 * Version 1.00:
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"true","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will automatically enable the Status Window.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @textm Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optomized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x564d=['Window_ItemCategory_setItemWindow','isRepeated','buyWindowRect','initNewItemsList','AGI','yTFMo','processCursorHomeEndTrigger','fillRect','wIwqP','?????','HBPjI','StatusWindow','commandSellItemsEquipsCore','VBRrX','UVRdb','Settings','itemLineRect','getItemEffectsHpDamageLabel','CmdIconEquip','smoothSelect','MaxHP','LabelSuccessRate','tOJok','isOpen','wLIjj','playBuzzerSound','canEquip','isKeyItem','onTouchOk','equips','fsinA','adjustHiddenShownGoods','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','categoryNameWindowDrawBackground','Style','parameters','jWmUE','Nonconsumable','_commandNameWindow','onMenuImageLoad','drawItemEffectsTpDamage','hideDisabledCommands','Step3Start','mainCommandWidth','cancel','hNANR','PriVQ','OCCASION','elements','refreshCursor','WMJlF','getItemEffectsAddedStatesBuffsLabel','getInputButtonString','paintOpacity','_slotId','length','Game_Actor_discardEquip','gainTP','NZpjG','AllArmors','getItemEffectsAddedStatesBuffsText','RemoveEquipIcon','HiddenItemA','rilkZ','RegExp','+%1%','ZGSEk','textSizeEx','onCategoryCancel','isClearCommandEnabled','meetsItemConditionsNotetags','translucentOpacity','Scene_Item_create','Window_Selectable_setHelpWindowItem','equipSlots','process_VisuMZ_ItemsEquipsCore_Prices','dXCDm','(%1)','setNewItem','createBitmap','updateNewLabelOpacity','statusWidth','initNewLabelSprites','MANUAL','format','Window_Selectable_initialize','setCategory','setItem','geUpdatedLayoutStatusWidth','OZxyl','ConvertNumberToString','Scene_Equip_commandEquip','isUseModernControls','getItemEffectsTpRecoveryLabel','gcscS','ParamValueFontSize','XHUpg','Scene_Shop_createSellWindow','CoreEngine','IERhv','onActorChange','drawItemKeyData','getTextColor','update','mWSDm','drawItemQuantity','process_VisuMZ_ItemsEquipsCore_Category','sOceg','HJogs','fVJMz','down','makeItemData','refreshItemsEquipsCoreNoMenuImage','Game_Actor_tradeItemWithParty','hwPrk','yoMyf','eDVkB','deactivate','ctImL','getItemConsumableText','CannotEquipMarker','buttonAssistRemove','mmp','OHhtI','DrawEquipData','setHp','YFBkz','Type','EVAL','slotWindowRectItemsEquipsCore','Scene_Equip_slotWindowRect','Fmtgb','setupItemDamageTempActors','meetsItemConditionsJS','QBEei','drawItemDamageAmount','createStatusWindow','AllWeapons','revertGlobalNamespaceVariables','CmdCancelRename','MRplY','qPJuS','EpHFf','_tempActor','weapon-%1','commandBuyItemsEquipsCore','isUseParamNamesWithIcons','sellPriceRate','fPPEB','currentClass','hitType','pageup','repeats','SCOPE','QoL','LabelDamageHP','uiMenuStyle','getItemEffectsSelfTpGainText','statusWindowRectItemsEquipsCore','fcIXL','createCategoryNameWindow','move','_customItemInfo','LabelRemove','SPEED','blt','EquipScene','contentsBack','postCreateItemWindowModernControls','onSellCancel','SyPql','TP\x20RECOVERY','playOkSound','jdNfZ','getItemDamageAmountLabel','armor','FUNC','drawItemNumber','New','tradeItemWithParty','AxoWS','_newItemsList','jTiPG','callUpdateHelp','dtVzV','getItemConsumableLabel','MPHzv','SemlG','jsfFj','isCommandEnabled','buttonAssistOffset3','TChVC','_newLabelOpacityUpperLimit','cdbAY','members','isBuyCommandEnabled','uiHelpPosition','shift','Step2Start','Scene_Shop_sellingPrice','IwHWQ','wXTCZ','prepareNextScene','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','drawItemStyleIconText','Scene_Shop_onSellOk','possession','vvnsC','isNewItem','CmdStyle','AlwaysUsable','OffsetX','EFFECT_REMOVE_STATE','PwAjc','Window_Selectable_update','xmELA','LabelHitType','updateMoneyAmount','+%1','fACrF','drawItemEffectsHpDamage','_dummyWindow','isEnabled','dCfTR','getItemEffectsTpRecoveryText','CmdIconClear','onTouchSelectModernControls','calcWindowHeight','_categoryNameWindow','buffIconIndex','numberWindowRectItemsEquipsCore','ItemScene','vDuce','ARRAYFUNC','ARRAYSTR','onSlotOk','WTkKL','gfUUI','GigDs','\x5cb%1\x5cb','IBxAl','categoryStyle','ooDbt','TYxgv','forceChangeEquip','xfxru','kpUdT','priceWidth','fill','helpAreaHeight','isDrawItemNumber','wtypeId','DamageType%1','isArmor','onTouchCancel','fMoBP','BattleUsable','Window_ShopCommand_initialize','Consumable','NonRemoveETypes','ElementNone','slotWindowRect','IVdcE','releaseUnequippableItems','rdRRS','zmHWN','kbpBX','SpeedNeg1999','yfgEC','refreshActorEquipSlotsIfUpdated','EFFECT_REMOVE_DEBUFF','aTYaP','sOJpc','actor','cvPCo','WflRK','removeDebuff','%1%','rateHP','Scene_Load_reloadMapIfUpdated','weapon','sARkS','getMatchingInitEquip','addChild','PLDTe','_equips','isShiftRemoveShortcutEnabled','gNQJK','commandName','onCategoryCancelItemsEquipsCore','ZgYzu','contents','lineHeight','Scene_Shop_onCategoryCancel','item','Akmvu','ParamChangeFontSize','equipTypes','Categories','addBuyCommand','buttonAssistCategory','ConvertParams','setTempActor','WNQuy','setMp','Icon','_resetFontColor','LabelRepeats','Window_EquipItem_isEnabled','drawItem','setShopStatusWindowMode','TP\x20DAMAGE','getItemSpeedLabel','isClearCommandAdded','category','PzPOr','getItemEffectsMpDamageText','addItemCategory','categoryNameWindowDrawText','FadeLimit','drawIcon','flatHP','NaDvV','SrbjN','XqDRB','QUANTITY','ShopScene','buyWindowRectItemsEquipsCore','fontSizeRatio','drawUpdatedAfterParamValue','FadeSpeed','Step3End','Dccay','_sellWindow','KeyItemProtect','Scene_Equip_commandWindowRect','commandWindowRectItemsEquipsCore','itemWindowRectItemsEquipsCore','jcMlF','drawItemEffectsHpRecovery','currentSymbol','reloadMapIfUpdated','getItemDamageAmountTextBattleCore','mainAreaHeight','pOWZn','rateMP','itemPadding','_doubleTouch','defaultItemMax','drawItemEquipType','LabelElement','SellPriceRate','Game_BattlerBase_param','NUInA','OFhgf','actorParams','thGRV','_categoryWindow','_resetFontSize','bitmap','mKaSf','parse','ciBiq','lmllg','isEquipCommandEnabled','numberWindowRect','makeDeepCopy','isItem','EhTtR','aVSyF','NeverUsable','DnYUC','includes','DrawItemData','KtZbX','GzaLu','EeEjL','commandNameWindowCenter','MZGYc','isUseItemsEquipsCoreUpdatedLayout','cursorPageup','changeTextColor','PdiYG','Blacklist','List','commandWindowRect','drawItemData','equipAdjustHpMp','lEupk','drawItemDarkRect','iconWidth','isWeapon','EWhZi','process_VisuMZ_ItemsEquipsCore_RegExp','updateHelp','gymWv','DydUB','loadCharacter','paramPlus','TPTLk','getItemDamageElementText','DrawIcons','characterName','iconText','onCategoryOk','_numberWindow','MP\x20DAMAGE','clRtW','dataId','loadPicture','drawItemEffectsMpDamage','cursorRight','addStateBuffChanges','mpRate','mainAreaTop','playCursorSound','process_VisuMZ_ItemsEquipsCore_EquipSlots','AhHKc','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','Game_BattlerBase_meetsItemConditions','KKJkb','paramValueFontSize','OcMXQ','getItemHitTypeLabel','_newLabelOpacity','updatedLayoutStyle','categoryItemTypes','QMYFG','Window_EquipItem_includes','drawParamsItemsEquipsCore','getInputMultiButtonStrings','numItems','QbkNJ','discardEquip','Scene_Equip_itemWindowRect','Scene_Item_createCategoryWindow','drawParamText','asxHR','changePaintOpacity','SpeedNeg999','zRaRd','flatMP','Scene_Equip_createSlotWindow','Damage\x20Formula\x20Error\x20for\x20%1','paramValueByName','sellingPrice','MaxMP','HSUnl','allowCreateStatusWindow','FtdXH','Scene_Shop_sellWindowRect','windowPadding','AhsCs','_tempActorA','fontSize','LabelSpeed','Speed1000','ElementWeapon','DZEiA','ItemMenuStatusRect','KjfKy','replace','consumable','HP\x20RECOVERY','kLBtN','Scene_Shop_create','_money','AFeKY','NaMSO','buttonAssistText1','Scene_Shop_buyWindowRect','_item','BgCrp','isPressed','prepareItemCustomData','damage','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','iconHeight','Scene_Equip_onSlotCancel','drawItemCustomEntries','categories','ShopMenuStatusStandard','refresh','sellWindowRect','TZvLd','Whitelist','EFFECT_ADD_BUFF','nbbjd','_tempActorB','tpGain','weaponTypes','itypeId','onSellOkItemsEquipsCore','qUwfN','checkShiftRemoveShortcut','×%1','Scene_Shop_prepare','cUOig','colaC','jUKDq','FieldUsable','hideNewLabelSprites','CmdIconOptimize','call','vZxyb','YfuuX','Translucent','gainItem','RKXwk','DAMAGE\x20MULTIPLIER','floor','isGoodShown','OVvWB','ykgdG','drawActorParamDifference','A%1','Window_ItemList_drawItem','isEquipItem','kTfEO','_calculatingJSParameters','addInnerChild','commandNameWindowDrawText','isCancelled','ldQvU','qfaUF','create','changeEquipById','buttonAssistSlotWindowShift','rRHLa','isEquipCommandAdded','CommandAddClear','right','drawItemEffectsSelfTpGain','value1','map','drawTextEx','FontSize','price','Window_ItemList_maxCols','currencyUnit','QpyVo','limitedPageUpDownSceneCheck','resetTextColor','Window_EquipStatus_refresh','icon','UMimb','ADDED\x20EFFECTS','getItemQuantityText','isSellCommandEnabled','isClearEquipOk','atk','hide','VisuMZ_0_CoreEngine','registerCommand','normalColor','FYKLm','processCursorSpecialCheckModernControls','Window_ShopBuy_refresh','REPEAT','loadSystem','JvOlh','cursorLeft','lFaDO','buttonAssistText2','drawItemEffectsAddedStatesBuffs','xHmCQ','MaxArmors','activate','getItemSuccessRateLabel','categoryList','round','kcAeH','JSON','iconIndex','postCreateItemsEquipsCore','checkItemConditionsSwitchNotetags','isHovered','%1-%2','isMainMenuCoreMenuImageOptionAvailable','meetsItemConditions','LabelSelfGainTP','equip','lNZaL','commandNameWindowDrawBackground','isDualWield','status','getItemOccasionText','newLabelEnabled','ItemQuantityFmt','sell','Window_EquipCommand_initialize','QxsEW','Scene_Equip_statusWindowRect','Scene_Item_itemWindowRect','equip2','getItemEffectsTpDamageText','isEquipped','left','ewHDA','pppEA','RTTgy','CmdTextAlign','wHKel','armor-%1','Scene_Shop_activateSellWindow','_actor','CzwJE','process_VisuMZ_ItemsEquipsCore_ParamJS','_slotWindow','effects','textColor','DtJmW','HIT\x20TYPE','zZqlm','WLvzz','itemDataFontSize','STR','createCategoryWindow','_bypassNewLabel','buttonAssistKey3','NUM','zYMFT','previousActor','getItemDamageElementLabel','hizRM','values','isHandled','visible','xzbUT','paramPlusItemsEquipsCoreCustomJS','CmdIconCancel','buttonAssistSmallIncrement','0000','drawItemScope','log','_buttonAssistWindow','XCAtQ','yilXQ','uoFyo','occasion','process_VisuMZ_ItemsEquipsCore_EnableJS','ListWindowCols','loadFaceImages','paramchangeTextColor','pmkEk','RegularItems','drawItemActorMenuImage','xyelk','getItemDamageAmountText','item-%1','_itemData','rWJEx','_itemWindow','VisuMZ_1_BattleCore','push','drawItemEffectsRemovedStatesBuffs','buttonAssistKey1','ItemsEquipsCore','onBuyCancelItemsEquipsCore','AllItems','W%1','processCursorMove','EnableLayout','scope','maxItems','Param','description','HkwiT','removeState','addClearCommand','Scene_Shop_onBuyCancel','itemEnableJS','PurchaseOnly','Scene_Shop_commandBuy','onaZP','dQBpR','VTRwT','IncludeShopItem','LabelRecoverMP','isShowNew','buttonAssistLargeIncrement','100%','LdQGl','currentExt','helpWindowRectItemsEquipsCore','constructor','HitType%1','money','MenuPortraits','getItemDamageAmountLabelOriginal','clearNewItem','QwpXL','dAaFc','onTouchSelect','LabelDamageMP','goldWindowRect','goldWindowRectItemsEquipsCore','Speed0','iOyHb','drawText','modifiedBuyPriceItemsEquipsCore','_purchaseOnly','ceil','qNqfM','CommandAddOptimize','removeStateBuffChanges','onSlotCancel','Window_ItemCategory_initialize','popScene','index','commandEquip','activateSellWindow','RemoveEquipText','categoryWindowRectItemsEquipsCore','sdelk','CmdHideDisabled','fExdT','postCreateSellWindowItemsEquipsCore','getItemHitTypeText','max','createCommandNameWindow','processDrawIcon','drawItemSuccessRate','WFKfP','process_VisuMZ_ItemsEquipsCore_ParamValues','Scene_Equip_onActorChange','EqFwB','textWidth','Game_Party_initialize','Step1Start','oFEuj','updateCommandNameWindow','getItemColor','boxWidth','SellPriceJS','createSlotWindow','systemColor','select','TBgxf','opacity','_category','buttonAssistText3','Ukxzf','makeCommandList','AqaDE','MaxWeapons','innerWidth','VMpGz','EquipParams','determineBaseSellingPrice','isHoverEnabled','LabelApply','getItemDamageAmountTextOriginal','DEF','lElqP','drawParamName','getDamageStyle','getItemEffectsMpRecoveryLabel','uFxqO','drawNewLabelText','agkBt','jGsxi','AYMkT','zxCZi','getNextAvailableEtypeId','addCommand','LabelRecoverHP','note','KaUdH','DQaZZ','drawEquipData','Scene_Shop_createCategoryWindow','bind','LabelDamageTP','trim','OffsetY','getItemRepeatsText','ShiftShortcutKey','cbcNE','getItemEffectsTpDamageLabel','EquipAdjustHpMp','itemWindowRect','BorderRegExp','versionId','isTriggered','name','(+%1)','ARRAYJSON','categoryWindowRect','Speed2000','clamp','Window_ItemList_colSpacing','XBMez','ePJNB','isOptimizeCommandEnabled','Scene_Shop_commandSell','value2','getItemEffectsHpRecoveryText','speed','getItemEffectsHpRecoveryLabel','initEquips','prepareRefreshItemsEquipsCoreLayout','_data','StatusWindowWidth','uiInputPosition','SGyLQ','cursorPagedown','postCreateCategoryWindowItemsEquipsCore','createNewLabelSprite','type','ExtDisplayedParams','AxiVF','indexOf','center','drawUpdatedBeforeParamValue','isOptimizeCommandAdded','SKyGy','changeBuff','Scene_Shop_categoryWindowRect','armorTypes','_handlers','dWFQA','drawNewLabelIcon','_newLabelSprites','SmEoY','optKeyItemsNumber','wVSGf','ScopeAlliesButUser','changeEquip','AlreadyEquipMarker','Speed1','drawItemDamageElement','resetFontSettings','ewHnW','toUpperCase','placeItemNewLabel','splice','Scene_Equip_onSlotOk','WKyiq','damageColor','_shopStatusMenuAlly','DrawPortraitJS','drawItemEffectsMpRecovery','isOptimizeEquipOk','_scene','xjIoT','Enable','MultiplierStandard','processShiftRemoveShortcut','maxCols','paramJS','cursorDown','ItemQuantityFontSize','LabelConsume','getItemRepeatsLabel','LJCvs','nextActor','EFFECT_GAIN_TP','XTEcr','pjIWz','isRightInputMode','selfTP','nonRemovableEtypes','KeyItems','CPkgv','adjustItemWidthByStatus','Width','powerDownColor','drawUpdatedParamValueDiff','isClicked','prototype','helpAreaTop','show','getItemDamageAmountLabelBattleCore','isEquipChangeOk','kYzhT','Game_Actor_paramPlus','getMenuImage','CmdIconBuy','buttonAssistItemListRequirement','setTopRow','text','buy','active','Scene_Boot_onDatabaseLoaded','commandStyleCheck','hitIndex','hHszl','pagedown','Game_Actor_changeEquip','addState','_list','clearNewLabelFromItem','mhp','RrwqU','TextAlign','iVvTV','SpeedNeg2000','HwdiS','NotConsumable','VisuMZ_1_MainMenuCore','onBuyCancel','cYNjG','IyrFq','MHuYy','Scene_Shop_numberWindowRect','XvhQt','UiUrl','GeqrU','filter','getItemEffectsRemovedStatesBuffsLabel','\x5cI[%1]%2','onSlotOkAutoSelect','width','smallParamFontSize','LayoutStyle','yBoGy','CRpYJ','BKcOC','getItemSpeedText','hpRate','gaugeBackColor','drawItemCustomEntryLine','commandBuy','maxItemAmount','RLxIM','MaxItems','vjBco','hqKag','BuyPriceJS','ItRCu','_newLabelOpacityChange','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','NsyWo','_statusWindow','dxKEt','Scene_Item_categoryWindowRect','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','EFFECT_ADD_DEBUFF','Game_Party_gainItem','RUgFC','_goods','setObject','setStatusWindow','drawItemEffects','Rgvuw','Yseod','clearEquipments','drawItemStyleIcon','PHPSt','Window_Selectable_refresh','createSellWindow','XHMgG','Scene_Shop_goldWindowRect','nonOptimizeEtypes','tAuwj','WzCoG','prepareNewEquipSlotsOnLoad','qDUZD','setItemWindow','addEquipCommand','hoHOR','IconSet','itemAt','addCancelCommand','commandSell','setHandler','keyItem','activateItemWindow','initialize','split','Window_ShopSell_isEnabled','drawRemoveItem','HiddenItemB','_buyWindowLastIndex','drawUpdatedParamName','Text','WfJsg','exit','statusWindowRect','EFFECT_ADD_STATE','GdumQ','deselect','code','addSellCommand','gGNFB','eSYVU','optimize','OGYHy','uoUMm','buttonAssistKey2','ELEMENT','auto','playEquip','powerUpColor','ejfWg','processCursorMoveModernControls','sellWindowRectItemsEquipsCore','isBottomHelpMode','helpWindowRect','scrollTo','itemTextAlign','prepare','ZmTZr','HIxHD','_goodsCount','Scene_Equip_create','PNWXS','param','vTYyk','Scene_Shop_commandWindowRect','Scene_Shop_onSellCancel','getItemEffectsRemovedStatesBuffsText','lMaRQ','CONSUMABLE','getItemEffectsHpDamageText','categoryStyleCheck','match','etypeId','categoryNameWindowCenter','DrawParamJS','onTouchSelectModern','dSLmd','mainFontSize','_commandWindow','setHelpWindowItem','formula','clear','removeBuff','bestEquipItem','MaxIcons','HcQaE','LGFPF','MP\x20RECOVERY','paramId','Kyuia','elementId','ItemSceneAdjustItemList','getItemEffectsMpDamageLabel','LYeDe','colSpacing','process_VisuMZ_ItemsEquipsCore_Notetags','nDZYW','USER\x20TP\x20GAIN','isCursorMovable','OdbxJ','\x5cI[%1]','drawItemEffectsTpRecovery','vRemx','NoChangeMarker','value','cursorUp','HP\x20DAMAGE','Step1End','Scene_Shop_statusWindowRect','convertInitEquipsToItems','drawItemName','uKJot','Scene_ItemBase_activateItemWindow','vdGVh','Game_Actor_forceChangeEquip','height','pLJDF','ScopeRandomAllies','DrawFaceJS','onDatabaseLoaded','getItemSuccessRateText','updateCategoryNameWindow','CmdIconSell','processTouchModernControls','Step2End','postCreateSlotWindowItemsEquipsCore','addOptimizeCommand','canConsumeItem','commandStyle','processHandling','Scene_Item_createItemWindow','CisnT','REMOVED\x20EFFECTS','getItemEffectsSelfTpGainLabel','_buyWindow','MAkaG','getItemScopeText','Window_ItemList_updateHelp'];(function(_0x55a86d,_0x564dfd){const _0x258ad4=function(_0x54eea9){while(--_0x54eea9){_0x55a86d['push'](_0x55a86d['shift']());}};_0x258ad4(++_0x564dfd);}(_0x564d,0x1cc));const _0x258a=function(_0x55a86d,_0x564dfd){_0x55a86d=_0x55a86d-0x0;let _0x258ad4=_0x564d[_0x55a86d];return _0x258ad4;};var label=_0x258a('0xc5'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x258a('0x1c1')](function(_0xb480c2){return _0xb480c2[_0x258a('0x7d')]&&_0xb480c2[_0x258a('0xce')][_0x258a('0x3e4')]('['+label+']');})[0x0];VisuMZ[label][_0x258a('0x27f')]=VisuMZ[label][_0x258a('0x27f')]||{},VisuMZ[_0x258a('0x39d')]=function(_0x2bd8fc,_0x356d43){for(const _0x22a6e7 in _0x356d43){if(_0x22a6e7[_0x258a('0x22d')](/(.*):(.*)/i)){if(_0x258a('0x3bc')!==_0x258a('0x41b')){const _0x264730=String(RegExp['$1']),_0x47ae18=String(RegExp['$2'])[_0x258a('0x176')]()[_0x258a('0x13a')]();let _0x1ba824,_0x35c23c,_0x424af6;switch(_0x47ae18){case _0x258a('0xa0'):_0x1ba824=_0x356d43[_0x22a6e7]!==''?Number(_0x356d43[_0x22a6e7]):0x0;break;case'ARRAYNUM':_0x35c23c=_0x356d43[_0x22a6e7]!==''?JSON[_0x258a('0x3d9')](_0x356d43[_0x22a6e7]):[],_0x1ba824=_0x35c23c[_0x258a('0x4a')](_0x1dc382=>Number(_0x1dc382));break;case _0x258a('0x2f0'):_0x1ba824=_0x356d43[_0x22a6e7]!==''?eval(_0x356d43[_0x22a6e7]):null;break;case'ARRAYEVAL':_0x35c23c=_0x356d43[_0x22a6e7]!==''?JSON[_0x258a('0x3d9')](_0x356d43[_0x22a6e7]):[],_0x1ba824=_0x35c23c[_0x258a('0x4a')](_0x591251=>eval(_0x591251));break;case _0x258a('0x70'):_0x1ba824=_0x356d43[_0x22a6e7]!==''?JSON['parse'](_0x356d43[_0x22a6e7]):'';break;case _0x258a('0x147'):_0x35c23c=_0x356d43[_0x22a6e7]!==''?JSON['parse'](_0x356d43[_0x22a6e7]):[],_0x1ba824=_0x35c23c[_0x258a('0x4a')](_0x2ccbb4=>JSON[_0x258a('0x3d9')](_0x2ccbb4));break;case _0x258a('0x320'):_0x1ba824=_0x356d43[_0x22a6e7]!==''?new Function(JSON[_0x258a('0x3d9')](_0x356d43[_0x22a6e7])):new Function('return\x200');break;case _0x258a('0x359'):_0x35c23c=_0x356d43[_0x22a6e7]!==''?JSON['parse'](_0x356d43[_0x22a6e7]):[],_0x1ba824=_0x35c23c[_0x258a('0x4a')](_0x2e1167=>new Function(JSON[_0x258a('0x3d9')](_0x2e1167)));break;case _0x258a('0x9c'):_0x1ba824=_0x356d43[_0x22a6e7]!==''?String(_0x356d43[_0x22a6e7]):'';break;case _0x258a('0x35a'):_0x35c23c=_0x356d43[_0x22a6e7]!==''?JSON[_0x258a('0x3d9')](_0x356d43[_0x22a6e7]):[],_0x1ba824=_0x35c23c['map'](_0x33579e=>String(_0x33579e));break;case'STRUCT':_0x424af6=_0x356d43[_0x22a6e7]!==''?JSON[_0x258a('0x3d9')](_0x356d43[_0x22a6e7]):{},_0x2bd8fc[_0x264730]={},VisuMZ[_0x258a('0x39d')](_0x2bd8fc[_0x264730],_0x424af6);continue;case'ARRAYSTRUCT':_0x35c23c=_0x356d43[_0x22a6e7]!==''?JSON[_0x258a('0x3d9')](_0x356d43[_0x22a6e7]):[],_0x1ba824=_0x35c23c[_0x258a('0x4a')](_0x5460bc=>VisuMZ[_0x258a('0x39d')]({},JSON[_0x258a('0x3d9')](_0x5460bc)));break;default:continue;}_0x2bd8fc[_0x264730]=_0x1ba824;}else{function _0x15ace2(){return this[_0x258a('0x1af')]?this[_0x258a('0x1af')][_0x258a('0x2a7')]:0x3;}}}}return _0x2bd8fc;},(_0x1ecaaf=>{const _0x47f2b0=_0x1ecaaf[_0x258a('0x145')];for(const _0x5483f9 of dependencies){if(!Imported[_0x5483f9]){alert(_0x258a('0x33b')['format'](_0x47f2b0,_0x5483f9)),SceneManager['exit']();break;}}const _0x423a3d=_0x1ecaaf['description'];if(_0x423a3d[_0x258a('0x22d')](/\[Version[ ](.*?)\]/i)){if(_0x258a('0x3ea')==='hBJle'){function _0x112bfe(){this[_0x258a('0x2e5')](),this['deselect']();}}else{const _0x31b49f=Number(RegExp['$1']);if(_0x31b49f!==VisuMZ[label]['version']){if(_0x258a('0x31d')!==_0x258a('0x31d')){function _0x378a58(){_0x168818=_0x258a('0x8f')[_0x258a('0x2c4')](_0x3f7c7a['id']);}}else alert(_0x258a('0x290')[_0x258a('0x2c4')](_0x47f2b0,_0x31b49f)),SceneManager[_0x258a('0x206')]();}}}if(_0x423a3d[_0x258a('0x22d')](/\[Tier[ ](\d+)\]/i)){if('jfAvV'===_0x258a('0x339')){function _0x4b2539(){_0x5a0cf6[_0x258a('0x19a')]['updateHelp'][_0x258a('0x2b')](this);if(this[_0x258a('0x91')]&&this[_0x258a('0x1da')]&&this[_0x258a('0x2a6')]>=0x0){const _0x208210=_0x4dc36b[_0x258a('0x3de')](this[_0x258a('0x91')]);_0x208210['_tempActor']=!![],_0x208210[_0x258a('0x364')](this['_slotId'],this[_0x258a('0x396')]()),this[_0x258a('0x1da')]['setTempActor'](_0x208210);}}}else{const _0x11160a=Number(RegExp['$1']);_0x11160a<tier?(alert(_0x258a('0x1dd')['format'](_0x47f2b0,_0x11160a,tier)),SceneManager['exit']()):tier=Math[_0x258a('0x103')](_0x11160a,tier);}}VisuMZ[_0x258a('0x39d')](VisuMZ[label][_0x258a('0x27f')],_0x1ecaaf[_0x258a('0x293')]);})(pluginData),PluginManager[_0x258a('0x5d')](pluginData[_0x258a('0x145')],'BatchShop',_0x4ee5c5=>{VisuMZ[_0x258a('0x39d')](_0x4ee5c5,_0x4ee5c5);const _0x367e1a=[],_0x198f5d=_0x4ee5c5[_0x258a('0x3ef')][_0x258a('0x4a')](_0x41d270=>_0x41d270[_0x258a('0x176')]()[_0x258a('0x13a')]()),_0x8fa060=_0x4ee5c5[_0x258a('0x19')][_0x258a('0x4a')](_0x564251=>_0x564251['toUpperCase']()[_0x258a('0x13a')]()),_0xcc353b=_0x4ee5c5[_0x258a('0x251')]>=_0x4ee5c5[_0x258a('0x10d')]?_0x4ee5c5[_0x258a('0x10d')]:_0x4ee5c5[_0x258a('0x251')],_0x4a64b8=_0x4ee5c5['Step1End']>=_0x4ee5c5[_0x258a('0x10d')]?_0x4ee5c5[_0x258a('0x251')]:_0x4ee5c5[_0x258a('0x10d')],_0xc737bd=Array(_0x4a64b8-_0xcc353b+0x1)['fill']()[_0x258a('0x4a')]((_0x3ce94c,_0xd6cabb)=>_0xcc353b+_0xd6cabb);for(const _0x6a2a41 of _0xc737bd){const _0x18d528=$dataItems[_0x6a2a41];if(!_0x18d528)continue;if(!VisuMZ[_0x258a('0xc5')]['IncludeShopItem'](_0x18d528,_0x198f5d,_0x8fa060))continue;_0x367e1a[_0x258a('0xc2')]([0x0,_0x6a2a41,0x0,_0x18d528['price']]);}const _0x37aefa=_0x4ee5c5[_0x258a('0x262')]>=_0x4ee5c5[_0x258a('0x336')]?_0x4ee5c5[_0x258a('0x336')]:_0x4ee5c5['Step2End'],_0x3eb1c6=_0x4ee5c5['Step2End']>=_0x4ee5c5[_0x258a('0x336')]?_0x4ee5c5[_0x258a('0x262')]:_0x4ee5c5[_0x258a('0x336')],_0x442a54=Array(_0x3eb1c6-_0x37aefa+0x1)[_0x258a('0x368')]()[_0x258a('0x4a')]((_0x58e530,_0xaa2a18)=>_0x37aefa+_0xaa2a18);for(const _0xdc1de9 of _0x442a54){if(_0x258a('0x425')!==_0x258a('0x1be')){const _0x24a8e4=$dataWeapons[_0xdc1de9];if(!_0x24a8e4)continue;if(!VisuMZ[_0x258a('0xc5')][_0x258a('0xd9')](_0x24a8e4,_0x198f5d,_0x8fa060))continue;_0x367e1a[_0x258a('0xc2')]([0x1,_0xdc1de9,0x0,_0x24a8e4[_0x258a('0x4d')]]);}else{function _0x1b4cc0(){this['playBuzzerSound']();}}}const _0x1d4471=_0x4ee5c5[_0x258a('0x3bb')]>=_0x4ee5c5[_0x258a('0x29a')]?_0x4ee5c5[_0x258a('0x29a')]:_0x4ee5c5[_0x258a('0x3bb')],_0x1f625c=_0x4ee5c5['Step3End']>=_0x4ee5c5[_0x258a('0x29a')]?_0x4ee5c5['Step3End']:_0x4ee5c5[_0x258a('0x29a')],_0x355d63=Array(_0x1f625c-_0x1d4471+0x1)['fill']()[_0x258a('0x4a')]((_0x22d18d,_0x5d9f91)=>_0x1d4471+_0x5d9f91);for(const _0x17555e of _0x355d63){const _0x224769=$dataArmors[_0x17555e];if(!_0x224769)continue;if(!VisuMZ['ItemsEquipsCore'][_0x258a('0xd9')](_0x224769,_0x198f5d,_0x8fa060))continue;_0x367e1a[_0x258a('0xc2')]([0x2,_0x17555e,0x0,_0x224769[_0x258a('0x4d')]]);}SceneManager[_0x258a('0xc2')](Scene_Shop),SceneManager[_0x258a('0x33a')](_0x367e1a,_0x4ee5c5[_0x258a('0xd4')]);}),VisuMZ[_0x258a('0xc5')][_0x258a('0xd9')]=function(_0x573b82,_0xb28227,_0x5919c5){if(_0x573b82[_0x258a('0x145')][_0x258a('0x13a')]()==='')return![];if(_0x573b82[_0x258a('0x145')][_0x258a('0x22d')](/-----/i))return![];const _0x2266f4=_0x573b82[_0x258a('0x14')];if(_0xb28227['length']>0x0){if(_0x258a('0xd8')!==_0x258a('0x32a'))for(const _0x31cf49 of _0xb28227){if(_0x258a('0x35d')!==_0x258a('0x35d')){function _0x29456a(){this[_0x258a('0x3b')]=!![];const _0x36080=_0x52d5fb[_0x258a('0xc5')][_0x258a('0x186')][_0x183393][_0x258a('0x2b')](this,_0x2e02a6,_0x5ad832);return this[_0x258a('0x3b')]=![],_0x36080;}}else{if(!_0x31cf49)continue;if(_0x2266f4[_0x258a('0x3e4')](_0x31cf49))return![];}}else{function _0x2bc0c8(){this[_0x258a('0x6')]=_0x306473[_0x258a('0x180')][_0x258a('0xe3')]();}}}if(_0x5919c5[_0x258a('0x2a7')]>0x0){for(const _0xfbe6e of _0x5919c5){if(!_0xfbe6e)continue;if(_0x2266f4[_0x258a('0x3e4')](_0xfbe6e))return!![];}return![];}return!![];},VisuMZ[_0x258a('0xc5')][_0x258a('0x1a8')]=Scene_Boot[_0x258a('0x19a')][_0x258a('0x25d')],Scene_Boot[_0x258a('0x19a')]['onDatabaseLoaded']=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x1a8')][_0x258a('0x2b')](this),this[_0x258a('0x3f9')](),this[_0x258a('0x245')]();},Scene_Boot[_0x258a('0x19a')][_0x258a('0x3f9')]=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x2b0')]={},VisuMZ['ItemsEquipsCore'][_0x258a('0x2b0')]['EquipParams']=[],VisuMZ['ItemsEquipsCore'][_0x258a('0x2b0')][_0x258a('0x142')]=[];const _0xd1180f=[_0x258a('0x284'),_0x258a('0x42e'),'ATK',_0x258a('0x125'),'MAT','MDF',_0x258a('0x274'),'LUK'];for(const _0x5577c3 of _0xd1180f){const _0x1067f7=_0x258a('0x10')['format'](_0x5577c3);VisuMZ[_0x258a('0xc5')]['RegExp'][_0x258a('0x120')]['push'](new RegExp(_0x1067f7,'i'));const _0x50e1e7=_0x258a('0x35f')[_0x258a('0x2c4')](_0x5577c3);VisuMZ[_0x258a('0xc5')]['RegExp'][_0x258a('0x142')][_0x258a('0xc2')](new RegExp(_0x50e1e7,'g'));}},Scene_Boot[_0x258a('0x19a')][_0x258a('0x245')]=function(){this[_0x258a('0x410')]();const _0x2342d3=[$dataItems,$dataWeapons,$dataArmors];for(const _0x2d1af5 of _0x2342d3){if(_0x258a('0x3d8')==='krGcT'){function _0x257ab0(){return _0x36afd2[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x172')];}}else for(const _0x2cf56c of _0x2d1af5){if(!_0x2cf56c)continue;this[_0x258a('0x2da')](_0x2cf56c,_0x2d1af5),this[_0x258a('0x2bb')](_0x2cf56c,_0x2d1af5),this[_0x258a('0x108')](_0x2cf56c,_0x2d1af5),this[_0x258a('0x93')](_0x2cf56c,_0x2d1af5),this[_0x258a('0xb4')](_0x2cf56c,_0x2d1af5);}}},Scene_Boot[_0x258a('0x19a')]['process_VisuMZ_ItemsEquipsCore_EquipSlots']=function(){for(const _0x39b6be of $dataClasses){if('ZrejT'!=='BmKhJ'){if(!_0x39b6be)continue;_0x39b6be[_0x258a('0x2ba')]=[];if(_0x39b6be[_0x258a('0x133')][_0x258a('0x22d')](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x32a270=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x23eb38 of _0x32a270){const _0x2e2169=$dataSystem[_0x258a('0x399')][_0x258a('0x160')](_0x23eb38['trim']());if(_0x2e2169>0x0)_0x39b6be[_0x258a('0x2ba')][_0x258a('0xc2')](_0x2e2169);}}else{if(_0x258a('0x12c')===_0x258a('0x220')){function _0x738b50(){return _0x2c4749[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x189')];}}else for(const _0x2a49ed of $dataSystem[_0x258a('0x399')]){if(_0x258a('0x12e')===_0x258a('0x12e')){const _0x48ec60=$dataSystem[_0x258a('0x399')][_0x258a('0x160')](_0x2a49ed[_0x258a('0x13a')]());if(_0x48ec60>0x0)_0x39b6be[_0x258a('0x2ba')]['push'](_0x48ec60);}else{function _0x15e66d(){const _0x12bc51=this[_0x258a('0x354')];_0x12bc51[_0x258a('0x393')][_0x258a('0x237')]();const _0x2e6e28=this[_0x258a('0x22c')](this['index']());if(_0x2e6e28===_0x258a('0x54')){const _0x4c9c09=this[_0x258a('0x280')](this[_0x258a('0xf9')]());let _0x7b2184=this[_0x258a('0x390')](this['index']());_0x7b2184=_0x7b2184[_0x258a('0x1')](/\\I\[(\d+)\]/gi,''),_0x12bc51[_0x258a('0x174')](),this[_0x258a('0x291')](_0x7b2184,_0x4c9c09),this[_0x258a('0x3ae')](_0x7b2184,_0x4c9c09),this['categoryNameWindowCenter'](_0x7b2184,_0x4c9c09);}}}}}}else{function _0x59f7ae(){_0x1b9322=_0x258a('0x8f')[_0x258a('0x2c4')](_0x1eb41c['id']);}}}},Scene_Boot[_0x258a('0x19a')]['process_VisuMZ_ItemsEquipsCore_Category']=function(_0x682d05,_0x5843eb){_0x682d05[_0x258a('0x14')]=[];const _0x99e647=_0x682d05[_0x258a('0x133')],_0x130a44=_0x99e647[_0x258a('0x22d')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x130a44)for(const _0x4573d4 of _0x130a44){_0x4573d4[_0x258a('0x22d')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x39cf26=String(RegExp['$1'])[_0x258a('0x176')]()[_0x258a('0x13a')]()[_0x258a('0x1fe')](',');for(const _0x545bec of _0x39cf26){if(_0x258a('0x434')===_0x258a('0x34b')){function _0x1e38e6(){const _0x3fbc06=_0x258a('0x98');if(this[_0x258a('0x312')][_0x3fbc06])return this[_0x258a('0x312')][_0x3fbc06];const _0x14b684=_0x209001[_0x258a('0xc5')]['Settings'][_0x258a('0x27b')],_0x319dbb=_0x258a('0xe2')[_0x258a('0x2c4')](this[_0x258a('0xb')][_0x258a('0x306')]);return _0x14b684[_0x319dbb];}}else _0x682d05[_0x258a('0x14')][_0x258a('0xc2')](_0x545bec[_0x258a('0x13a')]());}}if(_0x99e647[_0x258a('0x22d')](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x41c9c0=RegExp['$1'][_0x258a('0x1fe')](/[\r\n]+/);for(const _0x5e1fd5 of _0x41c9c0){_0x682d05['categories'][_0x258a('0xc2')](_0x5e1fd5[_0x258a('0x176')]()[_0x258a('0x13a')]());}}},Scene_Boot['prototype'][_0x258a('0x2bb')]=function(_0x5c4f93,_0x46fe7c){if(_0x5c4f93[_0x258a('0x133')][_0x258a('0x22d')](/<PRICE:[ ](\d+)>/i)){if(_0x258a('0x1e9')!==_0x258a('0x11f'))_0x5c4f93[_0x258a('0x4d')]=Number(RegExp['$1']);else{function _0x4e45ca(){return 0x63;}}}},Scene_Boot[_0x258a('0x19a')][_0x258a('0x108')]=function(_0x2bc2d4,_0x399c21){if(_0x399c21===$dataItems)return;for(let _0x5329ca=0x0;_0x5329ca<0x8;_0x5329ca++){const _0x1229a0=VisuMZ[_0x258a('0xc5')][_0x258a('0x2b0')]['EquipParams'][_0x5329ca];if(_0x2bc2d4[_0x258a('0x133')][_0x258a('0x22d')](_0x1229a0)){if(_0x258a('0x34')==='STxzW'){function _0x550757(){this[_0x258a('0x40f')]();}}else _0x2bc2d4['params'][_0x5329ca]=parseInt(RegExp['$1']);}}},VisuMZ['ItemsEquipsCore'][_0x258a('0x186')]={},Scene_Boot[_0x258a('0x19a')][_0x258a('0x93')]=function(_0x53d70f,_0x16a6c5){if(_0x16a6c5===$dataItems)return;if(_0x53d70f['note'][_0x258a('0x22d')](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){if(_0x258a('0x8c')!=='RTTgy'){function _0x1d2cf4(){this[_0x258a('0x2e0')]();}}else{const _0x3bdff5=String(RegExp['$1']),_0x40d068=(_0x16a6c5===$dataWeapons?_0x258a('0xc8'):_0x258a('0x37'))[_0x258a('0x2c4')](_0x53d70f['id']),_0x5f2fb4=_0x258a('0x412')[_0x258a('0x2c4')](_0x3bdff5);for(let _0x38ca8e=0x0;_0x38ca8e<0x8;_0x38ca8e++){if(_0x3bdff5[_0x258a('0x22d')](VisuMZ['ItemsEquipsCore'][_0x258a('0x2b0')][_0x258a('0x142')][_0x38ca8e])){if(_0x258a('0x1c8')!==_0x258a('0x2fe')){const _0x4359f4=_0x258a('0x75')[_0x258a('0x2c4')](_0x40d068,_0x38ca8e);VisuMZ['ItemsEquipsCore'][_0x258a('0x186')][_0x4359f4]=new Function(_0x258a('0x396'),_0x258a('0x23e'),_0x5f2fb4);}else{function _0x41273a(){this['isUseModernControls']()&&(this[_0x258a('0x234')]['deselect'](),this[_0x258a('0x234')][_0x258a('0x2e5')]()),_0x3711de[_0x258a('0xc5')][_0x258a('0x2cb')][_0x258a('0x2b')](this);}}}}}}},VisuMZ[_0x258a('0xc5')][_0x258a('0xd3')]={},Scene_Boot[_0x258a('0x19a')][_0x258a('0xb4')]=function(_0x2911f2,_0x36b301){if(_0x36b301!==$dataItems)return;if(_0x2911f2[_0x258a('0x133')][_0x258a('0x22d')](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x5aa1a8=String(RegExp['$1']),_0x204f77=_0x258a('0x1d8')[_0x258a('0x2c4')](_0x5aa1a8);VisuMZ[_0x258a('0xc5')][_0x258a('0xd3')][_0x2911f2['id']]=new Function(_0x258a('0x396'),_0x204f77);}},DataManager[_0x258a('0x28b')]=function(_0x4c3d56){return this[_0x258a('0x3df')](_0x4c3d56)&&_0x4c3d56[_0x258a('0x1f')]===0x2;},DataManager[_0x258a('0x1d0')]=function(_0xefb503){if(!_0xefb503)return 0x63;else{if(_0xefb503[_0x258a('0x133')][_0x258a('0x22d')](/<MAX:[ ](\d+)>/i))return parseInt(RegExp['$1']);else{if(_0x258a('0x1d9')!==_0x258a('0x1d9')){function _0x5045a4(){const _0x1c612c=this[_0x258a('0x41f')](_0x293553);_0x3bc2b3[_0x258a('0xc5')][_0x258a('0x1df')][_0x258a('0x2b')](this,_0x20ad90,_0xced3a3,_0x12d39e);if(this['numItems'](_0x333bba)>_0x1c612c)this[_0x258a('0x2be')](_0x2425a7);}}else return this[_0x258a('0x3cc')](_0xefb503);}}},DataManager['defaultItemMax']=function(_0xeab2ed){if(this[_0x258a('0x3df')](_0xeab2ed)){if(_0x258a('0x210')!==_0x258a('0x210')){function _0x257707(){_0xb1f8d8[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')]['DrawPortraitJS'][_0x258a('0x2b')](this),this[_0x258a('0x41d')]();}}else return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x357')][_0x258a('0x1d2')];}else{if(this[_0x258a('0x3f7')](_0xeab2ed))return VisuMZ['ItemsEquipsCore']['Settings'][_0x258a('0x357')][_0x258a('0x11d')];else{if(this[_0x258a('0x36d')](_0xeab2ed))return VisuMZ[_0x258a('0xc5')]['Settings']['ItemScene'][_0x258a('0x6a')];}}},ColorManager[_0x258a('0x110')]=function(_0x42a3a7){if(!_0x42a3a7)return this[_0x258a('0x5e')]();else{if(_0x42a3a7[_0x258a('0x133')][_0x258a('0x22d')](/<COLOR:[ ](\d+)>/i))return this[_0x258a('0x96')](Number(RegExp['$1'])[_0x258a('0x14a')](0x0,0x1f));else return _0x42a3a7['note'][_0x258a('0x22d')](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x258a('0x5e')]();}},Game_Temp[_0x258a('0x19a')][_0x258a('0x7f')]=function(){if(this[_0x258a('0x9e')])return![];return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['New'][_0x258a('0x182')];},VisuMZ[_0x258a('0x15')]=VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x183')],VisuMZ[_0x258a('0xc5')][_0x258a('0x3d0')]=Game_BattlerBase[_0x258a('0x19a')][_0x258a('0x224')],Game_BattlerBase[_0x258a('0x19a')][_0x258a('0x224')]=function(_0x505fd9){return this['_shopStatusMenuMode']?this[_0x258a('0x17c')]?VisuMZ[_0x258a('0x15')]:0x1:VisuMZ[_0x258a('0xc5')][_0x258a('0x3d0')][_0x258a('0x2b')](this,_0x505fd9);},VisuMZ[_0x258a('0xc5')][_0x258a('0x413')]=Game_BattlerBase[_0x258a('0x19a')]['meetsItemConditions'],Game_BattlerBase[_0x258a('0x19a')][_0x258a('0x77')]=function(_0x3d4454){if(!_0x3d4454)return![];if(!VisuMZ[_0x258a('0xc5')][_0x258a('0x413')]['call'](this,_0x3d4454))return![];if(!this[_0x258a('0x2b6')](_0x3d4454))return![];if(!this[_0x258a('0x2f5')](_0x3d4454))return![];return!![];},Game_BattlerBase[_0x258a('0x19a')][_0x258a('0x2b6')]=function(_0x3309bb){if(!this[_0x258a('0x73')](_0x3309bb))return![];return!![];},Game_BattlerBase[_0x258a('0x19a')][_0x258a('0x73')]=function(_0x2018b){const _0x5ce2ce=_0x2018b[_0x258a('0x133')];if(_0x5ce2ce[_0x258a('0x22d')](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2bc3ae=JSON[_0x258a('0x3d9')]('['+RegExp['$1'][_0x258a('0x22d')](/\d+/g)+']');for(const _0x18aaaa of _0x2bc3ae){if(!$gameSwitches['value'](_0x18aaaa))return![];}return!![];}if(_0x5ce2ce[_0x258a('0x22d')](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x258a('0x8e')!==_0x258a('0x1d3')){const _0x3eb27c=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3c979a of _0x3eb27c){if('cBDeN'==='EodCt'){function _0x3b6c5d(){for(const _0x23d266 of _0x22bf01[_0x258a('0xa5')](this[_0x258a('0x16b')])){_0x23d266[_0x258a('0x5b')]();}}}else{if(!$gameSwitches[_0x258a('0x24e')](_0x3c979a))return![];}}return!![];}else{function _0x1e4aff(){return _0x7b67f1[_0x258a('0x19a')][_0x258a('0x21b')]['call'](this);}}}if(_0x5ce2ce[_0x258a('0x22d')](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5926af=JSON[_0x258a('0x3d9')]('['+RegExp['$1'][_0x258a('0x22d')](/\d+/g)+']');for(const _0x367f1b of _0x5926af){if($gameSwitches['value'](_0x367f1b))return!![];}return![];}if(_0x5ce2ce[_0x258a('0x22d')](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5f3834=JSON[_0x258a('0x3d9')]('['+RegExp['$1'][_0x258a('0x22d')](/\d+/g)+']');for(const _0x5844d1 of _0x5f3834){if('OHhtI'!==_0x258a('0x2eb')){function _0x146bf6(){return _0x51782b[_0x258a('0xc5')][_0x258a('0x27f')]['StatusWindow'][_0x258a('0x196')];}}else{if(!$gameSwitches[_0x258a('0x24e')](_0x5844d1))return!![];}}return![];}if(_0x5ce2ce[_0x258a('0x22d')](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16466b=JSON[_0x258a('0x3d9')]('['+RegExp['$1'][_0x258a('0x22d')](/\d+/g)+']');for(const _0x254268 of _0x16466b){if(!$gameSwitches[_0x258a('0x24e')](_0x254268))return!![];}return![];}if(_0x5ce2ce['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x537ffd=JSON['parse']('['+RegExp['$1'][_0x258a('0x22d')](/\d+/g)+']');for(const _0x373769 of _0x537ffd){if(_0x258a('0x1bb')!=='IyrFq'){function _0x478f26(){const _0x4ff9f8=_0x5a2a6f[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x322')]['Text'];if(_0x4ff9f8==='')return;const _0x4ab6b6=_0x4f872a['iconWidth'],_0x274112=_0x56a601[_0x258a('0x11')];this['bitmap']['textColor']=this[_0x258a('0x2d6')](),this[_0x258a('0x3d7')][_0x258a('0x436')]=_0x22ba3e[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x322')][_0x258a('0x4c')],this[_0x258a('0x3d7')]['drawText'](_0x4ff9f8,0x0,_0x274112/0x2,_0x4ab6b6,_0x274112/0x2,_0x258a('0x161'));}}else{if($gameSwitches[_0x258a('0x24e')](_0x373769))return![];}}return!![];}return!![];},Game_BattlerBase[_0x258a('0x19a')][_0x258a('0x2f5')]=function(_0x417289){const _0x28cda4=_0x417289[_0x258a('0x133')],_0x2bd606=VisuMZ[_0x258a('0xc5')]['itemEnableJS'];if(_0x2bd606[_0x417289['id']]){if('jUKDq'===_0x258a('0x27'))return _0x2bd606[_0x417289['id']][_0x258a('0x2b')](this,_0x417289);else{function _0x3f131c(){const _0x51c257=this['_item'][_0x258a('0x133')];if(_0x51c257[_0x258a('0x22d')](/<ALWAYS HIT>/i))return'100%';else{if(_0x51c257[_0x258a('0x22d')](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x258a('0x385')[_0x258a('0x2c4')](_0x142703(_0x224f82['$1']));}}}}else return!![];},Game_Actor['prototype'][_0x258a('0x154')]=function(_0x250267){_0x250267=this[_0x258a('0x253')](_0x250267);const _0x1046fd=this[_0x258a('0x2ba')]();this[_0x258a('0x38d')]=[];for(let _0x44a24e=0x0;_0x44a24e<_0x1046fd['length'];_0x44a24e++){this[_0x258a('0x38d')][_0x44a24e]=new Game_Item();}for(let _0x1c03e7=0x0;_0x1c03e7<_0x1046fd[_0x258a('0x2a7')];_0x1c03e7++){const _0x3b268f=_0x1046fd[_0x1c03e7],_0x3a0a1a=this[_0x258a('0x38a')](_0x250267,_0x3b268f);if(this['canEquip'](_0x3a0a1a))this[_0x258a('0x38d')][_0x1c03e7][_0x258a('0x1e2')](_0x3a0a1a);}this[_0x258a('0x377')](!![]),this[_0x258a('0x16')]();},Game_Actor['prototype'][_0x258a('0x253')]=function(_0x3ac60a){const _0x4f250f=[];for(let _0x2149c2=0x0;_0x2149c2<_0x3ac60a['length'];_0x2149c2++){const _0x2d613a=_0x3ac60a[_0x2149c2];if(_0x2d613a<=0x0)continue;const _0x848421=$dataSystem['equipTypes'][_0x2149c2+0x1];_0x848421===$dataSystem['equipTypes'][0x1]||_0x2149c2===0x1&&this[_0x258a('0x7c')]()?_0x4f250f[_0x258a('0xc2')]($dataWeapons[_0x2d613a]):_0x4f250f[_0x258a('0xc2')]($dataArmors[_0x2d613a]);}return _0x4f250f;},Game_Actor[_0x258a('0x19a')][_0x258a('0x38a')]=function(_0x30255f,_0x3999e4){for(const _0x5dcf9b of _0x30255f){if(!_0x5dcf9b)continue;if(_0x5dcf9b[_0x258a('0x22e')]===_0x3999e4){if(_0x258a('0x328')===_0x258a('0x328'))return _0x30255f[_0x258a('0x178')](_0x30255f[_0x258a('0x160')](_0x5dcf9b),0x1),_0x5dcf9b;else{function _0x5b7361(){return this[_0x258a('0xec')]();}}}}return null;},Game_Actor[_0x258a('0x19a')][_0x258a('0x2ba')]=function(){const _0xfffb69=JsonEx[_0x258a('0x3de')](this[_0x258a('0x305')]()[_0x258a('0x2ba')]);if(_0xfffb69[_0x258a('0x2a7')]>=0x2&&this[_0x258a('0x7c')]())_0xfffb69[0x1]=0x1;return _0xfffb69;},Game_Actor[_0x258a('0x19a')][_0x258a('0x1f1')]=function(){const _0x5a1a56=this[_0x258a('0x2ba')]();for(let _0x84a292=0x0;_0x84a292<_0x5a1a56[_0x258a('0x2a7')];_0x84a292++){if(!this['_equips'][_0x84a292])this[_0x258a('0x38d')][_0x84a292]=new Game_Item();}this[_0x258a('0x377')](![]),this[_0x258a('0x16')]();},VisuMZ[_0x258a('0xc5')][_0x258a('0x1ad')]=Game_Actor[_0x258a('0x19a')][_0x258a('0x170')],Game_Actor[_0x258a('0x19a')][_0x258a('0x170')]=function(_0x275c7e,_0x59f242){if(this[_0x258a('0x2ff')]){const _0x5f9f83=JsonEx[_0x258a('0x3de')](this);_0x5f9f83[_0x258a('0x2ff')]=!![],VisuMZ[_0x258a('0xc5')][_0x258a('0x1ad')][_0x258a('0x2b')](this,_0x275c7e,_0x59f242),this[_0x258a('0x3f3')](_0x5f9f83);}else VisuMZ[_0x258a('0xc5')]['Game_Actor_changeEquip'][_0x258a('0x2b')](this,_0x275c7e,_0x59f242);},VisuMZ[_0x258a('0xc5')][_0x258a('0x258')]=Game_Actor[_0x258a('0x19a')][_0x258a('0x364')],Game_Actor[_0x258a('0x19a')][_0x258a('0x364')]=function(_0x4bbee4,_0x3759fc){if(this[_0x258a('0x2ff')]){const _0x230540=JsonEx[_0x258a('0x3de')](this);_0x230540[_0x258a('0x2ff')]=!![],VisuMZ[_0x258a('0xc5')][_0x258a('0x258')][_0x258a('0x2b')](this,_0x4bbee4,_0x3759fc),this[_0x258a('0x3f3')](_0x230540);}else VisuMZ[_0x258a('0xc5')][_0x258a('0x258')]['call'](this,_0x4bbee4,_0x3759fc);},VisuMZ['ItemsEquipsCore'][_0x258a('0x2a8')]=Game_Actor[_0x258a('0x19a')][_0x258a('0x421')],Game_Actor[_0x258a('0x19a')]['discardEquip']=function(_0x392fa4){if(!this[_0x258a('0x2ff')]){const _0xd9ab5b=JsonEx[_0x258a('0x3de')](this);_0xd9ab5b[_0x258a('0x2ff')]=!![],VisuMZ[_0x258a('0xc5')]['Game_Actor_discardEquip'][_0x258a('0x2b')](this,_0x392fa4),this[_0x258a('0x3f3')](_0xd9ab5b);}else VisuMZ['ItemsEquipsCore'][_0x258a('0x2a8')][_0x258a('0x2b')](this,_0x392fa4);},Game_Actor['prototype']['releaseUnequippableItems']=function(_0x4d6055){for(;;){const _0x4f8c1e=this[_0x258a('0x2ba')](),_0x3e1c66=this[_0x258a('0x28d')]();let _0x392ac2=![];for(let _0x361544=0x0;_0x361544<_0x3e1c66['length'];_0x361544++){if(_0x258a('0x2dc')===_0x258a('0x2dc')){const _0x5325c8=_0x3e1c66[_0x361544];if(_0x5325c8&&(!this['canEquip'](_0x5325c8)||_0x5325c8[_0x258a('0x22e')]!==_0x4f8c1e[_0x361544])){!_0x4d6055&&this[_0x258a('0x323')](null,_0x5325c8);if(!this[_0x258a('0x2ff')]){const _0x509e3b=JsonEx['makeDeepCopy'](this);_0x509e3b['_tempActor']=!![],this['_equips'][_0x361544]['setObject'](null),this[_0x258a('0x3f3')](_0x509e3b);}else{if(_0x258a('0x18b')!=='LJCvs'){function _0x8c4981(){if(!_0x29c68d[_0x258a('0x24e')](_0x406ca2))return![];}}else this['_equips'][_0x361544][_0x258a('0x1e2')](null);}_0x392ac2=!![];}}else{function _0x4c9a10(){_0x3501fb=_0x572240[_0x258a('0x396')];}}}if(!_0x392ac2)break;}},Game_Actor[_0x258a('0x19a')][_0x258a('0x3f3')]=function(_0x3034d9){if(this['_tempActor'])return;if(!VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['EquipScene']['EquipAdjustHpMp'])return;const _0x52cbda=Math[_0x258a('0x6e')](_0x3034d9[_0x258a('0x1cc')]()*this[_0x258a('0x1b1')]),_0x1214df=Math[_0x258a('0x6e')](_0x3034d9[_0x258a('0x40d')]()*this[_0x258a('0x2ea')]);if(this['hp']>0x0)this[_0x258a('0x2ed')](_0x52cbda);if(this['mp']>0x0)this[_0x258a('0x3a0')](_0x1214df);},Game_Actor['prototype'][_0x258a('0x1e7')]=function(){const _0x3d1b55=this[_0x258a('0x2ba')]()[_0x258a('0x2a7')];for(let _0x185dd4=0x0;_0x185dd4<_0x3d1b55;_0x185dd4++){if(_0x258a('0x32c')!=='PlXwG'){if(this[_0x258a('0x59')](_0x185dd4))this[_0x258a('0x170')](_0x185dd4,null);}else{function _0x29382e(){if(this['_item'][_0x258a('0xf')][_0x258a('0x15d')]<=0x0)return _0x1c2dd1;if(this[_0x258a('0x173')](_0x975aa3,_0x3ac864,_0x1943d7))_0x2957e0+=this['lineHeight']();if(this[_0x258a('0x2f7')](_0x3ede44,_0x19b126,_0x1bf7ee))_0x2c5859+=this['lineHeight']();return this[_0x258a('0x174')](),_0x33a7f1;}}}},Game_Actor['prototype'][_0x258a('0x59')]=function(_0x5c3432){if(this[_0x258a('0x192')]()[_0x258a('0x3e4')](this['equipSlots']()[_0x5c3432])){if(_0x258a('0x1bc')===_0x258a('0x1bc'))return![];else{function _0x115145(){const _0x2b9536=this[_0x258a('0x1a9')](_0x84aded);if(_0x2b9536===_0x258a('0x403'))this[_0x258a('0x33c')](_0x797985);else _0x2b9536===_0x258a('0x54')?this[_0x258a('0x1e8')](_0x402515):_0x11997e[_0x258a('0x19a')][_0x258a('0x3a5')][_0x258a('0x2b')](this,_0x191c3d);}}}else return this[_0x258a('0x19e')](_0x5c3432);},Game_Actor[_0x258a('0x19a')][_0x258a('0x192')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0x373')];},Game_Actor[_0x258a('0x19a')]['optimizeEquipments']=function(){const _0x4c2364=this[_0x258a('0x2ba')]()[_0x258a('0x2a7')];for(let _0x4cdf5d=0x0;_0x4cdf5d<_0x4c2364;_0x4cdf5d++){if(this['isOptimizeEquipOk'](_0x4cdf5d))this[_0x258a('0x170')](_0x4cdf5d,null);}for(let _0x634c86=0x0;_0x634c86<_0x4c2364;_0x634c86++){if(this['isOptimizeEquipOk'](_0x634c86))this[_0x258a('0x170')](_0x634c86,this[_0x258a('0x239')](_0x634c86));}},Game_Actor[_0x258a('0x19a')][_0x258a('0x17f')]=function(_0x505a37){if(this[_0x258a('0x1ee')]()[_0x258a('0x3e4')](this[_0x258a('0x2ba')]()[_0x505a37])){if('QBEei'!==_0x258a('0x2f6')){function _0x4042c2(){const _0x86639f=_0x323c47[_0x258a('0x3de')](this);_0x86639f[_0x258a('0x2ff')]=!![],_0x7b33a5[_0x258a('0xc5')]['Game_Actor_forceChangeEquip'][_0x258a('0x2b')](this,_0x14895f,_0x57963d),this['equipAdjustHpMp'](_0x86639f);}}else return![];}else{if(_0x258a('0x175')===_0x258a('0x175'))return this['isEquipChangeOk'](_0x505a37);else{function _0x5f32b5(){const _0x4db462=_0x258a('0x3');if(this[_0x258a('0x312')][_0x4db462])return this[_0x258a('0x312')][_0x4db462];let _0x27e9dc='';if(this[_0x258a('0xbe')][_0x258a('0x386')]>0x0)_0x27e9dc+=_0x258a('0x2b1')[_0x258a('0x2c4')](_0x36f570[_0x258a('0x32')](this[_0x258a('0xbe')][_0x258a('0x386')]*0x64));if(this[_0x258a('0xbe')][_0x258a('0x386')]>0x0&&this[_0x258a('0xbe')][_0x258a('0x3b1')]>0x0)_0x27e9dc+='\x20';if(this[_0x258a('0xbe')][_0x258a('0x3b1')]>0x0)_0x27e9dc+=_0x258a('0x34a')[_0x258a('0x2c4')](this[_0x258a('0xbe')][_0x258a('0x3b1')]);return _0x27e9dc;}}}},Game_Actor[_0x258a('0x19a')][_0x258a('0x1ee')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')]['NonOptimizeETypes'];},VisuMZ[_0x258a('0xc5')][_0x258a('0x2e1')]=Game_Actor[_0x258a('0x19a')]['tradeItemWithParty'],Game_Actor[_0x258a('0x19a')][_0x258a('0x323')]=function(_0x1d9996,_0x1cd446){$gameTemp[_0x258a('0x9e')]=!![];const _0x3a949e=VisuMZ[_0x258a('0xc5')][_0x258a('0x2e1')][_0x258a('0x2b')](this,_0x1d9996,_0x1cd446);return $gameTemp[_0x258a('0x9e')]=![],_0x3a949e;},Game_Actor['prototype'][_0x258a('0x42')]=function(_0x5f50ea,_0x56adb4){const _0x46fb9d=this[_0x258a('0x130')](_0x5f50ea);if(_0x46fb9d<0x0)return;const _0x2349d2=_0x5f50ea===0x1?$dataWeapons[_0x56adb4]:$dataArmors[_0x56adb4];this['changeEquip'](_0x46fb9d,_0x2349d2);},Game_Actor[_0x258a('0x19a')][_0x258a('0x130')]=function(_0x1143e6){let _0x54a0b1=0x0;const _0x5a04b2=this[_0x258a('0x2ba')](),_0x383315=this[_0x258a('0x28d')]();for(let _0x1724c8=0x0;_0x1724c8<_0x5a04b2[_0x258a('0x2a7')];_0x1724c8++){if(_0x5a04b2[_0x1724c8]===_0x1143e6){if(_0x258a('0x257')===_0x258a('0x257')){_0x54a0b1=_0x1724c8;if(!_0x383315[_0x1724c8])return _0x54a0b1;}else{function _0x1d3ed9(){return _0x5e6f8a['ItemsEquipsCore'][_0x258a('0x2f2')][_0x258a('0x2b')](this);}}}}return _0x54a0b1;},VisuMZ[_0x258a('0xc5')][_0x258a('0x1a0')]=Game_Actor['prototype'][_0x258a('0x3fe')],Game_Actor[_0x258a('0x19a')][_0x258a('0x3fe')]=function(_0x15b7fb){let _0x4445c0=VisuMZ['ItemsEquipsCore']['Game_Actor_paramPlus'][_0x258a('0x2b')](this,_0x15b7fb);for(const _0x39fe64 of this[_0x258a('0x28d')]()){if(_0x39fe64)_0x4445c0+=this['paramPlusItemsEquipsCoreCustomJS'](_0x39fe64,_0x15b7fb);}return _0x4445c0;},Game_Actor[_0x258a('0x19a')][_0x258a('0xa9')]=function(_0x165806,_0x3bc3b1){if(this['_calculatingJSParameters'])return 0x0;const _0x151090=(DataManager[_0x258a('0x3f7')](_0x165806)?_0x258a('0xc8'):_0x258a('0x37'))[_0x258a('0x2c4')](_0x165806['id']),_0x3ea17a=_0x258a('0x75')[_0x258a('0x2c4')](_0x151090,_0x3bc3b1);if(VisuMZ[_0x258a('0xc5')][_0x258a('0x186')][_0x3ea17a]){this[_0x258a('0x3b')]=!![];const _0x5254c2=VisuMZ[_0x258a('0xc5')]['paramJS'][_0x3ea17a][_0x258a('0x2b')](this,_0x165806,_0x3bc3b1);return this[_0x258a('0x3b')]=![],_0x5254c2;}else return 0x0;},Game_Actor[_0x258a('0x19a')][_0x258a('0x3a6')]=function(_0x208905){this['_shopStatusMenuMode']=!![],this['_shopStatusMenuAlly']=_0x208905;},VisuMZ[_0x258a('0xc5')][_0x258a('0x10c')]=Game_Party[_0x258a('0x19a')][_0x258a('0x1fd')],Game_Party[_0x258a('0x19a')][_0x258a('0x1fd')]=function(){VisuMZ[_0x258a('0xc5')]['Game_Party_initialize'][_0x258a('0x2b')](this),this[_0x258a('0x273')]();},Game_Party['prototype'][_0x258a('0x273')]=function(){this['_newItemsList']=[];},Game_Party[_0x258a('0x19a')]['isNewItem']=function(_0x39e4d0){if(!$gameTemp[_0x258a('0x7f')]())return![];if(this[_0x258a('0x325')]===undefined)this[_0x258a('0x273')]();let _0x1826bb='';if(DataManager[_0x258a('0x3df')](_0x39e4d0))_0x1826bb=_0x258a('0xbd')[_0x258a('0x2c4')](_0x39e4d0['id']);else{if(DataManager[_0x258a('0x3f7')](_0x39e4d0))_0x1826bb=_0x258a('0x300')[_0x258a('0x2c4')](_0x39e4d0['id']);else{if(DataManager[_0x258a('0x36d')](_0x39e4d0)){if(_0x258a('0x3e1')!==_0x258a('0x3e1')){function _0x27971e(){const _0x16ab88=this[_0x258a('0x1a9')](_0x8a67fa);if(_0x16ab88===_0x258a('0x403'))this[_0x258a('0x33c')](_0x5597b6);else _0x16ab88===_0x258a('0x54')?this[_0x258a('0x1e8')](_0x416437):_0x23d319[_0x258a('0x19a')][_0x258a('0x3a5')][_0x258a('0x2b')](this,_0x93df9a);}}else _0x1826bb=_0x258a('0x8f')[_0x258a('0x2c4')](_0x39e4d0['id']);}else return;}}return this[_0x258a('0x325')][_0x258a('0x3e4')](_0x1826bb);},Game_Party[_0x258a('0x19a')][_0x258a('0x2be')]=function(_0xd6930){if(!$gameTemp[_0x258a('0x7f')]())return;if(this['_newItemsList']===undefined)this[_0x258a('0x273')]();let _0x4cdb89='';if(DataManager[_0x258a('0x3df')](_0xd6930))_0x4cdb89='item-%1'[_0x258a('0x2c4')](_0xd6930['id']);else{if(DataManager[_0x258a('0x3f7')](_0xd6930))_0x4cdb89=_0x258a('0x300')[_0x258a('0x2c4')](_0xd6930['id']);else{if(DataManager[_0x258a('0x36d')](_0xd6930)){if(_0x258a('0xbf')===_0x258a('0xbf'))_0x4cdb89=_0x258a('0x8f')[_0x258a('0x2c4')](_0xd6930['id']);else{function _0x148cd4(){const _0x2a2dc6=_0x258a('0x62');if(this[_0x258a('0x312')][_0x2a2dc6])return this[_0x258a('0x312')][_0x2a2dc6];const _0x4a6630=_0x258a('0x23');return _0x4a6630[_0x258a('0x2c4')](this[_0x258a('0xb')][_0x258a('0x308')]);}}}else{if(_0x258a('0x243')==='kyrEQ'){function _0x4a6e98(){this[_0x258a('0x40f')](),_0x5c926b[_0x258a('0x180')]['commandEquip'](),_0x66b2e0[_0x258a('0x180')]['_slotWindow']['smoothSelect'](-0x1);}}else return;}}}if(!this[_0x258a('0x325')][_0x258a('0x3e4')](_0x4cdb89))this[_0x258a('0x325')][_0x258a('0xc2')](_0x4cdb89);},Game_Party[_0x258a('0x19a')][_0x258a('0xe6')]=function(_0x5983be){if(!$gameTemp[_0x258a('0x7f')]())return;if(this[_0x258a('0x325')]===undefined)this[_0x258a('0x273')]();let _0x451233='';if(DataManager[_0x258a('0x3df')](_0x5983be)){if(_0x258a('0x2e3')==='yoMyf')_0x451233=_0x258a('0xbd')['format'](_0x5983be['id']);else{function _0x365bfc(){if(_0x50fdc1[_0x258a('0x30c')]&&_0x34f26d[_0x258a('0x158')]!==_0x16f178)return _0x3007cf[_0x258a('0x158')];else{if(this[_0x258a('0x3eb')]())return this[_0x258a('0x419')]()[_0x258a('0x22d')](/RIGHT/i);else _0x2dfce0[_0x258a('0x19a')][_0x258a('0x190')][_0x258a('0x2b')](this);}}}}else{if(DataManager[_0x258a('0x3f7')](_0x5983be))_0x451233=_0x258a('0x300')[_0x258a('0x2c4')](_0x5983be['id']);else{if(DataManager['isArmor'](_0x5983be)){if(_0x258a('0x21f')!==_0x258a('0x362'))_0x451233=_0x258a('0x8f')[_0x258a('0x2c4')](_0x5983be['id']);else{function _0x79af2d(){const _0x11a920=_0x287b29['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x322')][_0x258a('0x3a1')];if(_0x11a920<=0x0)return;const _0x424d13=_0x4c2884['loadSystem'](_0x258a('0x1f6')),_0x45b135=_0xa1ddf2['iconWidth'],_0x38cbac=_0x2ea5b0[_0x258a('0x11')],_0x54101d=_0x11a920%0x10*_0x45b135,_0xd3cb46=_0x391a7b[_0x258a('0x32')](_0x11a920/0x10)*_0x38cbac;this[_0x258a('0x3d7')][_0x258a('0x315')](_0x424d13,_0x54101d,_0xd3cb46,_0x45b135,_0x38cbac,0x0,0x0);}}}else{if('qfaUF'===_0x258a('0x40'))return;else{function _0x3861cd(){this['cursorPagedown']();}}}}}this[_0x258a('0x325')]['includes'](_0x451233)&&this[_0x258a('0x325')][_0x258a('0x178')](this[_0x258a('0x325')][_0x258a('0x160')](_0x451233),0x1);},VisuMZ[_0x258a('0xc5')][_0x258a('0x1df')]=Game_Party[_0x258a('0x19a')][_0x258a('0x2f')],Game_Party[_0x258a('0x19a')][_0x258a('0x2f')]=function(_0x317491,_0x5c6129,_0x30015d){const _0x2d6365=this[_0x258a('0x41f')](_0x317491);VisuMZ[_0x258a('0xc5')][_0x258a('0x1df')][_0x258a('0x2b')](this,_0x317491,_0x5c6129,_0x30015d);if(this[_0x258a('0x41f')](_0x317491)>_0x2d6365)this['setNewItem'](_0x317491);},Game_Party[_0x258a('0x19a')][_0x258a('0xcc')]=function(_0x32fb95){return DataManager[_0x258a('0x1d0')](_0x32fb95);},VisuMZ['ItemsEquipsCore']['Scene_ItemBase_activateItemWindow']=Scene_ItemBase[_0x258a('0x19a')][_0x258a('0x1fc')],Scene_ItemBase[_0x258a('0x19a')][_0x258a('0x1fc')]=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x256')][_0x258a('0x2b')](this),this[_0x258a('0xc0')][_0x258a('0x327')]();},Scene_Item[_0x258a('0x19a')]['isBottomHelpMode']=function(){if(ConfigManager[_0x258a('0x30c')]&&ConfigManager[_0x258a('0x334')]!==undefined)return ConfigManager[_0x258a('0x334')];else{if(this[_0x258a('0x3eb')]())return this[_0x258a('0x419')]()[_0x258a('0x22d')](/LOWER/i);else{if(_0x258a('0x246')===_0x258a('0x1e5')){function _0x507af7(){const _0x96d741=_0x4d1174[_0x258a('0x3d9')]('['+_0x346f2c['$1'][_0x258a('0x22d')](/\d+/g)+']');for(const _0x5a4e11 of _0x96d741){if(!_0xdef76f['value'](_0x5a4e11))return![];}return!![];}}else Scene_ItemBase[_0x258a('0x19a')][_0x258a('0x190')][_0x258a('0x2b')](this);}}},Scene_Item[_0x258a('0x19a')][_0x258a('0x190')]=function(){if(ConfigManager[_0x258a('0x30c')]&&ConfigManager[_0x258a('0x158')]!==undefined){if(_0x258a('0x42f')==='HSUnl')return ConfigManager[_0x258a('0x158')];else{function _0x554b5c(){const _0x1dffcf='ELEMENT';if(this[_0x258a('0x312')][_0x1dffcf])return this[_0x258a('0x312')][_0x1dffcf];if(this[_0x258a('0xb')][_0x258a('0xf')][_0x258a('0x240')]<=-0x1)return _0x3783fa[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x439')];else return this[_0x258a('0xb')][_0x258a('0xf')][_0x258a('0x240')]===0x0?_0x59924f[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')]['ElementNone']:_0x316d75['elements'][this[_0x258a('0xb')][_0x258a('0xf')]['elementId']];}}}else{if(this[_0x258a('0x3eb')]())return this[_0x258a('0x419')]()[_0x258a('0x22d')](/RIGHT/i);else Scene_ItemBase[_0x258a('0x19a')][_0x258a('0x190')][_0x258a('0x2b')](this);}},Scene_Item[_0x258a('0x19a')][_0x258a('0x419')]=function(){return VisuMZ[_0x258a('0xc5')]['Settings'][_0x258a('0x357')][_0x258a('0x1c7')];},Scene_Item[_0x258a('0x19a')][_0x258a('0x2cc')]=function(){return this[_0x258a('0x3d5')]&&this[_0x258a('0x3d5')][_0x258a('0x2cc')]();},Scene_Item[_0x258a('0x19a')]['isUseItemsEquipsCoreUpdatedLayout']=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x357')][_0x258a('0xca')];},VisuMZ[_0x258a('0xc5')]['Scene_Item_create']=Scene_Item[_0x258a('0x19a')][_0x258a('0x41')],Scene_Item['prototype'][_0x258a('0x41')]=function(){VisuMZ['ItemsEquipsCore'][_0x258a('0x2b8')]['call'](this),this[_0x258a('0x2cc')]()&&this[_0x258a('0x404')]();},Scene_Item[_0x258a('0x19a')][_0x258a('0x21b')]=function(){return this[_0x258a('0x3eb')]()?this[_0x258a('0xe0')]():Scene_ItemBase['prototype'][_0x258a('0x21b')][_0x258a('0x2b')](this);},Scene_Item[_0x258a('0x19a')][_0x258a('0xe0')]=function(){const _0x5b383e=0x0,_0x52c3c0=this[_0x258a('0x19b')](),_0x288ab1=Graphics[_0x258a('0x111')],_0x3c423e=this[_0x258a('0x369')]();return new Rectangle(_0x5b383e,_0x52c3c0,_0x288ab1,_0x3c423e);},VisuMZ[_0x258a('0xc5')][_0x258a('0x423')]=Scene_Item[_0x258a('0x19a')]['createCategoryWindow'],Scene_Item[_0x258a('0x19a')][_0x258a('0x9d')]=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x423')][_0x258a('0x2b')](this),this[_0x258a('0x2cc')]()&&this['postCreateCategoryWindowItemsEquipsCore']();},Scene_Item[_0x258a('0x19a')][_0x258a('0x15b')]=function(){delete this[_0x258a('0x3d5')]['_handlers']['ok'],delete this[_0x258a('0x3d5')][_0x258a('0x168')][_0x258a('0x29c')];},VisuMZ[_0x258a('0xc5')]['Scene_Item_categoryWindowRect']=Scene_Item[_0x258a('0x19a')][_0x258a('0x148')],Scene_Item[_0x258a('0x19a')][_0x258a('0x148')]=function(){if(this[_0x258a('0x3eb')]()){if(_0x258a('0x3e6')===_0x258a('0x249')){function _0x389e47(){return this['statusWindowRectItemsEquipsCore']();}}else return this[_0x258a('0xfd')]();}else return VisuMZ[_0x258a('0xc5')][_0x258a('0x1dc')][_0x258a('0x2b')](this);},Scene_Item['prototype']['categoryWindowRectItemsEquipsCore']=function(){const _0x4b0403=0x0,_0x7177a7=this[_0x258a('0x40e')](),_0x587476=Graphics['boxWidth'],_0x5de687=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x4b0403,_0x7177a7,_0x587476,_0x5de687);},VisuMZ[_0x258a('0xc5')][_0x258a('0x268')]=Scene_Item[_0x258a('0x19a')]['createItemWindow'],Scene_Item[_0x258a('0x19a')]['createItemWindow']=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x268')][_0x258a('0x2b')](this);if(this[_0x258a('0x2cc')]()){if(_0x258a('0x331')!==_0x258a('0x28e'))this[_0x258a('0x318')]();else{function _0x230d41(){return _0x4b4766['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x3b6')][_0x258a('0x3cf')];}}}this[_0x258a('0x430')]()&&this[_0x258a('0x2f8')]();},VisuMZ['ItemsEquipsCore'][_0x258a('0x85')]=Scene_Item[_0x258a('0x19a')][_0x258a('0x141')],Scene_Item['prototype'][_0x258a('0x141')]=function(){if(this[_0x258a('0x3eb')]())return this[_0x258a('0x3c1')]();else{if(_0x258a('0x17a')!==_0x258a('0xee')){const _0x14820a=VisuMZ[_0x258a('0xc5')][_0x258a('0x85')][_0x258a('0x2b')](this);if(this[_0x258a('0x430')]()&&this[_0x258a('0x195')]()){if(_0x258a('0x2ee')!==_0x258a('0x379'))_0x14820a[_0x258a('0x1c5')]-=this[_0x258a('0x2c1')]();else{function _0x249396(){if(_0x28b0f0[_0xbf49ca]===_0x2ae20a){_0x36156c=_0x5716d1;if(!_0x36eb77[_0x1a9e7f])return _0x232a46;}}}}return _0x14820a;}else{function _0x595b43(){return _0x3b5ffe['ItemsEquipsCore'][_0x258a('0x27f')]['ItemScene'][_0x258a('0x11d')];}}}},Scene_Item[_0x258a('0x19a')][_0x258a('0x3c1')]=function(){const _0x124b19=this['isRightInputMode']()?this[_0x258a('0x2c1')]():0x0,_0x4ad961=this[_0x258a('0x3d5')]['y']+this[_0x258a('0x3d5')][_0x258a('0x259')],_0x1f6c6f=Graphics[_0x258a('0x111')]-this[_0x258a('0x2c1')](),_0x3d4d35=this['mainAreaBottom']()-_0x4ad961;return new Rectangle(_0x124b19,_0x4ad961,_0x1f6c6f,_0x3d4d35);},Scene_Item[_0x258a('0x19a')][_0x258a('0x318')]=function(){this['_itemWindow'][_0x258a('0x1fa')](_0x258a('0x29c'),this[_0x258a('0xf8')][_0x258a('0x138')](this));},Scene_Item[_0x258a('0x19a')]['allowCreateStatusWindow']=function(){if(this[_0x258a('0x3eb')]()){if(_0x258a('0x107')===_0x258a('0x107'))return!![];else{function _0x589d23(){const _0x20d60c=_0x466afb['equipTypes'][_0x258a('0x160')](_0x1664ed['trim']());if(_0x20d60c>0x0)_0x531953[_0x258a('0x2ba')][_0x258a('0xc2')](_0x20d60c);}}}else return VisuMZ[_0x258a('0xc5')]['Settings'][_0x258a('0x357')]['ShowShopStatus'];},Scene_Item[_0x258a('0x19a')][_0x258a('0x195')]=function(){return VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')]['ItemScene'][_0x258a('0x241')];},Scene_Item[_0x258a('0x19a')]['createStatusWindow']=function(){const _0x45c1b5=this[_0x258a('0x207')]();this['_statusWindow']=new Window_ShopStatus(_0x45c1b5),this['addWindow'](this[_0x258a('0x1da')]),this[_0x258a('0xc0')][_0x258a('0x1e3')](this[_0x258a('0x1da')]);},Scene_Item[_0x258a('0x19a')][_0x258a('0x207')]=function(){if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x258a('0x326')===_0x258a('0x3f')){function _0x453d88(){const _0x195188=_0x52fc96(_0x468e10['$1'])['split'](/[\r\n]+/);for(const _0x470a86 of _0x195188){if(_0x470a86['match'](/(.*):[ ](.*)/i)){const _0x5e55bb=_0x2df3ef(_0x20f8f5['$1'])[_0x258a('0x13a')](),_0x5ae05f=_0x3a57f9(_0x50db49['$2'])[_0x258a('0x13a')]();this[_0x258a('0x1ce')](_0x5e55bb,_0x5ae05f,_0x518552,_0x15ba12,_0x3de101),_0x48b395+=this[_0x258a('0x394')]();}}}}else return this[_0x258a('0x30e')]();}else return VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x357')][_0x258a('0x43b')][_0x258a('0x2b')](this);},Scene_Item[_0x258a('0x19a')][_0x258a('0x30e')]=function(){const _0x56a569=this[_0x258a('0x2c1')](),_0x391fb0=this[_0x258a('0xc0')][_0x258a('0x259')],_0x1c2e8e=this[_0x258a('0x190')]()?0x0:Graphics[_0x258a('0x111')]-this[_0x258a('0x2c1')](),_0x29e3d2=this[_0x258a('0xc0')]['y'];return new Rectangle(_0x1c2e8e,_0x29e3d2,_0x56a569,_0x391fb0);},Scene_Item[_0x258a('0x19a')][_0x258a('0x2c1')]=function(){return Scene_Shop[_0x258a('0x19a')][_0x258a('0x2c1')]();},Scene_Item[_0x258a('0x19a')][_0x258a('0x1a3')]=function(){if(!this[_0x258a('0x419')]())return![];if(!this[_0x258a('0x2cc')]())return![];if(!this[_0x258a('0xc0')])return![];if(!this['_itemWindow'][_0x258a('0x1a7')])return![];return this[_0x258a('0x419')]()&&this[_0x258a('0x2cc')]();},Scene_Item[_0x258a('0x19a')][_0x258a('0xc4')]=function(){if(this['buttonAssistItemListRequirement']()){if(this[_0x258a('0xc0')][_0x258a('0x185')]()===0x1)return TextManager[_0x258a('0x41e')](_0x258a('0x89'),'right');else{if('wygOB'!==_0x258a('0x225'))return TextManager[_0x258a('0x41e')](_0x258a('0x307'),_0x258a('0x1ac'));else{function _0x5a07b0(){const _0x4d34ad=this[_0x258a('0xa3')]();this[_0x258a('0x2d5')](_0x4d34ad,_0x4a5aea,_0x5b05d9,_0x34df5f,!![]);const _0x241eae=this[_0x258a('0x400')]();return this[_0x258a('0x2d5')](_0x241eae,_0x342837,_0x2317be,_0x56b238,![],_0x258a('0x47')),this[_0x258a('0x3f5')](_0x2ce068,_0x549b82,_0x29c266),this[_0x258a('0x174')](),!![];}}}}return Scene_ItemBase[_0x258a('0x19a')][_0x258a('0xc4')][_0x258a('0x2b')](this);},Scene_Item['prototype'][_0x258a('0x9')]=function(){if(this['buttonAssistItemListRequirement']()){if(_0x258a('0x21')===_0x258a('0x21'))return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x357')][_0x258a('0x39c')];else{function _0x5bdaa1(){const _0x2e2488=_0x44092[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0xda')];return _0x2e2488[_0x258a('0x2c4')](_0x1827ec['mp']);}}}return Scene_ItemBase['prototype'][_0x258a('0x9')][_0x258a('0x2b')](this);},Scene_Equip[_0x258a('0x19a')][_0x258a('0x21a')]=function(){if(ConfigManager[_0x258a('0x30c')]&&ConfigManager[_0x258a('0x334')]!==undefined)return ConfigManager['uiHelpPosition'];else{if(this[_0x258a('0x3eb')]())return this[_0x258a('0x419')]()[_0x258a('0x22d')](/LOWER/i);else Scene_MenuBase[_0x258a('0x19a')][_0x258a('0x190')][_0x258a('0x2b')](this);}},Scene_Equip[_0x258a('0x19a')][_0x258a('0x190')]=function(){if(ConfigManager[_0x258a('0x30c')]&&ConfigManager[_0x258a('0x158')]!==undefined){if(_0x258a('0x414')==='KKJkb')return ConfigManager[_0x258a('0x158')];else{function _0x157ee1(){const _0x1fa6c5=this[_0x258a('0x16b')];if(_0x1fa6c5[_0x5493b0])return _0x1fa6c5[_0x1cdeb0];else{const _0x1452e2=new _0x1627b6();return _0x1fa6c5[_0x4a3689]=_0x1452e2,this[_0x258a('0x3c')](_0x1452e2),_0x1452e2;}}}}else{if(this[_0x258a('0x3eb')]()){if(_0x258a('0x1ef')!==_0x258a('0x2b2'))return this[_0x258a('0x419')]()[_0x258a('0x22d')](/RIGHT/i);else{function _0x5d1124(){if(!this[_0x258a('0x419')]())return![];if(!this['isUseModernControls']())return![];if(!this[_0x258a('0xc0')])return![];if(!this[_0x258a('0xc0')][_0x258a('0x1a7')])return![];return this[_0x258a('0x419')]()&&this[_0x258a('0x2cc')]();}}}else Scene_MenuBase[_0x258a('0x19a')][_0x258a('0x190')][_0x258a('0x2b')](this);}},Scene_Equip[_0x258a('0x19a')]['updatedLayoutStyle']=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')]['LayoutStyle'];},Scene_Equip['prototype'][_0x258a('0x2cc')]=function(){return this[_0x258a('0x234')]&&this[_0x258a('0x234')]['isUseModernControls']();},Scene_Equip[_0x258a('0x19a')][_0x258a('0x3eb')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['EquipScene'][_0x258a('0xca')];},VisuMZ[_0x258a('0xc5')][_0x258a('0x222')]=Scene_Equip[_0x258a('0x19a')]['create'],Scene_Equip['prototype'][_0x258a('0x41')]=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x222')]['call'](this),this[_0x258a('0x2cc')]()&&this['commandEquip']();},Scene_Equip['prototype'][_0x258a('0x21b')]=function(){if(this[_0x258a('0x3eb')]()){if(_0x258a('0x1ba')===_0x258a('0x1ba'))return this[_0x258a('0xe0')]();else{function _0x48aa58(){this[_0x258a('0x118')]=_0xd722a0,this[_0x258a('0x16')](),this[_0x258a('0x3d5')]&&this[_0x258a('0x3d5')][_0x258a('0x2cc')]()?this[_0x258a('0x283')](0x0):this['scrollTo'](0x0,0x0);}}}else return Scene_MenuBase[_0x258a('0x19a')][_0x258a('0x21b')][_0x258a('0x2b')](this);},Scene_Equip[_0x258a('0x19a')][_0x258a('0xe0')]=function(){const _0xfe567c=0x0,_0x244cc0=this[_0x258a('0x19b')](),_0x50ccc9=Graphics[_0x258a('0x111')],_0x51783e=this[_0x258a('0x369')]();return new Rectangle(_0xfe567c,_0x244cc0,_0x50ccc9,_0x51783e);},VisuMZ[_0x258a('0xc5')][_0x258a('0x84')]=Scene_Equip[_0x258a('0x19a')][_0x258a('0x207')],Scene_Equip['prototype'][_0x258a('0x207')]=function(){return this[_0x258a('0x3eb')]()?this[_0x258a('0x30e')]():VisuMZ[_0x258a('0xc5')][_0x258a('0x84')][_0x258a('0x2b')](this);},Scene_Equip[_0x258a('0x19a')][_0x258a('0x30e')]=function(){const _0x2cb8a2=this[_0x258a('0x190')]()?0x0:Graphics[_0x258a('0x111')]-this[_0x258a('0x2c1')](),_0x2cb365=this[_0x258a('0x40e')](),_0x574a61=this[_0x258a('0x2c1')](),_0x1a64c0=this[_0x258a('0x3c7')]();return new Rectangle(_0x2cb8a2,_0x2cb365,_0x574a61,_0x1a64c0);},VisuMZ[_0x258a('0xc5')]['Scene_Equip_commandWindowRect']=Scene_Equip[_0x258a('0x19a')][_0x258a('0x3f1')],Scene_Equip[_0x258a('0x19a')][_0x258a('0x3f1')]=function(){if(this[_0x258a('0x3eb')]()){if(_0x258a('0x135')===_0x258a('0x164')){function _0x518e68(){return _0x25f514[_0x258a('0x41e')](_0x258a('0x89'),_0x258a('0x47'));}}else return this[_0x258a('0x3c0')]();}else{if(_0x258a('0xb2')!==_0x258a('0xb2')){function _0x352324(){if(_0x1cfe01[_0x258a('0x30c')]&&_0x479289[_0x258a('0x158')]!==_0x26159c)return _0xd60625[_0x258a('0x158')];else{if(this[_0x258a('0x3eb')]())return this[_0x258a('0x419')]()[_0x258a('0x22d')](/RIGHT/i);else _0x3c5d2b[_0x258a('0x19a')][_0x258a('0x190')][_0x258a('0x2b')](this);}}}else return VisuMZ[_0x258a('0xc5')][_0x258a('0x3bf')]['call'](this);}},Scene_Equip['prototype'][_0x258a('0x3c0')]=function(){const _0x4fb147=this[_0x258a('0x190')]()?this['statusWidth']():0x0,_0x5de50e=this[_0x258a('0x40e')](),_0xdd0f59=Graphics[_0x258a('0x111')]-this['statusWidth'](),_0x3c6629=this[_0x258a('0x353')](0x1,!![]);return new Rectangle(_0x4fb147,_0x5de50e,_0xdd0f59,_0x3c6629);},VisuMZ[_0x258a('0xc5')][_0x258a('0x42a')]=Scene_Equip['prototype']['createSlotWindow'],Scene_Equip[_0x258a('0x19a')][_0x258a('0x113')]=function(){VisuMZ['ItemsEquipsCore'][_0x258a('0x42a')]['call'](this);if(this['isUseModernControls']()){if(_0x258a('0xe8')===_0x258a('0xe8'))this[_0x258a('0x263')]();else{function _0x45bbd5(){const _0x22402d=this[_0x258a('0x234')]['y'],_0x42a8c6=this[_0x258a('0x234')][_0x258a('0x1c5')],_0x32cf4b=this[_0x258a('0x353')](0x1,!![]),_0x263cb7=this[_0x258a('0x190')]()?_0x3e502f[_0x258a('0x111')]-_0x42a8c6:0x0;return new _0x14bc23(_0x263cb7,_0x22402d,_0x42a8c6,_0x32cf4b);}}}},VisuMZ[_0x258a('0xc5')][_0x258a('0x2f2')]=Scene_Equip[_0x258a('0x19a')]['slotWindowRect'],Scene_Equip[_0x258a('0x19a')][_0x258a('0x375')]=function(){if(this[_0x258a('0x3eb')]())return this[_0x258a('0x2f1')]();else{if('zxCZi'===_0x258a('0x12f'))return VisuMZ[_0x258a('0xc5')][_0x258a('0x2f2')][_0x258a('0x2b')](this);else{function _0x53ee43(){return this[_0x258a('0x3eb')]()?this['geUpdatedLayoutStatusWidth']():_0x472772['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0x157')];}}}},Scene_Equip[_0x258a('0x19a')]['slotWindowRectItemsEquipsCore']=function(){const _0x599724=this[_0x258a('0x3f1')](),_0x53dded=this['isRightInputMode']()?this['statusWidth']():0x0,_0x3961df=_0x599724['y']+_0x599724[_0x258a('0x259')],_0x2f6f30=Graphics[_0x258a('0x111')]-this[_0x258a('0x2c1')](),_0x372db9=this['mainAreaHeight']()-_0x599724[_0x258a('0x259')];return new Rectangle(_0x53dded,_0x3961df,_0x2f6f30,_0x372db9);},VisuMZ[_0x258a('0xc5')]['Scene_Equip_itemWindowRect']=Scene_Equip[_0x258a('0x19a')][_0x258a('0x141')],Scene_Equip[_0x258a('0x19a')]['itemWindowRect']=function(){if(this[_0x258a('0x3eb')]()){if('HIBFR'===_0x258a('0x383')){function _0x1deb18(){this['playCursorSound'](),_0x27108e[_0x258a('0x237')](),_0x3b20a3['_scene'][_0x258a('0xf6')]();}}else return this['slotWindowRect']();}else return VisuMZ[_0x258a('0xc5')][_0x258a('0x422')][_0x258a('0x2b')](this);},Scene_Equip['prototype']['statusWidth']=function(){if(this[_0x258a('0x3eb')]())return this[_0x258a('0x2c8')]();else{if(_0x258a('0x411')===_0x258a('0x32b')){function _0x14e790(){return;}}else return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0x157')];}},Scene_Equip[_0x258a('0x19a')]['geUpdatedLayoutStatusWidth']=function(){return Math[_0x258a('0x32')](Graphics[_0x258a('0x111')]/0x2);},Scene_Equip[_0x258a('0x19a')][_0x258a('0x263')]=function(){this[_0x258a('0x94')]['setHandler'](_0x258a('0x29c'),this[_0x258a('0xf8')][_0x258a('0x138')](this)),this[_0x258a('0x94')][_0x258a('0x1fa')](_0x258a('0x1ac'),this[_0x258a('0x18c')][_0x258a('0x138')](this)),this[_0x258a('0x94')][_0x258a('0x1fa')](_0x258a('0x307'),this[_0x258a('0xa2')]['bind'](this));},VisuMZ[_0x258a('0xc5')]['Scene_Equip_commandEquip']=Scene_Equip['prototype']['commandEquip'],Scene_Equip[_0x258a('0x19a')]['commandEquip']=function(){this[_0x258a('0x2cc')]()&&(this['_commandWindow'][_0x258a('0x20a')](),this[_0x258a('0x234')][_0x258a('0x2e5')]()),VisuMZ[_0x258a('0xc5')][_0x258a('0x2cb')][_0x258a('0x2b')](this);},VisuMZ[_0x258a('0xc5')][_0x258a('0x179')]=Scene_Equip['prototype'][_0x258a('0x35b')],Scene_Equip[_0x258a('0x19a')][_0x258a('0x35b')]=function(){if(this[_0x258a('0x94')][_0x258a('0xf9')]()>=0x0)VisuMZ[_0x258a('0xc5')][_0x258a('0x179')][_0x258a('0x2b')](this),this[_0x258a('0x1c4')]();else{if(_0x258a('0x27a')!=='RXZzs')this['_slotWindow'][_0x258a('0x283')](0x0),this[_0x258a('0x94')][_0x258a('0x6b')]();else{function _0x39169b(){return _0x232835[_0x258a('0x25b')][_0x258a('0x2c4')](_0x2e0ce6(_0x1e0bad['$1']));}}}},Scene_Equip[_0x258a('0x19a')][_0x258a('0x1c4')]=function(){const _0x968c1d=this['_slotWindow'][_0x258a('0x396')](),_0x261584=this[_0x258a('0xc0')]['_data'][_0x258a('0x160')](_0x968c1d),_0x5396a2=Math[_0x258a('0x32')](this['_itemWindow']['maxVisibleItems']()/0x2)-0x1;this[_0x258a('0xc0')][_0x258a('0x283')](_0x261584>=0x0?_0x261584:0x0),this[_0x258a('0xc0')][_0x258a('0x1a4')](this[_0x258a('0xc0')][_0x258a('0xf9')]()-_0x5396a2);},VisuMZ[_0x258a('0xc5')][_0x258a('0x12')]=Scene_Equip[_0x258a('0x19a')][_0x258a('0xf6')],Scene_Equip[_0x258a('0x19a')]['onSlotCancel']=function(){VisuMZ[_0x258a('0xc5')]['Scene_Equip_onSlotCancel']['call'](this),this[_0x258a('0x2cc')]()&&(this['_commandWindow'][_0x258a('0x283')](0x0),this[_0x258a('0x94')][_0x258a('0x2e5')]());},VisuMZ[_0x258a('0xc5')][_0x258a('0x109')]=Scene_Equip[_0x258a('0x19a')][_0x258a('0x2d4')],Scene_Equip['prototype']['onActorChange']=function(){VisuMZ[_0x258a('0xc5')]['Scene_Equip_onActorChange'][_0x258a('0x2b')](this),this[_0x258a('0x2cc')]()&&(this[_0x258a('0x234')][_0x258a('0x2e5')](),this[_0x258a('0x234')]['deselect'](),this[_0x258a('0x94')][_0x258a('0x283')](0x0),this[_0x258a('0x94')]['activate']());},Scene_Equip[_0x258a('0x19a')][_0x258a('0x43')]=function(){if(!this['_slotWindow'])return![];if(!this[_0x258a('0x94')][_0x258a('0x1a7')])return![];return this[_0x258a('0x94')][_0x258a('0x38e')]();},Scene_Equip[_0x258a('0x19a')][_0x258a('0x9f')]=function(){if(this[_0x258a('0x43')]())return TextManager[_0x258a('0x2a4')](_0x258a('0x335'));return Scene_MenuBase[_0x258a('0x19a')][_0x258a('0x9f')]['call'](this);},Scene_Equip['prototype'][_0x258a('0x119')]=function(){if(this[_0x258a('0x43')]())return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0x2e9')];return Scene_MenuBase['prototype'][_0x258a('0x119')][_0x258a('0x2b')](this);},Scene_Equip[_0x258a('0x19a')][_0x258a('0x32e')]=function(){if(this[_0x258a('0x43')]())return this[_0x258a('0xaf')][_0x258a('0x1c5')]/0x5/-0x3;return Scene_MenuBase[_0x258a('0x19a')][_0x258a('0x32e')][_0x258a('0x2b')](this);},VisuMZ[_0x258a('0xc5')][_0x258a('0x387')]=Scene_Load[_0x258a('0x19a')][_0x258a('0x3c5')],Scene_Load[_0x258a('0x19a')][_0x258a('0x3c5')]=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x387')][_0x258a('0x2b')](this),this[_0x258a('0x37d')]();},Scene_Load[_0x258a('0x19a')][_0x258a('0x37d')]=function(){if($gameSystem[_0x258a('0x143')]()!==$dataSystem['versionId'])for(const _0x5c7d06 of $gameActors[_0x258a('0x156')]){if('nnCVP'===_0x258a('0x376')){function _0x5ef408(){return _0x305d8c[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x3b6')][_0x258a('0xdc')];}}else{if(_0x5c7d06)_0x5c7d06[_0x258a('0x1f1')]();}}},Scene_Shop[_0x258a('0x19a')][_0x258a('0x21a')]=function(){if(ConfigManager[_0x258a('0x30c')]&&ConfigManager[_0x258a('0x334')]!==undefined){if(_0x258a('0x3d2')!=='FgWSV')return ConfigManager[_0x258a('0x334')];else{function _0x3bc6e3(){const _0x45fae0=this[_0x258a('0x190')]()?this[_0x258a('0x2c1')]():0x0,_0x49a1ca=this[_0x258a('0x40e')](),_0x209710=_0x4d230b[_0x258a('0x111')]-this[_0x258a('0x2c1')](),_0xf8f0ba=this[_0x258a('0x353')](0x1,!![]);return new _0x3bdb05(_0x45fae0,_0x49a1ca,_0x209710,_0xf8f0ba);}}}else{if(this[_0x258a('0x3eb')]())return this[_0x258a('0x419')]()[_0x258a('0x22d')](/LOWER/i);else Scene_MenuBase[_0x258a('0x19a')][_0x258a('0x190')]['call'](this);}},Scene_Shop[_0x258a('0x19a')][_0x258a('0x190')]=function(){if(ConfigManager[_0x258a('0x30c')]&&ConfigManager['uiInputPosition']!==undefined){if(_0x258a('0x3e0')!==_0x258a('0x3e0')){function _0x2b8cb5(){return _0x360984[_0x258a('0x2d2')][_0x258a('0x27f')]['Param']['ExtDisplayedParams'];}}else return ConfigManager['uiInputPosition'];}else{if(this[_0x258a('0x3eb')]())return this[_0x258a('0x419')]()[_0x258a('0x22d')](/RIGHT/i);else Scene_MenuBase[_0x258a('0x19a')][_0x258a('0x190')]['call'](this);}},Scene_Shop[_0x258a('0x19a')]['updatedLayoutStyle']=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x3b6')][_0x258a('0x1c7')];},Scene_Shop[_0x258a('0x19a')][_0x258a('0x2cc')]=function(){return this['_categoryWindow']&&this['_categoryWindow'][_0x258a('0x2cc')]();},Scene_Shop[_0x258a('0x19a')][_0x258a('0x3eb')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x3b6')][_0x258a('0xca')];},VisuMZ['ItemsEquipsCore'][_0x258a('0x24')]=Scene_Shop[_0x258a('0x19a')]['prepare'],Scene_Shop[_0x258a('0x19a')][_0x258a('0x21e')]=function(_0x3bd8f6,_0x21f8e0){_0x3bd8f6=JsonEx['makeDeepCopy'](_0x3bd8f6),VisuMZ[_0x258a('0xc5')][_0x258a('0x24')]['call'](this,_0x3bd8f6,_0x21f8e0),this[_0x258a('0x28f')]();},Scene_Shop[_0x258a('0x19a')]['adjustHiddenShownGoods']=function(){this[_0x258a('0x221')]=0x0;for(const _0x5e2b30 of this[_0x258a('0x1e1')]){if(this[_0x258a('0x33')](_0x5e2b30)){if(_0x258a('0x1c9')===_0x258a('0x1c9'))this[_0x258a('0x221')]++;else{function _0x380fb3(){this[_0x258a('0x15b')]();}}}else _0x5e2b30[0x0]=-0x1;}},Scene_Shop[_0x258a('0x19a')][_0x258a('0x33')]=function(_0x44b17c){if(_0x44b17c[0x0]>0x2||_0x44b17c[0x0]<0x0)return![];const _0x4c7aa5=[$dataItems,$dataWeapons,$dataArmors][_0x44b17c[0x0]][_0x44b17c[0x1]];if(!_0x4c7aa5)return![];const _0x21935b=_0x4c7aa5[_0x258a('0x133')]||'';if(_0x21935b[_0x258a('0x22d')](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x258a('0x181')!=='xjIoT'){function _0x3a4935(){this['select'](_0x2d3d6c);}}else{const _0x3028ec=JSON[_0x258a('0x3d9')]('['+RegExp['$1'][_0x258a('0x22d')](/\d+/g)+']');for(const _0x420814 of _0x3028ec){if(!$gameSwitches['value'](_0x420814))return![];}return!![];}}if(_0x21935b['match'](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x258a('0x20d')!==_0x258a('0x34f')){const _0x2485f4=JSON[_0x258a('0x3d9')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5a8908 of _0x2485f4){if(_0x258a('0x232')!==_0x258a('0x11c')){if(!$gameSwitches['value'](_0x5a8908))return![];}else{function _0x4653f0(){this[_0x258a('0x1f4')](),this[_0x258a('0x264')](),this[_0x258a('0xd1')]();}}}return!![];}else{function _0x19e355(){const _0x546af8=_0x360e89['max'](_0x26b68b(_0x1443cf),0x0)/_0x4bab2f['a'][_0x258a('0x5a')];return this[_0x258a('0x2fa')](),_0x18f96e(_0x546af8)?_0x258a('0x279'):_0x258a('0x385')[_0x258a('0x2c4')](_0x3d9329[_0x258a('0x6e')](_0x546af8*0x64));}}}if(_0x21935b[_0x258a('0x22d')](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4faa4e=JSON[_0x258a('0x3d9')]('['+RegExp['$1'][_0x258a('0x22d')](/\d+/g)+']');for(const _0x29912b of _0x4faa4e){if($gameSwitches[_0x258a('0x24e')](_0x29912b))return!![];}return![];}if(_0x21935b[_0x258a('0x22d')](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x258a('0x2e2')===_0x258a('0x3d1')){function _0x559937(){return _0x3c1b98[_0x258a('0x5c')]&&_0x655c4f[_0x258a('0x19a')][_0x258a('0x2cc')]['call'](this);}}else{const _0x47207b=JSON['parse']('['+RegExp['$1'][_0x258a('0x22d')](/\d+/g)+']');for(const _0x245021 of _0x47207b){if(!$gameSwitches[_0x258a('0x24e')](_0x245021))return!![];}return![];}}if(_0x21935b['match'](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x49ae2a=JSON['parse']('['+RegExp['$1'][_0x258a('0x22d')](/\d+/g)+']');for(const _0x2823d0 of _0x49ae2a){if('ejfWg'!==_0x258a('0x217')){function _0x46db2b(){!this[_0x258a('0xa6')](_0x258a('0x1ac'))&&_0x26a64a[_0x258a('0x144')](_0x258a('0x1ac'))&&this[_0x258a('0x15a')](),!this[_0x258a('0xa6')]('pageup')&&_0x31e9b5[_0x258a('0x144')](_0x258a('0x307'))&&this['cursorPageup']();}}else{if(!$gameSwitches[_0x258a('0x24e')](_0x2823d0))return!![];}}return![];}if(_0x21935b['match'](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2cb933=JSON[_0x258a('0x3d9')]('['+RegExp['$1'][_0x258a('0x22d')](/\d+/g)+']');for(const _0x5189e9 of _0x2cb933){if(_0x258a('0x116')!==_0x258a('0x1f2')){if($gameSwitches['value'](_0x5189e9))return![];}else{function _0x4b5a4c(){_0x3c2251['ItemsEquipsCore'][_0x258a('0x82')]['call'](this,_0x5cad2d),this[_0x258a('0x104')](_0x1bcdd5);}}}return!![];}return!![];},VisuMZ['ItemsEquipsCore'][_0x258a('0x5')]=Scene_Shop[_0x258a('0x19a')][_0x258a('0x41')],Scene_Shop[_0x258a('0x19a')][_0x258a('0x41')]=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x5')][_0x258a('0x2b')](this),this[_0x258a('0x3eb')]()&&this[_0x258a('0x72')]();},Scene_Shop[_0x258a('0x19a')][_0x258a('0x72')]=function(){this[_0x258a('0x34d')][_0x258a('0x5b')](),this[_0x258a('0x26c')][_0x258a('0x19c')](),this[_0x258a('0x26c')]['deselect'](),this[_0x258a('0x1da')]['show']();},Scene_Shop['prototype'][_0x258a('0x21b')]=function(){if(this[_0x258a('0x3eb')]()){if(_0x258a('0x0')!=='MSyxv')return this[_0x258a('0xe0')]();else{function _0x429d71(){return![];}}}else{if(_0x258a('0x3b2')!==_0x258a('0x3b2')){function _0x235e36(){const _0x5c9ddf=_0x25b30b(_0x259fc4['$1']),_0x200206=_0x258a('0x1d8')[_0x258a('0x2c4')](_0x5c9ddf);_0x1b05b1['ItemsEquipsCore'][_0x258a('0xd3')][_0x24a271['id']]=new _0x3f03e2(_0x258a('0x396'),_0x200206);}}else return Scene_MenuBase[_0x258a('0x19a')][_0x258a('0x21b')][_0x258a('0x2b')](this);}},Scene_Shop[_0x258a('0x19a')][_0x258a('0xe0')]=function(){const _0x20b4f6=0x0,_0x2d2803=this[_0x258a('0x19b')](),_0x1cee5b=Graphics[_0x258a('0x111')],_0x48166e=this[_0x258a('0x369')]();return new Rectangle(_0x20b4f6,_0x2d2803,_0x1cee5b,_0x48166e);},VisuMZ['ItemsEquipsCore'][_0x258a('0x1ed')]=Scene_Shop[_0x258a('0x19a')][_0x258a('0xeb')],Scene_Shop['prototype'][_0x258a('0xeb')]=function(){return this[_0x258a('0x3eb')]()?this[_0x258a('0xec')]():VisuMZ['ItemsEquipsCore'][_0x258a('0x1ed')][_0x258a('0x2b')](this);},Scene_Shop[_0x258a('0x19a')]['goldWindowRectItemsEquipsCore']=function(){const _0x7e7e8b=this[_0x258a('0x29b')](),_0x1062c9=this[_0x258a('0x353')](0x1,!![]),_0x4bc73d=this['isRightInputMode']()?0x0:Graphics[_0x258a('0x111')]-_0x7e7e8b,_0x4f1029=this[_0x258a('0x40e')]();return new Rectangle(_0x4bc73d,_0x4f1029,_0x7e7e8b,_0x1062c9);},VisuMZ[_0x258a('0xc5')][_0x258a('0x226')]=Scene_Shop[_0x258a('0x19a')][_0x258a('0x3f1')],Scene_Shop[_0x258a('0x19a')][_0x258a('0x3f1')]=function(){if(this[_0x258a('0x3eb')]())return this[_0x258a('0x3c0')]();else{if('zsXfr'!==_0x258a('0x12d'))return VisuMZ[_0x258a('0xc5')][_0x258a('0x226')][_0x258a('0x2b')](this);else{function _0x2b848c(){_0x143597[_0x258a('0x271')]('right')&&this[_0x258a('0x40b')](_0x11a2c9[_0x258a('0x144')](_0x258a('0x47'))),_0x4559ff[_0x258a('0x271')](_0x258a('0x89'))&&this['cursorLeft'](_0x3e208a[_0x258a('0x144')](_0x258a('0x89')));}}}},Scene_Shop[_0x258a('0x19a')]['commandWindowRectItemsEquipsCore']=function(){const _0x2ac692=this[_0x258a('0x190')]()?this['mainCommandWidth']():0x0,_0x3c7c8c=this['mainAreaTop'](),_0x2bc29a=Graphics['boxWidth']-this[_0x258a('0x29b')](),_0x2ec6b1=this[_0x258a('0x353')](0x1,!![]);return new Rectangle(_0x2ac692,_0x3c7c8c,_0x2bc29a,_0x2ec6b1);},VisuMZ[_0x258a('0xc5')]['Scene_Shop_numberWindowRect']=Scene_Shop['prototype'][_0x258a('0x3dd')],Scene_Shop[_0x258a('0x19a')][_0x258a('0x3dd')]=function(){if(this[_0x258a('0x3eb')]())return this['numberWindowRectItemsEquipsCore']();else{if(_0x258a('0xa4')===_0x258a('0xa4'))return VisuMZ[_0x258a('0xc5')][_0x258a('0x1bd')][_0x258a('0x2b')](this);else{function _0x45fb0c(){return![];}}}},Scene_Shop[_0x258a('0x19a')][_0x258a('0x356')]=function(){const _0x4a2bd4=this['_commandWindow']['y']+this['_commandWindow'][_0x258a('0x259')],_0xeb8d68=Graphics['boxWidth']-this['statusWidth'](),_0x4fe564=this['isRightInputMode']()?Graphics[_0x258a('0x111')]-_0xeb8d68:0x0,_0x268969=this[_0x258a('0x3c7')]()-this[_0x258a('0x234')][_0x258a('0x259')];return new Rectangle(_0x4fe564,_0x4a2bd4,_0xeb8d68,_0x268969);},VisuMZ[_0x258a('0xc5')][_0x258a('0x252')]=Scene_Shop[_0x258a('0x19a')][_0x258a('0x207')],Scene_Shop[_0x258a('0x19a')]['statusWindowRect']=function(){if(this[_0x258a('0x3eb')]()){if('dxKEt'===_0x258a('0x1db'))return this[_0x258a('0x30e')]();else{function _0x432551(){_0x18fe09[_0x258a('0xd')](_0x258a('0x335'))?this[_0x258a('0x3ec')]():this['cursorUp'](_0x8bae8[_0x258a('0x144')]('up'));}}}else return VisuMZ[_0x258a('0xc5')][_0x258a('0x252')][_0x258a('0x2b')](this);},Scene_Shop['prototype'][_0x258a('0x30e')]=function(){const _0x1c74d5=this['statusWidth'](),_0x4482b6=this[_0x258a('0x3c7')]()-this['_commandWindow'][_0x258a('0x259')],_0x3a79f6=this[_0x258a('0x190')]()?0x0:Graphics['boxWidth']-_0x1c74d5,_0x2bcb17=this[_0x258a('0x234')]['y']+this[_0x258a('0x234')][_0x258a('0x259')];return new Rectangle(_0x3a79f6,_0x2bcb17,_0x1c74d5,_0x4482b6);},VisuMZ['ItemsEquipsCore'][_0x258a('0xa')]=Scene_Shop[_0x258a('0x19a')][_0x258a('0x272')],Scene_Shop[_0x258a('0x19a')][_0x258a('0x272')]=function(){if(this[_0x258a('0x3eb')]()){if(_0x258a('0x2d')!==_0x258a('0x8'))return this[_0x258a('0x3b7')]();else{function _0x2ee0c5(){return _0x5913ed[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0x157')];}}}else{if(_0x258a('0x55')===_0x258a('0x1e6')){function _0xd607c1(){this[_0x258a('0x33c')](_0x4e10c1);}}else return VisuMZ[_0x258a('0xc5')][_0x258a('0xa')][_0x258a('0x2b')](this);}},Scene_Shop[_0x258a('0x19a')][_0x258a('0x3b7')]=function(){const _0x566a8f=this[_0x258a('0x234')]['y']+this[_0x258a('0x234')]['height'],_0x2930e7=Graphics['boxWidth']-this[_0x258a('0x2c1')](),_0x587249=this[_0x258a('0x3c7')]()-this[_0x258a('0x234')][_0x258a('0x259')],_0x57327f=this[_0x258a('0x190')]()?Graphics['boxWidth']-_0x2930e7:0x0;return new Rectangle(_0x57327f,_0x566a8f,_0x2930e7,_0x587249);},VisuMZ[_0x258a('0xc5')][_0x258a('0x137')]=Scene_Shop[_0x258a('0x19a')][_0x258a('0x9d')],Scene_Shop[_0x258a('0x19a')][_0x258a('0x9d')]=function(){VisuMZ['ItemsEquipsCore'][_0x258a('0x137')][_0x258a('0x2b')](this),this['isUseModernControls']()&&this[_0x258a('0x15b')]();},VisuMZ[_0x258a('0xc5')][_0x258a('0x166')]=Scene_Shop[_0x258a('0x19a')][_0x258a('0x148')],Scene_Shop[_0x258a('0x19a')][_0x258a('0x148')]=function(){if(this['isUseItemsEquipsCoreUpdatedLayout']()){if('HPghh'===_0x258a('0x38f')){function _0x26c3d5(){_0x12acfd[_0x258a('0x1c5')]-=this[_0x258a('0x2c1')]();}}else return this['categoryWindowRectItemsEquipsCore']();}else{if(_0x258a('0x324')!==_0x258a('0x360'))return VisuMZ[_0x258a('0xc5')][_0x258a('0x166')]['call'](this);else{function _0x236387(){this[_0x258a('0x15a')]();}}}},Scene_Shop[_0x258a('0x19a')][_0x258a('0xfd')]=function(){const _0x1ab7e8=this[_0x258a('0x234')]['y'],_0x4fcec3=this[_0x258a('0x234')][_0x258a('0x1c5')],_0x599ff1=this[_0x258a('0x353')](0x1,!![]),_0x163f24=this['isRightInputMode']()?Graphics[_0x258a('0x111')]-_0x4fcec3:0x0;return new Rectangle(_0x163f24,_0x1ab7e8,_0x4fcec3,_0x599ff1);},Scene_Shop[_0x258a('0x19a')][_0x258a('0x15b')]=function(){delete this['_categoryWindow'][_0x258a('0x168')]['ok'],delete this[_0x258a('0x3d5')]['_handlers'][_0x258a('0x29c')];},VisuMZ['ItemsEquipsCore'][_0x258a('0x2d1')]=Scene_Shop[_0x258a('0x19a')][_0x258a('0x1eb')],Scene_Shop[_0x258a('0x19a')]['createSellWindow']=function(){VisuMZ[_0x258a('0xc5')]['Scene_Shop_createSellWindow']['call'](this);if(this[_0x258a('0x3eb')]()){if(_0x258a('0x159')!==_0x258a('0x159')){function _0x234ca6(){this[_0x258a('0x28c')]();}}else this[_0x258a('0x101')]();}},VisuMZ[_0x258a('0xc5')][_0x258a('0x432')]=Scene_Shop[_0x258a('0x19a')][_0x258a('0x17')],Scene_Shop['prototype'][_0x258a('0x17')]=function(){return this[_0x258a('0x3eb')]()?this[_0x258a('0x219')]():VisuMZ['ItemsEquipsCore'][_0x258a('0x432')][_0x258a('0x2b')](this);},Scene_Shop[_0x258a('0x19a')][_0x258a('0x219')]=function(){const _0x49f7c8=this[_0x258a('0x3d5')]['y']+this[_0x258a('0x3d5')][_0x258a('0x259')],_0xb766ab=Graphics[_0x258a('0x111')]-this[_0x258a('0x2c1')](),_0x15195d=this[_0x258a('0x3c7')]()-this[_0x258a('0x3d5')]['height'],_0xd9cc09=this[_0x258a('0x190')]()?Graphics['boxWidth']-_0xb766ab:0x0;return new Rectangle(_0xd9cc09,_0x49f7c8,_0xb766ab,_0x15195d);},Scene_Shop[_0x258a('0x19a')]['postCreateSellWindowItemsEquipsCore']=function(){this[_0x258a('0x3bd')][_0x258a('0x1e3')](this['_statusWindow']);},Scene_Shop[_0x258a('0x19a')][_0x258a('0x2c1')]=function(){return VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x196')];},VisuMZ['ItemsEquipsCore'][_0x258a('0x90')]=Scene_Shop[_0x258a('0x19a')]['activateSellWindow'],Scene_Shop[_0x258a('0x19a')][_0x258a('0xfb')]=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x90')][_0x258a('0x2b')](this);if(this[_0x258a('0x3eb')]()){if(_0x258a('0x14c')!==_0x258a('0x1b6'))this[_0x258a('0x1da')][_0x258a('0x19c')]();else{function _0xf8f464(){if(!_0x7d00b4[_0x258a('0x24e')](_0x58f86a))return!![];}}}},VisuMZ[_0x258a('0xc5')][_0x258a('0xd5')]=Scene_Shop[_0x258a('0x19a')][_0x258a('0x1cf')],Scene_Shop[_0x258a('0x19a')][_0x258a('0x1cf')]=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0xd5')][_0x258a('0x2b')](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x258a('0x301')]();},Scene_Shop[_0x258a('0x19a')][_0x258a('0x301')]=function(){this[_0x258a('0x202')]=this[_0x258a('0x202')]||0x0,this[_0x258a('0x26c')][_0x258a('0x283')](this['_buyWindowLastIndex']);},VisuMZ[_0x258a('0xc5')][_0x258a('0x14f')]=Scene_Shop['prototype'][_0x258a('0x1f9')],Scene_Shop[_0x258a('0x19a')][_0x258a('0x1f9')]=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x14f')][_0x258a('0x2b')](this);if(this[_0x258a('0x3eb')]()){if(_0x258a('0x2dd')===_0x258a('0xd6')){function _0x49119d(){return _0x3a1b95[_0x258a('0x7d')]&&_0x45e52a['description'][_0x258a('0x3e4')]('['+_0x7beb51+']');}}else this['commandSellItemsEquipsCore']();}if(this[_0x258a('0x2cc')]()){if(_0x258a('0x3a')===_0x258a('0x286')){function _0x5f410d(){_0x2b852b=this[_0x258a('0x91')][_0x258a('0x224')](_0x4ec1ab);}}else this[_0x258a('0x3d5')][_0x258a('0x283')](0x0),this[_0x258a('0x404')]();}},Scene_Shop[_0x258a('0x19a')][_0x258a('0x27c')]=function(){this[_0x258a('0x26c')]['hide'](),this[_0x258a('0x234')]['hide']();},VisuMZ[_0x258a('0xc5')][_0x258a('0xd2')]=Scene_Shop[_0x258a('0x19a')][_0x258a('0x1b9')],Scene_Shop[_0x258a('0x19a')][_0x258a('0x1b9')]=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0xd2')]['call'](this);if(this[_0x258a('0x3eb')]()){if('aSWBT'!=='iSjsT')this[_0x258a('0xc6')]();else{function _0x34d00e(){return _0xdc6f1[_0x258a('0xc5')][_0x258a('0x422')][_0x258a('0x2b')](this);}}}},Scene_Shop[_0x258a('0x19a')][_0x258a('0xc6')]=function(){this[_0x258a('0x202')]=this[_0x258a('0x26c')][_0x258a('0xf9')](),this['_buyWindow'][_0x258a('0x19c')](),this[_0x258a('0x26c')][_0x258a('0x20a')](),this[_0x258a('0x26c')]['smoothScrollTo'](0x0,0x0),this[_0x258a('0x1da')]['show'](),this[_0x258a('0x34d')][_0x258a('0x5b')]();},VisuMZ[_0x258a('0xc5')][_0x258a('0x395')]=Scene_Shop['prototype']['onCategoryCancel'],Scene_Shop[_0x258a('0x19a')][_0x258a('0x2b4')]=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x395')][_0x258a('0x2b')](this),this[_0x258a('0x3eb')]()&&this[_0x258a('0x391')]();},Scene_Shop[_0x258a('0x19a')][_0x258a('0x391')]=function(){this[_0x258a('0x26c')]['show'](),this['_commandWindow'][_0x258a('0x19c')]();},VisuMZ[_0x258a('0xc5')]['Scene_Shop_onSellOk']=Scene_Shop[_0x258a('0x19a')]['onSellOk'],Scene_Shop[_0x258a('0x19a')]['onSellOk']=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x33d')][_0x258a('0x2b')](this);if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x258a('0x11a')===_0x258a('0x11a'))this[_0x258a('0x20')]();else{function _0x77e219(){const _0x2d0319=_0x2b5086['prototype'][_0x258a('0x355')](-0x1,_0x356991);if(_0x2d0319>0x0){_0x1a93e9+=_0x258a('0x24a')[_0x258a('0x2c4')](_0x2d0319),_0xacfcb1++;if(_0x23c47c>=_0x1d706c)return _0x485562;}}}}},Scene_Shop[_0x258a('0x19a')][_0x258a('0x20')]=function(){this[_0x258a('0x3d5')][_0x258a('0x19c')]();},VisuMZ[_0x258a('0xc5')][_0x258a('0x227')]=Scene_Shop[_0x258a('0x19a')][_0x258a('0x319')],Scene_Shop[_0x258a('0x19a')][_0x258a('0x319')]=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x227')][_0x258a('0x2b')](this);if(this[_0x258a('0x2cc')]()){if('FBqyb'!==_0x258a('0x97'))this[_0x258a('0x2b4')]();else{function _0x38e564(){this['onBuyCancelItemsEquipsCore']();}}}},VisuMZ[_0x258a('0xc5')][_0x258a('0x337')]=Scene_Shop[_0x258a('0x19a')][_0x258a('0x42d')],Scene_Shop[_0x258a('0x19a')][_0x258a('0x42d')]=function(){let _0x5ab6ea=this[_0x258a('0x121')]();const _0x433ffd=this[_0x258a('0xb')];return _0x5ab6ea=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['ShopScene'][_0x258a('0x112')][_0x258a('0x2b')](this,_0x433ffd,_0x5ab6ea),_0x5ab6ea;},Scene_Shop['prototype'][_0x258a('0x121')]=function(){if(!this[_0x258a('0xb')])return 0x0;else{if(this[_0x258a('0xb')][_0x258a('0x133')][_0x258a('0x22d')](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){if('TChVC'!==_0x258a('0x32f')){function _0x49fb18(){return _0xc71560[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x3ce')];}}else{const _0x2d31c8=String(RegExp['$1']);let _0x5152e8=this[_0x258a('0xb')],_0x2fb1e2=_0x5152e8[_0x258a('0x4d')]*this[_0x258a('0x303')]();try{if(_0x258a('0x278')===_0x258a('0x278'))eval(_0x2d31c8);else{function _0x50b615(){const _0x2e4dd2=this[_0x258a('0x266')](),_0x431858=_0x4b80c4[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x3b6')][_0x258a('0xaa')],_0x354731=_0x2fd5c2['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x3b6')]['CmdCancelRename'],_0x859cad=_0x2e4dd2===_0x258a('0x1a5')?_0x354731:_0x258a('0x1c3')[_0x258a('0x2c4')](_0x431858,_0x354731);this[_0x258a('0x131')](_0x859cad,_0x258a('0x29c'));}}}catch(_0x3a6d64){if($gameTemp['isPlaytest']())console[_0x258a('0xae')](_0x3a6d64);}if(isNaN(_0x2fb1e2))_0x2fb1e2=0x0;return Math[_0x258a('0x32')](_0x2fb1e2);}}else{if(this[_0x258a('0xb')]['note'][_0x258a('0x22d')](/<SELL PRICE:[ ](\d+)>/i)){if(_0x258a('0xf3')!==_0x258a('0x23f'))return parseInt(RegExp['$1']);else{function _0x3f78fd(){return this[_0x258a('0x1a7')]&&_0x3d15d1[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0x13d')];}}}else return Math[_0x258a('0x32')](this[_0x258a('0xb')][_0x258a('0x4d')]*this[_0x258a('0x303')]());}}},Scene_Shop[_0x258a('0x19a')][_0x258a('0x303')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x3b6')]['SellPriceRate'];},Scene_Shop[_0x258a('0x19a')][_0x258a('0x1a3')]=function(){if(!this[_0x258a('0x419')]())return![];if(!this[_0x258a('0x2cc')]())return![];if(!this['_sellWindow'])return![];if(!this[_0x258a('0x3bd')][_0x258a('0x1a7')])return![];return this['updatedLayoutStyle']()&&this[_0x258a('0x2cc')]();},Scene_Shop[_0x258a('0x19a')][_0x258a('0xc4')]=function(){if(this[_0x258a('0x1a3')]()){if(this[_0x258a('0x3bd')][_0x258a('0x185')]()===0x1){if(_0x258a('0x2d0')==='pQrBa'){function _0x18dec4(){const _0x573454=this[_0x258a('0x190')]()?this[_0x258a('0x29b')]():0x0,_0x2e26f5=this[_0x258a('0x40e')](),_0x4a27c6=_0x97f342[_0x258a('0x111')]-this[_0x258a('0x29b')](),_0x43f6f=this['calcWindowHeight'](0x1,!![]);return new _0x13f847(_0x573454,_0x2e26f5,_0x4a27c6,_0x43f6f);}}else return TextManager[_0x258a('0x41e')](_0x258a('0x89'),_0x258a('0x47'));}else{if(_0x258a('0x5f')===_0x258a('0x5f'))return TextManager[_0x258a('0x41e')](_0x258a('0x307'),_0x258a('0x1ac'));else{function _0x54e125(){this[_0x258a('0x200')](_0xf49275);}}}}else{if(this[_0x258a('0x405')]&&this[_0x258a('0x405')][_0x258a('0x1a7')]){if(_0x258a('0x15f')!==_0x258a('0x15f')){function _0x25875a(){const _0x5d5b69=this[_0x258a('0x296')];_0x5d5b69[_0x258a('0xef')](_0xd48482,0x0,_0x252283['y'],_0x5d5b69[_0x258a('0x11e')],_0x258a('0x161'));}}else return TextManager[_0x258a('0x41e')](_0x258a('0x89'),_0x258a('0x47'));}}return Scene_MenuBase[_0x258a('0x19a')][_0x258a('0xc4')][_0x258a('0x2b')](this);},Scene_Shop[_0x258a('0x19a')][_0x258a('0x212')]=function(){if(this[_0x258a('0x405')]&&this['_numberWindow']['active']){if(_0x258a('0x1bf')!=='UiUrl'){function _0x5c052b(){this[_0x258a('0x390')](_0x500757)[_0x258a('0x22d')](/\\I\[(\d+)\]/i);const _0x54719b=_0x1299e1(_0x3124b6['$1'])||0x0,_0x560ba0=this[_0x258a('0x280')](_0x28a978),_0x5a539=_0x560ba0['x']+_0x1df772[_0x258a('0x32')]((_0x560ba0[_0x258a('0x1c5')]-_0x52932f[_0x258a('0x3f6')])/0x2),_0xd53193=_0x560ba0['y']+(_0x560ba0[_0x258a('0x259')]-_0x4313bc[_0x258a('0x11')])/0x2;this[_0x258a('0x3b0')](_0x54719b,_0x5a539,_0xd53193);}}else return TextManager[_0x258a('0x41e')]('up',_0x258a('0x2de'));}return Scene_MenuBase[_0x258a('0x19a')][_0x258a('0x212')][_0x258a('0x2b')](this);},Scene_Shop[_0x258a('0x19a')][_0x258a('0x9')]=function(){if(this[_0x258a('0x1a3')]())return VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x357')][_0x258a('0x39c')];else{if(this[_0x258a('0x405')]&&this[_0x258a('0x405')]['active'])return VisuMZ[_0x258a('0xc5')]['Settings'][_0x258a('0x3b6')][_0x258a('0xab')];}return Scene_MenuBase[_0x258a('0x19a')]['buttonAssistText1'][_0x258a('0x2b')](this);},Scene_Shop[_0x258a('0x19a')][_0x258a('0x67')]=function(){if(this['_numberWindow']&&this[_0x258a('0x405')][_0x258a('0x1a7')])return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x3b6')][_0x258a('0xdc')];return Scene_MenuBase['prototype']['buttonAssistText2'][_0x258a('0x2b')](this);};function Sprite_NewLabel(){this[_0x258a('0x1fd')](...arguments);}Sprite_NewLabel[_0x258a('0x19a')]=Object[_0x258a('0x41')](Sprite[_0x258a('0x19a')]),Sprite_NewLabel[_0x258a('0x19a')]['constructor']=Sprite_NewLabel,Sprite_NewLabel['prototype'][_0x258a('0x1fd')]=function(){Sprite[_0x258a('0x19a')][_0x258a('0x1fd')]['call'](this),this[_0x258a('0x2bf')]();},Sprite_NewLabel[_0x258a('0x19a')][_0x258a('0x2bf')]=function(){const _0xdf36cc=ImageManager[_0x258a('0x3f6')],_0x28ddcb=ImageManager[_0x258a('0x11')];this[_0x258a('0x3d7')]=new Bitmap(_0xdf36cc,_0x28ddcb),this[_0x258a('0x16a')](),this[_0x258a('0x12b')]();},Sprite_NewLabel[_0x258a('0x19a')]['drawNewLabelIcon']=function(){const _0x3a872d=VisuMZ[_0x258a('0xc5')]['Settings']['New'][_0x258a('0x3a1')];if(_0x3a872d<=0x0)return;const _0x32ba2d=ImageManager['loadSystem'](_0x258a('0x1f6')),_0x4b4ed9=ImageManager[_0x258a('0x3f6')],_0x344000=ImageManager['iconHeight'],_0x32b97a=_0x3a872d%0x10*_0x4b4ed9,_0x384767=Math['floor'](_0x3a872d/0x10)*_0x344000;this[_0x258a('0x3d7')][_0x258a('0x315')](_0x32ba2d,_0x32b97a,_0x384767,_0x4b4ed9,_0x344000,0x0,0x0);},Sprite_NewLabel[_0x258a('0x19a')][_0x258a('0x12b')]=function(){const _0x46f6fb=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['New'][_0x258a('0x204')];if(_0x46f6fb==='')return;const _0x5eee29=ImageManager[_0x258a('0x3f6')],_0x142174=ImageManager[_0x258a('0x11')];this[_0x258a('0x3d7')][_0x258a('0x96')]=this['getTextColor'](),this['bitmap'][_0x258a('0x436')]=VisuMZ[_0x258a('0xc5')]['Settings'][_0x258a('0x322')][_0x258a('0x4c')],this[_0x258a('0x3d7')][_0x258a('0xef')](_0x46f6fb,0x0,_0x142174/0x2,_0x5eee29,_0x142174/0x2,'center');},Sprite_NewLabel[_0x258a('0x19a')][_0x258a('0x2d6')]=function(){const _0x455a11=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['New']['FontColor'];return _0x455a11[_0x258a('0x22d')](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager['textColor'](_0x455a11);},Window_Base[_0x258a('0x19a')][_0x258a('0x254')]=function(_0x4758e2,_0x123300,_0x3d2c34,_0x32047b){if(_0x4758e2){if('AmemF'===_0x258a('0x304')){function _0x2dbf94(){return _0x15449e[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x357')][_0x258a('0xb5')];}}else{const _0x1ced99=_0x3d2c34+(this[_0x258a('0x394')]()-ImageManager['iconHeight'])/0x2,_0x56529a=ImageManager[_0x258a('0x3f6')]+0x4,_0x5193f9=Math[_0x258a('0x103')](0x0,_0x32047b-_0x56529a);this[_0x258a('0x3ed')](ColorManager[_0x258a('0x110')](_0x4758e2)),this[_0x258a('0x3b0')](_0x4758e2['iconIndex'],_0x123300,_0x1ced99),this['drawText'](_0x4758e2[_0x258a('0x145')],_0x123300+_0x56529a,_0x3d2c34,_0x5193f9),this[_0x258a('0x52')]();}}},Window_Base['prototype']['drawItemNumber']=function(_0x5bf7cb,_0xc0a3f0,_0x3b58c8,_0x2e05c5){if(this['isDrawItemNumber'](_0x5bf7cb)){this[_0x258a('0x174')]();const _0x27b436=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['ItemScene'],_0x6542c5=_0x27b436[_0x258a('0x80')],_0x37bf91=_0x6542c5['format']($gameParty[_0x258a('0x41f')](_0x5bf7cb));this[_0x258a('0x393')][_0x258a('0x436')]=_0x27b436[_0x258a('0x188')],this['drawText'](_0x37bf91,_0xc0a3f0,_0x3b58c8,_0x2e05c5,_0x258a('0x47')),this[_0x258a('0x174')]();}},Window_Base[_0x258a('0x19a')][_0x258a('0x36a')]=function(_0x1e888a){if(DataManager[_0x258a('0x28b')](_0x1e888a))return $dataSystem[_0x258a('0x16d')];return!![];},Window_Base[_0x258a('0x19a')]['drawItemDarkRect']=function(_0x4d9e85,_0x28389b,_0x5d44f2,_0x1adf40,_0x36201f){_0x36201f=Math[_0x258a('0x103')](_0x36201f||0x1,0x1);while(_0x36201f--){if(_0x258a('0x2e6')!==_0x258a('0x407')){_0x1adf40=_0x1adf40||this[_0x258a('0x394')](),this[_0x258a('0x317')]['paintOpacity']=0xa0;const _0x373082=ColorManager[_0x258a('0x1cd')]();this[_0x258a('0x317')][_0x258a('0x277')](_0x4d9e85+0x1,_0x28389b+0x1,_0x5d44f2-0x2,_0x1adf40-0x2,_0x373082),this[_0x258a('0x317')]['paintOpacity']=0xff;}else{function _0x562ec9(){const _0x938a5d=_0xb015f[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x78')];return _0x938a5d[_0x258a('0x2c4')](_0x219796['tp']);}}}},VisuMZ[_0x258a('0xc5')][_0x258a('0x2c5')]=Window_Selectable[_0x258a('0x19a')][_0x258a('0x1fd')],Window_Selectable[_0x258a('0x19a')][_0x258a('0x1fd')]=function(_0x34884f){this[_0x258a('0x2c2')](),VisuMZ[_0x258a('0xc5')][_0x258a('0x2c5')]['call'](this,_0x34884f);},Window_Selectable[_0x258a('0x19a')][_0x258a('0x2c2')]=function(){this[_0x258a('0x16b')]={},this[_0x258a('0x418')]=0xff,this[_0x258a('0x1d7')]=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x322')][_0x258a('0x3ba')],this[_0x258a('0x330')]=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x322')][_0x258a('0x3af')];},Window_Selectable[_0x258a('0x19a')][_0x258a('0xdb')]=function(){return![];},VisuMZ['ItemsEquipsCore']['Window_Selectable_setHelpWindowItem']=Window_Selectable[_0x258a('0x19a')]['setHelpWindowItem'],Window_Selectable[_0x258a('0x19a')][_0x258a('0x235')]=function(_0x5be9a1){VisuMZ['ItemsEquipsCore'][_0x258a('0x2b9')][_0x258a('0x2b')](this,_0x5be9a1);if(this[_0x258a('0xdb')]())this[_0x258a('0x1b0')](_0x5be9a1);},Window_Selectable[_0x258a('0x19a')][_0x258a('0x1b0')]=function(_0x1f24d7){if(!_0x1f24d7)return;$gameParty[_0x258a('0xe6')](_0x1f24d7);let _0x4df08c='';if(DataManager[_0x258a('0x3df')](_0x1f24d7))_0x4df08c=_0x258a('0xbd')[_0x258a('0x2c4')](_0x1f24d7['id']);else{if(DataManager['isWeapon'](_0x1f24d7))_0x4df08c=_0x258a('0x300')[_0x258a('0x2c4')](_0x1f24d7['id']);else{if(DataManager[_0x258a('0x36d')](_0x1f24d7))_0x4df08c=_0x258a('0x8f')[_0x258a('0x2c4')](_0x1f24d7['id']);else{if(_0x258a('0x25')===_0x258a('0x382')){function _0x54f634(){if(!this[_0x258a('0x45')]())return;const _0x361ae8=this['commandStyle'](),_0x5074d5=_0x3d571f[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0x282')],_0xe71824=_0x361ae8===_0x258a('0x1a5')?_0x7e2025[_0x258a('0x86')]:'\x5cI[%1]%2'[_0x258a('0x2c4')](_0x5074d5,_0x111a1a[_0x258a('0x86')]),_0x484d64=this[_0x258a('0x3dc')]();this[_0x258a('0x131')](_0xe71824,_0x258a('0x79'),_0x484d64);}}else return;}}}const _0x57154b=this[_0x258a('0x16b')][_0x4df08c];if(_0x57154b)_0x57154b[_0x258a('0x5b')]();},VisuMZ[_0x258a('0xc5')]['Window_Selectable_refresh']=Window_Selectable['prototype'][_0x258a('0x16')],Window_Selectable['prototype'][_0x258a('0x16')]=function(){this['hideNewLabelSprites'](),VisuMZ[_0x258a('0xc5')][_0x258a('0x1ea')][_0x258a('0x2b')](this);},Window_Selectable['prototype'][_0x258a('0x29')]=function(){for(const _0xa814b of Object[_0x258a('0xa5')](this[_0x258a('0x16b')])){if(_0x258a('0x18f')===_0x258a('0x18f'))_0xa814b[_0x258a('0x5b')]();else{function _0x42989e(){return _0x40ce83[_0x258a('0x5c')]?_0xc1627f[_0x258a('0x2d2')][_0x258a('0x27f')][_0x258a('0xcd')][_0x258a('0x15e')]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}}}},VisuMZ['ItemsEquipsCore'][_0x258a('0x346')]=Window_Selectable[_0x258a('0x19a')]['update'],Window_Selectable[_0x258a('0x19a')]['update']=function(){this[_0x258a('0x2c0')](),VisuMZ[_0x258a('0xc5')]['Window_Selectable_update'][_0x258a('0x2b')](this);},Window_Selectable[_0x258a('0x19a')][_0x258a('0x2c0')]=function(){if(!this[_0x258a('0xdb')]())return;const _0x324e38=this['_newLabelOpacityUpperLimit'];this['_newLabelOpacity']+=this[_0x258a('0x1d7')];(this[_0x258a('0x418')]>=_0x324e38||this['_newLabelOpacity']<=0x0)&&(this[_0x258a('0x1d7')]*=-0x1);this['_newLabelOpacity']=this['_newLabelOpacity']['clamp'](0x0,_0x324e38);for(const _0xb3b5b9 of Object[_0x258a('0xa5')](this[_0x258a('0x16b')])){_0xb3b5b9['opacity']=this[_0x258a('0x418')];}},Window_Selectable[_0x258a('0x19a')]['createNewLabelSprite']=function(_0x260334){const _0x30348f=this['_newLabelSprites'];if(_0x30348f[_0x260334])return _0x30348f[_0x260334];else{if(_0x258a('0x397')!==_0x258a('0x397')){function _0x390a18(){return this['statusWindowRectItemsEquipsCore']();}}else{const _0x27e29e=new Sprite_NewLabel();return _0x30348f[_0x260334]=_0x27e29e,this[_0x258a('0x3c')](_0x27e29e),_0x27e29e;}}},Window_Selectable[_0x258a('0x19a')]['placeNewLabel']=function(_0x17eb45,_0x1d7c65,_0x4f6fa5){let _0x153f38='';if(DataManager['isItem'](_0x17eb45)){if(_0x258a('0x288')!==_0x258a('0x205'))_0x153f38=_0x258a('0xbd')[_0x258a('0x2c4')](_0x17eb45['id']);else{function _0xd33c9f(){return _0xd0de3a[_0x258a('0x32')](this[_0x258a('0xb')][_0x258a('0x4d')]*this[_0x258a('0x303')]());}}}else{if(DataManager[_0x258a('0x3f7')](_0x17eb45)){if('BIiNp'===_0x258a('0x3e7')){function _0xe9d8b1(){if(!this[_0x258a('0x2cc')]())_0x1d31bb[_0x258a('0x19a')][_0x258a('0x31c')]['call'](this);}}else _0x153f38=_0x258a('0x300')['format'](_0x17eb45['id']);}else{if(DataManager[_0x258a('0x36d')](_0x17eb45))_0x153f38=_0x258a('0x8f')[_0x258a('0x2c4')](_0x17eb45['id']);else{if('ulpng'===_0x258a('0x23b')){function _0x272db1(){const _0xa1e184=_0x7bfd0a['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x27b')],_0x30a370=_0x258a('0x36c')[_0x258a('0x2c4')](this[_0x258a('0xb')][_0x258a('0xf')]['type']),_0x4d9565=[null,_0x2f60c8['hp'],_0x4cab7e['mp'],_0x5bbe2f['hp'],_0x1090b6['mp'],_0x51b327['hp'],_0x2553d0['mp']][this[_0x258a('0xb')][_0x258a('0xf')][_0x258a('0x15d')]];return _0xa1e184[_0x30a370][_0x258a('0x2c4')](_0x4d9565);}}else return;}}}const _0x597890=this[_0x258a('0x15c')](_0x153f38);_0x597890[_0x258a('0x311')](_0x1d7c65,_0x4f6fa5),_0x597890[_0x258a('0x19c')](),_0x597890[_0x258a('0x117')]=this[_0x258a('0x418')];},Window_ItemCategory[_0x258a('0x6d')]=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x39a')][_0x258a('0x3f0')],Window_ItemCategory[_0x258a('0x41a')]=[_0x258a('0xc7'),'HiddenItemA',_0x258a('0x201'),_0x258a('0x295'),_0x258a('0x372'),_0x258a('0x342'),'BattleUsable',_0x258a('0x28'),_0x258a('0x3e2')],VisuMZ[_0x258a('0xc5')][_0x258a('0xf7')]=Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x1fd')],Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x1fd')]=function(_0x5b5afc){VisuMZ['ItemsEquipsCore'][_0x258a('0xf7')][_0x258a('0x2b')](this,_0x5b5afc),this[_0x258a('0x310')](_0x5b5afc);},Window_ItemCategory[_0x258a('0x19a')]['createCategoryNameWindow']=function(_0x3e3a42){const _0x3a8bdf=new Rectangle(0x0,0x0,_0x3e3a42['width'],_0x3e3a42[_0x258a('0x259')]);this['_categoryNameWindow']=new Window_Base(_0x3a8bdf),this[_0x258a('0x354')][_0x258a('0x117')]=0x0,this[_0x258a('0x38b')](this[_0x258a('0x354')]),this[_0x258a('0x25f')]();},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x2cc')]=function(){return Imported[_0x258a('0x5c')]&&Window_HorzCommand['prototype']['isUseModernControls'][_0x258a('0x2b')](this);},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x31c')]=function(){if(!this[_0x258a('0x2cc')]())Window_HorzCommand[_0x258a('0x19a')]['playOkSound'][_0x258a('0x2b')](this);},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x185')]=function(){return this[_0x258a('0x1af')]?this[_0x258a('0xcc')]():0x4;},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x2d7')]=function(){Window_HorzCommand[_0x258a('0x19a')]['update'][_0x258a('0x2b')](this),this[_0x258a('0xc0')]&&this['_itemWindow'][_0x258a('0x2c6')](this[_0x258a('0xdf')]());},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x218')]=function(){if(this[_0x258a('0x248')]()){const _0x187306=this['index']();if(this[_0x258a('0xc0')]&&this[_0x258a('0xc0')]['maxCols']()<=0x1){if('pppEA'===_0x258a('0x8b')){if(Input[_0x258a('0x271')]('right')){if(_0x258a('0xa1')==='XVzgd'){function _0x2c55e1(){const _0x45707f=this[_0x258a('0x22c')](_0x4f9e73);if(_0x45707f===_0x258a('0x403'))this[_0x258a('0x33c')](_0x3a2fe2);else _0x45707f===_0x258a('0x54')?this[_0x258a('0x1e8')](_0x2cd272):_0x5545c8['prototype'][_0x258a('0x3a5')][_0x258a('0x2b')](this,_0x5eadee);}}else this[_0x258a('0x40b')](Input['isTriggered'](_0x258a('0x47')));}if(Input[_0x258a('0x271')](_0x258a('0x89'))){if(_0x258a('0x64')!==_0x258a('0x18'))this[_0x258a('0x65')](Input[_0x258a('0x144')](_0x258a('0x89')));else{function _0x4caa4e(){const _0x25d88e=_0x258a('0x247');if(this['_customItemInfo'][_0x25d88e])return this[_0x258a('0x312')][_0x25d88e];let _0x1e196d='';return this[_0x258a('0xbe')][_0x258a('0x191')]>0x0?_0x1e196d+=_0x258a('0x34a')[_0x258a('0x2c4')](this[_0x258a('0xbe')][_0x258a('0x191')]):_0x1e196d+='%1'[_0x258a('0x2c4')](this[_0x258a('0xbe')][_0x258a('0x191')]),_0x1e196d;}}}}else{function _0x20008e(){const _0x26ac2e=0x0,_0x314776=this[_0x258a('0x40e')](),_0x5bc998=_0xed410d[_0x258a('0x111')],_0x4214b6=this[_0x258a('0x353')](0x1,!![]);return new _0x210670(_0x26ac2e,_0x314776,_0x5bc998,_0x4214b6);}}}else{if(this[_0x258a('0xc0')]&&this[_0x258a('0xc0')]['maxCols']()>0x1){if(Input[_0x258a('0x271')]('pagedown')&&!Input[_0x258a('0xd')](_0x258a('0x335'))){if(_0x258a('0x12a')===_0x258a('0x12a'))this[_0x258a('0x40b')](Input[_0x258a('0x144')](_0x258a('0x1ac')));else{function _0x439034(){_0x109877['note'][_0x258a('0x22d')](/<PRICE:[ ](\d+)>/i)&&(_0x443725['price']=_0x3543ae(_0x5a4104['$1']));}}}if(Input['isRepeated']('pageup')&&!Input[_0x258a('0xd')](_0x258a('0x335'))){if(_0x258a('0xb8')!==_0x258a('0xb8')){function _0x9cce5(){const _0x123ab4=_0x530c28[_0x258a('0x133')];if(_0x123ab4[_0x258a('0x22d')](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0xed3d82=_0x1120df(_0x39e0d4['$1']);try{_0x203197(_0xed3d82);}catch(_0x502234){if(_0x24d61f['isPlaytest']())_0x17c166['log'](_0x502234);}}_0x164e0d=_0xceb761[_0x258a('0xc5')][_0x258a('0x27f')]['ShopScene'][_0x258a('0x1d5')][_0x258a('0x2b')](this,_0x50a647,_0x474976);if(_0x2ed7e0(_0xbc6a29))_0x4037a5=0x0;return _0x46c108[_0x258a('0x32')](_0x34fe6f);}}else this[_0x258a('0x65')](Input[_0x258a('0x144')](_0x258a('0x307')));}}}this[_0x258a('0xf9')]()!==_0x187306&&this[_0x258a('0x40f')]();}},Window_ItemCategory[_0x258a('0x19a')]['processHandling']=function(){if(this[_0x258a('0x2cc')]())return;Window_HorzCommand[_0x258a('0x19a')][_0x258a('0x267')][_0x258a('0x2b')](this);},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x122')]=function(){if(this[_0x258a('0x2cc')]())return![];else{if(_0x258a('0x2fd')!=='qPJuS'){function _0x4ff0dc(){return this[_0x258a('0xaf')][_0x258a('0x1c5')]/0x5/-0x3;}}else return Window_HorzCommand[_0x258a('0x19a')][_0x258a('0x122')][_0x258a('0x2b')](this);}},Window_ItemCategory['prototype'][_0x258a('0x261')]=function(){if(this['isOpenAndActive']()){if(_0x258a('0x16c')!==_0x258a('0x37a')){TouchInput[_0x258a('0x144')]()&&this[_0x258a('0xe9')](!![]);if(TouchInput[_0x258a('0x199')]())this[_0x258a('0x28c')]();else{if(TouchInput['isCancelled']()){if('OcMXQ'!==_0x258a('0x416')){function _0x1f7be3(){return _0x4a3888===null&&this[_0x258a('0x192')]()[_0x258a('0x3e4')](this[_0x258a('0x22e')]())?this[_0x258a('0x156')][_0x258a('0x2a7')]>0x0?![]:!![]:_0x3218a6[_0x258a('0xc5')][_0x258a('0x41c')]['call'](this,_0x370a1b);}}else this[_0x258a('0x36e')]();}}}else{function _0x5da4db(){return this[_0x258a('0x3eb')]()?this[_0x258a('0xe0')]():_0x58252c[_0x258a('0x19a')][_0x258a('0x21b')][_0x258a('0x2b')](this);}}}},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0xe9')]=function(_0x414daf){this[_0x258a('0x2cc')]()?this[_0x258a('0x231')](!![]):Window_HorzCommand[_0x258a('0x19a')]['onTouchSelect'][_0x258a('0x2b')](this,_0x414daf);},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x231')]=function(_0x4ce939){this['_doubleTouch']=![];if(this[_0x258a('0x248')]()){if('sOJpc'===_0x258a('0x380')){const _0x24959d=this[_0x258a('0xf9')](),_0x5b59ac=this[_0x258a('0x1aa')]();if(_0x5b59ac>=0x0&&_0x5b59ac!==this['index']()){if(_0x258a('0x2bc')!=='dXCDm'){function _0xe83f80(){return _0x4e35ba[_0x258a('0xc5')][_0x258a('0x1ed')][_0x258a('0x2b')](this);}}else this[_0x258a('0x115')](_0x5b59ac);}_0x4ce939&&this['index']()!==_0x24959d&&this['playCursorSound']();}else{function _0x1fbd41(){this[_0x258a('0x3bd')][_0x258a('0x1e3')](this[_0x258a('0x1da')]);}}}},Window_ItemCategory[_0x258a('0x19a')]['makeCommandList']=function(){for(const _0x1c525b of Window_ItemCategory[_0x258a('0x6d')]){this[_0x258a('0x3ad')](_0x1c525b);}this[_0x258a('0x115')](this['index']());},Window_ItemCategory['prototype'][_0x258a('0x3ad')]=function(_0x3b4e9d){const _0x38d83e=_0x3b4e9d[_0x258a('0x2ef')],_0x46bf4b=_0x3b4e9d[_0x258a('0x3a1')];let _0x278627='',_0x1c9cf6=_0x258a('0x3aa'),_0x50898c=_0x38d83e;if(_0x38d83e['match'](/Category:(.*)/i))_0x278627=String(RegExp['$1'])[_0x258a('0x13a')]();else{if(Window_ItemCategory[_0x258a('0x41a')][_0x258a('0x3e4')](_0x38d83e)){if(_0x258a('0x37c')!==_0x258a('0x37c')){function _0x9800a6(){return _0x1b80b2[_0x258a('0xc5')]['Settings']['EquipScene']['LayoutStyle'];}}else _0x278627=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x39a')][_0x38d83e];}else{if(['AllItems',_0x258a('0xb9')][_0x258a('0x3e4')](_0x38d83e))_0x278627=TextManager[_0x258a('0x396')];else{if(_0x38d83e===_0x258a('0x193')){if(_0x258a('0x100')!==_0x258a('0x16e'))_0x278627=TextManager['keyItem'];else{function _0x13e1a8(){const _0x462e01=_0x3b6f9e['loadPicture'](_0x51fefb[_0x258a('0x1a1')]()),_0x1c8960=this['innerWidth']-_0x462e01[_0x258a('0x1c5')];_0x253e7b+=_0x1c8960/0x2;if(_0x1c8960<0x0)_0x4b37a9-=_0x1c8960;_0x3f0dd6[_0x258a('0x19a')]['drawItemActorMenuImage']['call'](this,_0x25ee44,_0x5e9866,_0x3f31d0,_0x32f8ad,_0x42e14d);}}}else{if(_0x38d83e===_0x258a('0x2f9'))_0x278627=TextManager[_0x258a('0x388')];else{if(_0x38d83e==='AllArmors')_0x278627=TextManager[_0x258a('0x31f')];else{if(_0x38d83e[_0x258a('0x22d')](/WTYPE:(\d+)/i))_0x278627=$dataSystem[_0x258a('0x1e')][Number(RegExp['$1'])]||'';else{if(_0x38d83e[_0x258a('0x22d')](/ATYPE:(\d+)/i))_0x278627=$dataSystem[_0x258a('0x167')][Number(RegExp['$1'])]||'';else{if(_0x38d83e[_0x258a('0x22d')](/ETYPE:(\d+)/i)){if('SrbjN'===_0x258a('0x3b3'))_0x278627=$dataSystem[_0x258a('0x399')][Number(RegExp['$1'])]||'';else{function _0x3b0451(){const _0x222413=_0x3a9ca7[_0x258a('0x3d9')]('['+_0x3cd38c['$1'][_0x258a('0x22d')](/\d+/g)+']');for(const _0x1bb344 of _0x222413){if(!_0x34809e['value'](_0x1bb344))return![];}return!![];}}}}}}}}}}}_0x46bf4b>0x0&&this['categoryStyle']()!==_0x258a('0x1a5')&&(_0x278627='\x5cI[%1]%2'[_0x258a('0x2c4')](_0x46bf4b,_0x278627)),this['addCommand'](_0x278627,_0x1c9cf6,!![],_0x50898c);},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x21d')]=function(){return VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x39a')][_0x258a('0x1b3')];},Window_ItemCategory['prototype']['drawItem']=function(_0xa92791){const _0x468678=this[_0x258a('0x22c')](_0xa92791);if(_0x468678===_0x258a('0x403')){if(_0x258a('0x4')===_0x258a('0x4'))this[_0x258a('0x33c')](_0xa92791);else{function _0x59da88(){return this[_0x258a('0x3d5')]&&this[_0x258a('0x3d5')][_0x258a('0x2cc')]();}}}else _0x468678===_0x258a('0x54')?this[_0x258a('0x1e8')](_0xa92791):Window_HorzCommand[_0x258a('0x19a')][_0x258a('0x3a5')][_0x258a('0x2b')](this,_0xa92791);},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x361')]=function(){return VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x39a')][_0x258a('0x292')];},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x22c')]=function(_0x3057ec){if(_0x3057ec<0x0)return _0x258a('0x1a5');const _0x492adf=this['categoryStyle']();if(_0x492adf!==_0x258a('0x214'))return _0x492adf;else{const _0x128aa1=this[_0x258a('0x390')](_0x3057ec);if(_0x128aa1['match'](/\\I\[(\d+)\]/i)){if('ubbnN'!=='PmhMt'){const _0x5f0f94=this[_0x258a('0x280')](_0x3057ec),_0x1bfcc0=this[_0x258a('0x2b3')](_0x128aa1)[_0x258a('0x1c5')];if(_0x1bfcc0<=_0x5f0f94[_0x258a('0x1c5')]){if(_0x258a('0x3f4')!==_0x258a('0x3f4')){function _0x14a7ae(){_0x1b6451[_0x258a('0xc5')][_0x258a('0x1ad')][_0x258a('0x2b')](this,_0x3d74f8,_0x182f3a);}}else return _0x258a('0x403');}else{if(_0x258a('0x29d')!==_0x258a('0x37f'))return _0x258a('0x54');else{function _0x26d4dd(){const _0x17ed84=_0x5854c9[_0x258a('0x33e')];this[_0x258a('0x2d5')](_0x17ed84,_0xbe37a0,_0xacc8a3,_0x337983,!![]);const _0x3e41b6=this[_0x258a('0x57')]();this[_0x258a('0x2d5')](_0x3e41b6,_0x1100b1,_0x1823e7,_0x3a1f50,![],_0x258a('0x47'));}}}}else{function _0x37dd86(){_0x17990b[_0x258a('0x215')]();const _0xebb7d0=_0x3f954f[_0x258a('0x180')][_0x258a('0x91')];_0xebb7d0[_0x258a('0x170')](this['index'](),null),this[_0x258a('0x16')](),this[_0x258a('0xc0')]['refresh']();}}}else{if(_0x258a('0x27d')===_0x258a('0xc')){function _0x2efcd2(){const _0x42103b=_0xcda971[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x132')];return _0x42103b[_0x258a('0x2c4')](_0xb34b5b['hp']);}}else return _0x258a('0x1a5');}}},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x33c')]=function(_0x1e2306){const _0x4c2889=this[_0x258a('0x280')](_0x1e2306),_0x5770cc=this['commandName'](_0x1e2306),_0x356047=this[_0x258a('0x2b3')](_0x5770cc)[_0x258a('0x1c5')];this[_0x258a('0x426')](this[_0x258a('0x32d')](_0x1e2306));const _0x18534e=this[_0x258a('0x21d')]();if(_0x18534e==='right')this[_0x258a('0x4b')](_0x5770cc,_0x4c2889['x']+_0x4c2889[_0x258a('0x1c5')]-_0x356047,_0x4c2889['y'],_0x356047);else{if(_0x18534e==='center'){const _0x12ebe5=_0x4c2889['x']+Math['floor']((_0x4c2889[_0x258a('0x1c5')]-_0x356047)/0x2);this[_0x258a('0x4b')](_0x5770cc,_0x12ebe5,_0x4c2889['y'],_0x356047);}else this[_0x258a('0x4b')](_0x5770cc,_0x4c2889['x'],_0x4c2889['y'],_0x356047);}},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x1e8')]=function(_0x2b15cf){this[_0x258a('0x390')](_0x2b15cf)[_0x258a('0x22d')](/\\I\[(\d+)\]/i);const _0x419d09=Number(RegExp['$1'])||0x0,_0xa4a784=this[_0x258a('0x280')](_0x2b15cf),_0x2218e4=_0xa4a784['x']+Math[_0x258a('0x32')]((_0xa4a784[_0x258a('0x1c5')]-ImageManager[_0x258a('0x3f6')])/0x2),_0x476320=_0xa4a784['y']+(_0xa4a784[_0x258a('0x259')]-ImageManager[_0x258a('0x11')])/0x2;this[_0x258a('0x3b0')](_0x419d09,_0x2218e4,_0x476320);},VisuMZ[_0x258a('0xc5')]['Window_ItemCategory_setItemWindow']=Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x1f3')],Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x1f3')]=function(_0x4a5679){VisuMZ[_0x258a('0xc5')][_0x258a('0x270')][_0x258a('0x2b')](this,_0x4a5679),_0x4a5679[_0x258a('0x3d5')]=this;},Window_ItemCategory[_0x258a('0x19a')]['callUpdateHelp']=function(){Window_HorzCommand[_0x258a('0x19a')][_0x258a('0x327')][_0x258a('0x2b')](this);if(this[_0x258a('0x354')])this[_0x258a('0x25f')]();},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x25f')]=function(){const _0x25e593=this[_0x258a('0x354')];_0x25e593[_0x258a('0x393')]['clear']();const _0x1ed456=this[_0x258a('0x22c')](this[_0x258a('0xf9')]());if(_0x1ed456===_0x258a('0x54')){const _0x33cdef=this['itemLineRect'](this[_0x258a('0xf9')]());let _0x3d2996=this[_0x258a('0x390')](this[_0x258a('0xf9')]());_0x3d2996=_0x3d2996[_0x258a('0x1')](/\\I\[(\d+)\]/gi,''),_0x25e593[_0x258a('0x174')](),this[_0x258a('0x291')](_0x3d2996,_0x33cdef),this[_0x258a('0x3ae')](_0x3d2996,_0x33cdef),this['categoryNameWindowCenter'](_0x3d2996,_0x33cdef);}},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x291')]=function(_0x5f47c8,_0x12c92d){},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x3ae')]=function(_0x2094b8,_0x2c1a15){const _0x43f338=this[_0x258a('0x354')];_0x43f338[_0x258a('0xef')](_0x2094b8,0x0,_0x2c1a15['y'],_0x43f338[_0x258a('0x11e')],_0x258a('0x161'));},Window_ItemCategory[_0x258a('0x19a')][_0x258a('0x22f')]=function(_0x6a72ce,_0x5b89d1){const _0x53155=this['_categoryNameWindow'],_0x175437=$gameSystem[_0x258a('0x433')](),_0x593b68=_0x5b89d1['x']+Math['floor'](_0x5b89d1[_0x258a('0x1c5')]/0x2)+_0x175437;_0x53155['x']=_0x53155[_0x258a('0x1c5')]/-0x2+_0x593b68,_0x53155['y']=Math[_0x258a('0x32')](_0x5b89d1[_0x258a('0x259')]/0x2);},Window_ItemList[_0x258a('0x19a')][_0x258a('0x218')]=function(){if(this[_0x258a('0x248')]()){const _0x4c92d9=this[_0x258a('0xf9')]();if(this[_0x258a('0x185')]()<=0x1)!this[_0x258a('0xa6')]('pagedown')&&Input[_0x258a('0x144')](_0x258a('0x1ac'))&&this[_0x258a('0x15a')](),!this[_0x258a('0xa6')](_0x258a('0x307'))&&Input[_0x258a('0x144')](_0x258a('0x307'))&&this[_0x258a('0x3ec')]();else{if(this['maxCols']()>0x1){Input[_0x258a('0x271')](_0x258a('0x47'))&&this[_0x258a('0x40b')](Input[_0x258a('0x144')]('right'));if(Input[_0x258a('0x271')](_0x258a('0x89'))){if('CzwJE'===_0x258a('0x92'))this[_0x258a('0x65')](Input[_0x258a('0x144')](_0x258a('0x89')));else{function _0x417ff2(){this['cursorPagedown']();}}}if(this[_0x258a('0x51')]()){if('VkDGZ'!=='tQlUN')Input[_0x258a('0x144')](_0x258a('0x1ac'))&&Input[_0x258a('0xd')]('shift')&&this[_0x258a('0x15a')](),Input[_0x258a('0x144')](_0x258a('0x307'))&&Input[_0x258a('0xd')](_0x258a('0x335'))&&this[_0x258a('0x3ec')]();else{function _0xa6bb8d(){_0x4e7b10[_0x258a('0xc5')][_0x258a('0x395')][_0x258a('0x2b')](this),this[_0x258a('0x3eb')]()&&this['onCategoryCancelItemsEquipsCore']();}}}else Input[_0x258a('0x144')](_0x258a('0x1ac'))&&this['cursorPagedown'](),Input[_0x258a('0x144')](_0x258a('0x307'))&&this[_0x258a('0x3ec')]();}}if(Input['isRepeated'](_0x258a('0x2de'))){if(_0x258a('0x389')===_0x258a('0xcf')){function _0x12b5ca(){this[_0x258a('0x352')](!![]);}}else Input[_0x258a('0xd')](_0x258a('0x335'))?this[_0x258a('0x15a')]():this[_0x258a('0x187')](Input[_0x258a('0x144')](_0x258a('0x2de')));}if(Input[_0x258a('0x271')]('up')){if(Input['isPressed']('shift'))this[_0x258a('0x3ec')]();else{if(_0x258a('0x2fc')===_0x258a('0x428')){function _0x29655a(){_0x5f31ce[_0x258a('0x19a')][_0x258a('0x190')]['call'](this);}}else this[_0x258a('0x24f')](Input[_0x258a('0x144')]('up'));}}Imported[_0x258a('0x5c')]&&this[_0x258a('0x276')](),this[_0x258a('0xf9')]()!==_0x4c92d9&&this['playCursorSound']();}},Window_ItemList[_0x258a('0x19a')][_0x258a('0x51')]=function(){const _0x134cc6=SceneManager[_0x258a('0x180')],_0xcd7b62=[Scene_Item,Scene_Shop];return _0xcd7b62[_0x258a('0x3e4')](_0x134cc6[_0x258a('0xe1')]);},Window_ItemList[_0x258a('0x19a')][_0x258a('0x6b')]=function(){Window_Selectable[_0x258a('0x19a')][_0x258a('0x6b')][_0x258a('0x2b')](this);if(this['_categoryWindow']&&this[_0x258a('0x3d5')][_0x258a('0x2cc')]()){if('Fmtgb'!==_0x258a('0x2f3')){function _0x55493b(){if(this[_0x258a('0x2ff')])return;if(!_0x2fd4ff[_0x258a('0xc5')][_0x258a('0x27f')]['EquipScene'][_0x258a('0x140')])return;const _0x29a621=_0x2fbf52[_0x258a('0x6e')](_0x4a55db[_0x258a('0x1cc')]()*this['mhp']),_0x45e72d=_0x43169c['round'](_0x3bd391[_0x258a('0x40d')]()*this['mmp']);if(this['hp']>0x0)this[_0x258a('0x2ed')](_0x29a621);if(this['mp']>0x0)this['setMp'](_0x45e72d);}}else this[_0x258a('0x3d5')][_0x258a('0x6b')]();}},Window_ItemList[_0x258a('0x19a')][_0x258a('0x2e5')]=function(){Window_Selectable[_0x258a('0x19a')][_0x258a('0x2e5')][_0x258a('0x2b')](this);if(this[_0x258a('0x3d5')]&&this[_0x258a('0x3d5')][_0x258a('0x2cc')]()){if(_0x258a('0x3c2')===_0x258a('0x3c2'))this[_0x258a('0x3d5')][_0x258a('0x2e5')]();else{function _0x4e0214(){const _0x1057af=this[_0x258a('0x94')]['item'](),_0x502f2e=this[_0x258a('0xc0')][_0x258a('0x156')][_0x258a('0x160')](_0x1057af),_0x1664f1=_0x5d73b2[_0x258a('0x32')](this[_0x258a('0xc0')]['maxVisibleItems']()/0x2)-0x1;this[_0x258a('0xc0')][_0x258a('0x283')](_0x502f2e>=0x0?_0x502f2e:0x0),this[_0x258a('0xc0')]['setTopRow'](this[_0x258a('0xc0')]['index']()-_0x1664f1);}}}},Window_ItemList[_0x258a('0x19a')]['setCategory']=function(_0x298a03){if(this[_0x258a('0x118')]!==_0x298a03){this['_category']=_0x298a03,this[_0x258a('0x16')]();if(this[_0x258a('0x3d5')]&&this[_0x258a('0x3d5')][_0x258a('0x2cc')]()){if('pydwc'!==_0x258a('0x1b4'))this[_0x258a('0x283')](0x0);else{function _0x4da958(){_0x5bd80d[_0x258a('0x19a')]['callUpdateHelp'][_0x258a('0x2b')](this);if(this[_0x258a('0x354')])this[_0x258a('0x25f')]();}}}else{if(_0x258a('0x27e')!==_0x258a('0x27e')){function _0x88aefb(){return _0x2330ce['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x348')];}}else this[_0x258a('0x21c')](0x0,0x0);}}},VisuMZ[_0x258a('0xc5')][_0x258a('0x4e')]=Window_ItemList[_0x258a('0x19a')][_0x258a('0x185')],Window_ItemList['prototype'][_0x258a('0x185')]=function(){return SceneManager['_scene']['constructor']===Scene_Battle?VisuMZ[_0x258a('0xc5')][_0x258a('0x4e')][_0x258a('0x2b')](this):VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x357')][_0x258a('0xb5')];},VisuMZ[_0x258a('0xc5')][_0x258a('0x14b')]=Window_ItemList[_0x258a('0x19a')][_0x258a('0x244')],Window_ItemList['prototype'][_0x258a('0x244')]=function(){if(this[_0x258a('0x185')]()<=0x1){if(_0x258a('0x1d6')===_0x258a('0x3ab')){function _0xbac86e(){const _0x2aa75c=this[_0x258a('0x390')](_0x22de24);if(_0x2aa75c['match'](/\\I\[(\d+)\]/i)){const _0x369f7b=this['itemLineRect'](_0x19ace4),_0x21001f=this[_0x258a('0x2b3')](_0x2aa75c)[_0x258a('0x1c5')];return _0x21001f<=_0x369f7b[_0x258a('0x1c5')]?_0x258a('0x403'):_0x258a('0x54');}}}else return Window_Selectable['prototype'][_0x258a('0x244')][_0x258a('0x2b')](this);}else return VisuMZ['ItemsEquipsCore']['Window_ItemList_colSpacing'][_0x258a('0x2b')](this);},Window_ItemList[_0x258a('0x19a')][_0x258a('0x3e4')]=function(_0x3d1b5b){switch(this[_0x258a('0x118')]){case _0x258a('0xc7'):return DataManager['isItem'](_0x3d1b5b);case _0x258a('0xb9'):return DataManager[_0x258a('0x3df')](_0x3d1b5b)&&_0x3d1b5b[_0x258a('0x1f')]===0x1;case _0x258a('0x193'):return DataManager[_0x258a('0x3df')](_0x3d1b5b)&&_0x3d1b5b[_0x258a('0x1f')]===0x2;case _0x258a('0x2ae'):return DataManager[_0x258a('0x3df')](_0x3d1b5b)&&_0x3d1b5b[_0x258a('0x1f')]===0x3;case _0x258a('0x201'):return DataManager[_0x258a('0x3df')](_0x3d1b5b)&&_0x3d1b5b[_0x258a('0x1f')]===0x4;case _0x258a('0x372'):return DataManager[_0x258a('0x3df')](_0x3d1b5b)&&_0x3d1b5b[_0x258a('0x2')];case _0x258a('0x295'):return DataManager[_0x258a('0x3df')](_0x3d1b5b)&&!_0x3d1b5b[_0x258a('0x2')];case _0x258a('0x342'):return DataManager['isItem'](_0x3d1b5b)&&[0x0][_0x258a('0x3e4')](_0x3d1b5b['occasion']);case _0x258a('0x370'):return DataManager[_0x258a('0x3df')](_0x3d1b5b)&&[0x0,0x1][_0x258a('0x3e4')](_0x3d1b5b['occasion']);case _0x258a('0x28'):return DataManager[_0x258a('0x3df')](_0x3d1b5b)&&[0x0,0x2][_0x258a('0x3e4')](_0x3d1b5b[_0x258a('0xb3')]);case _0x258a('0x3e2'):return DataManager[_0x258a('0x3df')](_0x3d1b5b)&&[0x3][_0x258a('0x3e4')](_0x3d1b5b['occasion']);case _0x258a('0x2f9'):return DataManager[_0x258a('0x3f7')](_0x3d1b5b);case _0x258a('0x2ab'):return DataManager[_0x258a('0x36d')](_0x3d1b5b);default:if(this[_0x258a('0x118')][_0x258a('0x22d')](/WTYPE:(\d+)/i)){if(_0x258a('0x2d8')===_0x258a('0x2d8'))return DataManager[_0x258a('0x3f7')](_0x3d1b5b)&&_0x3d1b5b[_0x258a('0x36b')]===Number(RegExp['$1']);else{function _0x9cb8d3(){return _0x258a('0x403');}}}else{if(this[_0x258a('0x118')][_0x258a('0x22d')](/ATYPE:(\d+)/i)){if(_0x258a('0x7a')==='lNZaL')return DataManager[_0x258a('0x36d')](_0x3d1b5b)&&_0x3d1b5b['etypeId']===Number(RegExp['$1']);else{function _0x2b89a4(){this[_0x258a('0x231')](!![]);}}}else{if(this[_0x258a('0x118')][_0x258a('0x22d')](/ETYPE:(\d+)/i)){if(_0x258a('0x30')!==_0x258a('0x420'))return!!_0x3d1b5b&&_0x3d1b5b[_0x258a('0x22e')]===Number(RegExp['$1']);else{function _0x461b5d(){return _0x12414c[_0x258a('0xc5')][_0x258a('0x3bf')][_0x258a('0x2b')](this);}}}else{if(this[_0x258a('0x118')][_0x258a('0x22d')](/Category:(.*)/i))return!!_0x3d1b5b&&_0x3d1b5b[_0x258a('0x14')][_0x258a('0x3e4')](String(RegExp['$1'])[_0x258a('0x176')]()[_0x258a('0x13a')]());}}}}return![];},Window_ItemList[_0x258a('0x19a')][_0x258a('0xdb')]=function(){return!![];},VisuMZ[_0x258a('0xc5')][_0x258a('0x38')]=Window_ItemList['prototype']['drawItem'],Window_ItemList[_0x258a('0x19a')]['drawItem']=function(_0x46ef84){VisuMZ[_0x258a('0xc5')][_0x258a('0x38')]['call'](this,_0x46ef84),this[_0x258a('0x177')](_0x46ef84);},Window_ItemList[_0x258a('0x19a')][_0x258a('0x321')]=function(_0x5b478f,_0x36a567,_0x98f74b,_0x3bb98b){Window_Selectable[_0x258a('0x19a')][_0x258a('0x321')][_0x258a('0x2b')](this,_0x5b478f,_0x36a567,_0x98f74b,_0x3bb98b);},Window_ItemList[_0x258a('0x19a')][_0x258a('0x177')]=function(_0x185fb9){const _0xdbfea6=this[_0x258a('0x1f7')](_0x185fb9);if(!_0xdbfea6||!this['isShowNew']())return;if(!$gameParty[_0x258a('0x340')](_0xdbfea6))return;const _0x9da561=this[_0x258a('0x280')](_0x185fb9),_0x378e16=_0x9da561['x'],_0x6d78e7=_0x9da561['y']+(this[_0x258a('0x394')]()-ImageManager[_0x258a('0x11')])/0x2,_0x397f1f=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x322')][_0x258a('0x343')],_0x458536=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x322')][_0x258a('0x13b')];this['placeNewLabel'](_0xdbfea6,_0x378e16+_0x397f1f,_0x6d78e7+_0x458536);},Window_ItemList[_0x258a('0x19a')][_0x258a('0x1e3')]=function(_0x4f51d9){this[_0x258a('0x1da')]=_0x4f51d9,this[_0x258a('0x327')]();},VisuMZ['ItemsEquipsCore'][_0x258a('0x26f')]=Window_ItemList[_0x258a('0x19a')][_0x258a('0x3fa')],Window_ItemList[_0x258a('0x19a')][_0x258a('0x3fa')]=function(){VisuMZ['ItemsEquipsCore'][_0x258a('0x26f')]['call'](this);if(this['_statusWindow']&&this[_0x258a('0x1da')]['constructor']===Window_ShopStatus){if(_0x258a('0x3ee')!=='yuHca')this[_0x258a('0x1da')][_0x258a('0x2c7')](this[_0x258a('0x396')]());else{function _0x2be666(){if(_0x54517f>=0x0)_0x175d4d===this[_0x258a('0xf9')]()&&(this['_doubleTouch']=!![]),this[_0x258a('0x6b')](),this['select'](_0x7c360e);else _0x5e2539[_0x258a('0x1aa')]()>=0x0&&(this[_0x258a('0x2e5')](),this[_0x258a('0x20a')]());}}}},Window_EventItem[_0x258a('0x19a')][_0x258a('0xdb')]=function(){return![];},Window_EquipStatus[_0x258a('0x19a')][_0x258a('0x3eb')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0xca')];},VisuMZ[_0x258a('0xc5')]['Window_EquipStatus_refresh']=Window_EquipStatus[_0x258a('0x19a')][_0x258a('0x16')],Window_EquipStatus[_0x258a('0x19a')][_0x258a('0x16')]=function(){this['hideAdditionalSprites'](),this[_0x258a('0x174')]();if(this['_actor'])this[_0x258a('0x91')][_0x258a('0x16')]();if(this[_0x258a('0x3eb')]()){if(_0x258a('0x134')===_0x258a('0x3fb')){function _0x5e04c6(){const _0x451f18=this[_0x258a('0x190')]()?0x0:_0x3e4ee0[_0x258a('0x111')]-this[_0x258a('0x2c1')](),_0x403684=this[_0x258a('0x40e')](),_0xcdd168=this[_0x258a('0x2c1')](),_0xc51f02=this['mainAreaHeight']();return new _0x1dad2b(_0x451f18,_0x403684,_0xcdd168,_0xc51f02);}}else this['prepareRefreshItemsEquipsCoreLayout']();}else VisuMZ[_0x258a('0xc5')][_0x258a('0x53')][_0x258a('0x2b')](this);},Window_EquipStatus[_0x258a('0x19a')][_0x258a('0x155')]=function(){this[_0x258a('0x393')][_0x258a('0x237')]();if(!this[_0x258a('0x91')])return;if(this[_0x258a('0x76')]()){const _0xb00670=ImageManager[_0x258a('0x409')](this[_0x258a('0x91')][_0x258a('0x1a1')]());_0xb00670['addLoadListener'](this[_0x258a('0x297')][_0x258a('0x138')](this));}else this[_0x258a('0x2e0')]();},Window_EquipStatus[_0x258a('0x19a')]['isMainMenuCoreMenuImageOptionAvailable']=function(){return Imported['VisuMZ_1_MainMenuCore']&&this[_0x258a('0x91')][_0x258a('0x1a1')]()!==''&&VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0xe4')];},Window_EquipStatus[_0x258a('0x19a')][_0x258a('0x297')]=function(){VisuMZ[_0x258a('0xc5')]['Settings'][_0x258a('0x316')][_0x258a('0x17d')][_0x258a('0x2b')](this),this[_0x258a('0x41d')]();},Window_EquipStatus[_0x258a('0x19a')][_0x258a('0x2e0')]=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['EquipScene'][_0x258a('0x25c')][_0x258a('0x2b')](this),this[_0x258a('0x41d')]();},Window_EquipStatus[_0x258a('0x19a')]['drawParamsItemsEquipsCore']=function(){this[_0x258a('0x174')](),VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0x230')][_0x258a('0x2b')](this);},Window_EquipStatus[_0x258a('0x19a')][_0x258a('0xba')]=function(_0x534e89,_0xa1d9cc,_0x51f28e,_0x49f260,_0x151b15){const _0x45d88f=ImageManager[_0x258a('0x409')](_0x534e89[_0x258a('0x1a1')]()),_0xefa8c=this[_0x258a('0x11e')]-_0x45d88f[_0x258a('0x1c5')];_0xa1d9cc+=_0xefa8c/0x2;if(_0xefa8c<0x0)_0x49f260-=_0xefa8c;Window_StatusBase[_0x258a('0x19a')][_0x258a('0xba')][_0x258a('0x2b')](this,_0x534e89,_0xa1d9cc,_0x51f28e,_0x49f260,_0x151b15);},Window_EquipStatus[_0x258a('0x19a')][_0x258a('0x3d3')]=function(){if(Imported[_0x258a('0x5c')])return VisuMZ['CoreEngine'][_0x258a('0x27f')][_0x258a('0xcd')][_0x258a('0x15e')];else{if(_0x258a('0x43a')===_0x258a('0x1b')){function _0x4a7993(){return _0x32bcdc[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x3a3')];}}else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}},Window_EquipStatus[_0x258a('0x19a')][_0x258a('0x415')]=function(){return VisuMZ[_0x258a('0xc5')]['Settings'][_0x258a('0x316')][_0x258a('0x2cf')];},Window_EquipStatus[_0x258a('0x19a')][_0x258a('0x302')]=function(){return Imported['VisuMZ_0_CoreEngine']&&VisuMZ[_0x258a('0x2d2')][_0x258a('0x27f')][_0x258a('0xcd')][_0x258a('0x401')];},Window_EquipStatus[_0x258a('0x19a')][_0x258a('0x3f5')]=function(_0x4f1b7d,_0x212bcf,_0xa0e9ca,_0x465e69,_0x25ffe8){_0x25ffe8=Math['max'](_0x25ffe8||0x1,0x1);while(_0x25ffe8--){if(_0x258a('0x1f0')===_0x258a('0x1f0')){_0x465e69=_0x465e69||this[_0x258a('0x394')](),this[_0x258a('0x393')][_0x258a('0x2a5')]=0xa0;const _0x3d2103=ColorManager[_0x258a('0x1cd')]();this[_0x258a('0x393')]['fillRect'](_0x4f1b7d+0x1,_0x212bcf+0x1,_0xa0e9ca-0x2,_0x465e69-0x2,_0x3d2103),this[_0x258a('0x393')]['paintOpacity']=0xff;}else{function _0xb45fa(){_0x32d91a=_0x5afbba[_0x258a('0x167')][_0x5ee3bf(_0x4a28e7['$1'])]||'';}}}},Window_EquipStatus[_0x258a('0x19a')][_0x258a('0x203')]=function(_0x193aa8,_0x29497a,_0x2456d2,_0xef0ed1){const _0x1a8dce=this[_0x258a('0x3ca')]();if(Imported['VisuMZ_0_CoreEngine'])this[_0x258a('0x424')](_0x29497a+_0x1a8dce,_0x2456d2,_0xef0ed1,_0x193aa8,![]);else{if('pnUTe'===_0x258a('0x2c')){function _0x49c991(){_0x24609d=_0x258a('0xbd')[_0x258a('0x2c4')](_0x2e3893['id']);}}else this['drawText'](TextManager[_0x258a('0x224')](_0x193aa8),_0x29497a+_0x1a8dce,_0x2456d2,_0xef0ed1);}},Window_EquipStatus[_0x258a('0x19a')][_0x258a('0x162')]=function(_0x541de0,_0x11d299,_0x5f20ef,_0x122b11){const _0x12d389=this['itemPadding']();let _0xb4f166=0x0;Imported['VisuMZ_0_CoreEngine']?_0xb4f166=this['_actor']['paramValueByName'](_0x541de0,!![]):_0xb4f166=this[_0x258a('0x91')][_0x258a('0x224')](_0x541de0);const _0x1bd3b7=_0xb4f166;this[_0x258a('0xef')](_0xb4f166,_0x11d299,_0x5f20ef,_0x122b11-_0x12d389,_0x258a('0x47'));},Window_EquipStatus[_0x258a('0x19a')][_0x258a('0x3b9')]=function(_0x51b461,_0x3be923,_0xc6f479,_0x4679fe){const _0x25126b=this[_0x258a('0x3ca')]();let _0x584d26=0x0,_0xa9193e=0x0,_0x556b92='';if(this[_0x258a('0x2ff')]){if('ciBiq'!==_0x258a('0x3da')){function _0x224a53(){const _0x10decc=_0x20f116[_0x258a('0x63')](_0x258a('0x1f6')),_0x5820ba=_0x258958[_0x258a('0x3f6')],_0x2e53f4=_0x1e9f7b[_0x258a('0x11')],_0xd6e6d=_0x114c01%0x10*_0x5820ba,_0x53a629=_0x1d6ef3[_0x258a('0x32')](_0x1e206a/0x10)*_0x2e53f4,_0x4e90f0=_0x5249d6[_0x258a('0xf2')](_0x5820ba*this[_0x258a('0x3b8')]()),_0x5df41a=_0x2dc7a9['ceil'](_0x2e53f4*this[_0x258a('0x3b8')]());this[_0x258a('0x393')][_0x258a('0x315')](_0x10decc,_0xd6e6d,_0x53a629,_0x5820ba,_0x2e53f4,_0x14423d,_0x66b904,_0x4e90f0,_0x5df41a);}}else{Imported[_0x258a('0x5c')]?(_0x584d26=this[_0x258a('0x91')]['paramValueByName'](_0x51b461,![]),_0xa9193e=this[_0x258a('0x2ff')][_0x258a('0x42c')](_0x51b461,![]),_0x556b92=this['_tempActor'][_0x258a('0x42c')](_0x51b461,!![])):(_0x584d26=this['_actor'][_0x258a('0x224')](_0x51b461),_0xa9193e=this[_0x258a('0x2ff')][_0x258a('0x224')](_0x51b461),_0x556b92=this[_0x258a('0x2ff')]['param'](_0x51b461));const _0x12489b=_0x584d26,_0x34b3f8=_0xa9193e;diffValue=_0x34b3f8-_0x12489b,this[_0x258a('0x3ed')](ColorManager[_0x258a('0xb7')](diffValue)),this['drawText'](_0x556b92,_0x3be923,_0xc6f479,_0x4679fe-_0x25126b,_0x258a('0x47'));}}},Window_EquipStatus[_0x258a('0x19a')][_0x258a('0x198')]=function(_0x4835a1,_0x255e9b,_0x4a543b,_0x43ef7f){const _0x716f10=this['itemPadding']();let _0x4ae0bc=0x0,_0x26d6f4=0x0;if(this[_0x258a('0x2ff')]){if(Imported[_0x258a('0x5c')]){if(_0x258a('0x3e3')===_0x258a('0x2ce')){function _0x60fb6c(){this[_0x258a('0x221')]++;}}else _0x4ae0bc=this[_0x258a('0x91')][_0x258a('0x42c')](_0x4835a1,![]),_0x26d6f4=this[_0x258a('0x2ff')]['paramValueByName'](_0x4835a1,![]);}else _0x4ae0bc=this[_0x258a('0x91')][_0x258a('0x224')](_0x4835a1),_0x26d6f4=this[_0x258a('0x2ff')][_0x258a('0x224')](_0x4835a1);const _0x28c711=_0x4ae0bc,_0x4a3d10=_0x26d6f4,_0x3bd46a=_0x4a3d10-_0x28c711;let _0x4411a5=_0x3bd46a;if(_0x4ae0bc%0x1!==0x0)_0x4411a5=Math['round'](_0x3bd46a*0x64)+'%';_0x3bd46a!==0x0&&(this[_0x258a('0x3ed')](ColorManager['paramchangeTextColor'](_0x3bd46a)),_0x4411a5=(_0x3bd46a>0x0?_0x258a('0x146'):_0x258a('0x2bd'))[_0x258a('0x2c4')](_0x4411a5),this['drawText'](_0x4411a5,_0x255e9b+_0x716f10,_0x4a543b,_0x43ef7f,'left'));}},VisuMZ[_0x258a('0xc5')][_0x258a('0x82')]=Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x1fd')],Window_EquipCommand['prototype']['initialize']=function(_0x4b8bf8){VisuMZ[_0x258a('0xc5')][_0x258a('0x82')][_0x258a('0x2b')](this,_0x4b8bf8),this[_0x258a('0x104')](_0x4b8bf8);},Window_EquipCommand[_0x258a('0x19a')]['createCommandNameWindow']=function(_0x567e5e){const _0x408c11=new Rectangle(0x0,0x0,_0x567e5e['width'],_0x567e5e[_0x258a('0x259')]);this[_0x258a('0x296')]=new Window_Base(_0x408c11),this['_commandNameWindow']['opacity']=0x0,this[_0x258a('0x38b')](this[_0x258a('0x296')]),this['updateCommandNameWindow']();},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x327')]=function(){Window_HorzCommand['prototype'][_0x258a('0x327')][_0x258a('0x2b')](this);if(this['_commandNameWindow'])this[_0x258a('0x10f')]();},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x10f')]=function(){const _0x34a1f9=this[_0x258a('0x296')];_0x34a1f9[_0x258a('0x393')][_0x258a('0x237')]();const _0x4a34ee=this[_0x258a('0x1a9')](this[_0x258a('0xf9')]());if(_0x4a34ee===_0x258a('0x54')){if(_0x258a('0x36f')===_0x258a('0x358')){function _0xaf4386(){this['commandBuyItemsEquipsCore']();}}else{const _0x3f880b=this[_0x258a('0x280')](this['index']());let _0x4de699=this['commandName'](this[_0x258a('0xf9')]());_0x4de699=_0x4de699['replace'](/\\I\[(\d+)\]/gi,''),_0x34a1f9[_0x258a('0x174')](),this['commandNameWindowDrawBackground'](_0x4de699,_0x3f880b),this['commandNameWindowDrawText'](_0x4de699,_0x3f880b),this[_0x258a('0x3e9')](_0x4de699,_0x3f880b);}}},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x7b')]=function(_0xf55740,_0x576081){},Window_EquipCommand['prototype'][_0x258a('0x3d')]=function(_0x32b151,_0x4e4484){const _0x17c087=this[_0x258a('0x296')];_0x17c087['drawText'](_0x32b151,0x0,_0x4e4484['y'],_0x17c087['innerWidth'],'center');},Window_EquipCommand[_0x258a('0x19a')]['commandNameWindowCenter']=function(_0x14a613,_0x273ada){const _0x4e9e1d=this[_0x258a('0x296')],_0x4e0e59=$gameSystem[_0x258a('0x433')](),_0x1e038a=_0x273ada['x']+Math[_0x258a('0x32')](_0x273ada[_0x258a('0x1c5')]/0x2)+_0x4e0e59;_0x4e9e1d['x']=_0x4e9e1d[_0x258a('0x1c5')]/-0x2+_0x1e038a,_0x4e9e1d['y']=Math[_0x258a('0x32')](_0x273ada[_0x258a('0x259')]/0x2);},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x2cc')]=function(){return Imported[_0x258a('0x5c')]&&Window_HorzCommand[_0x258a('0x19a')]['isUseModernControls']['call'](this);},Window_EquipCommand['prototype'][_0x258a('0x31c')]=function(){if(this[_0x258a('0x3c4')]()===_0x258a('0x79'))Window_HorzCommand['prototype'][_0x258a('0x31c')][_0x258a('0x2b')](this);},Window_EquipCommand['prototype'][_0x258a('0x218')]=function(){if(!this[_0x258a('0x60')]()){if(_0x258a('0x1ca')===_0x258a('0x2aa')){function _0x49a3b4(){this[_0x258a('0x3cb')]=!![];}}else Window_HorzCommand[_0x258a('0x19a')]['processCursorMoveModernControls']['call'](this);}},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x60')]=function(){if(!this[_0x258a('0x248')]())return![];if(SceneManager[_0x258a('0x180')][_0x258a('0xe1')]!==Scene_Equip)return![];if(Input[_0x258a('0x144')](_0x258a('0x2de'))){if(_0x258a('0x378')===_0x258a('0x378'))this[_0x258a('0x40f')](),SceneManager[_0x258a('0x180')][_0x258a('0xfa')](),SceneManager[_0x258a('0x180')]['_slotWindow'][_0x258a('0x283')](-0x1);else{function _0x33f163(){if(_0x47720e[_0x258a('0x22d')](/(.*):[ ](.*)/i)){const _0x43ee97=_0x4aba0c(_0x5b43f4['$1'])[_0x258a('0x176')]()[_0x258a('0x13a')](),_0x155fa8=_0x2ed6a0(_0x1f3334['$2'])[_0x258a('0x13a')]();this[_0x258a('0x312')][_0x43ee97]=_0x155fa8;}}}}return![];},Window_EquipCommand['prototype'][_0x258a('0x185')]=function(){return this[_0x258a('0x1af')]?this[_0x258a('0x1af')][_0x258a('0x2a7')]:0x3;},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x261')]=function(){if(this['isOpen']()&&this[_0x258a('0xa7')]&&SceneManager[_0x258a('0x180')][_0x258a('0xe1')]===Scene_Equip){if('EseBS'==='tkbBZ'){function _0x148998(){_0x32ac6d(_0x32915e);}}else{if(this[_0x258a('0x122')]()&&TouchInput[_0x258a('0x74')]()){if(_0x258a('0x83')===_0x258a('0x365')){function _0x5bb8e1(){if(this[_0x258a('0x3c4')]()===_0x258a('0x79'))_0x136d3f[_0x258a('0x19a')][_0x258a('0x31c')][_0x258a('0x2b')](this);}}else this[_0x258a('0x352')](![]);}else TouchInput[_0x258a('0x144')]()&&this[_0x258a('0x352')](!![]);if(TouchInput['isClicked']())this[_0x258a('0x28c')]();else TouchInput['isCancelled']()&&this[_0x258a('0x36e')]();}}},Window_EquipCommand['prototype'][_0x258a('0x352')]=function(_0x2407ef){this[_0x258a('0x3cb')]=![];const _0x5b4d2c=this[_0x258a('0xf9')](),_0x132710=this[_0x258a('0x1aa')](),_0x7a6385=SceneManager['_scene'][_0x258a('0x94')];if(_0x7a6385[_0x258a('0x287')]()&&_0x7a6385[_0x258a('0xa7')]){if('yrEXl'!==_0x258a('0x14d')){if(_0x132710>=0x0){if(_0x258a('0x1f5')==='mQQMU'){function _0x531d37(){const _0x1cc689=_0x394c55['ItemsEquipsCore']['Settings']['StatusWindow'][_0x258a('0x30b')];return _0x1cc689[_0x258a('0x2c4')](_0x1b1a4f['hp']);}}else _0x132710===this[_0x258a('0xf9')]()&&(this['_doubleTouch']=!![]),this[_0x258a('0x6b')](),this[_0x258a('0x115')](_0x132710);}else{if(_0x7a6385[_0x258a('0x1aa')]()>=0x0){if(_0x258a('0x2af')===_0x258a('0x2af'))this['deactivate'](),this[_0x258a('0x20a')]();else{function _0x10712c(){if(_0x1e967f[_0x258a('0x22d')](/(.*):[ ](.*)/i)){const _0xaeefd=_0x1b988e(_0x1c6d45['$1'])[_0x258a('0x13a')](),_0x2b310c=_0x43194c(_0x879314['$2'])[_0x258a('0x13a')]();this['drawItemCustomEntryLine'](_0xaeefd,_0x2b310c,_0x219924,_0x58affe,_0x1a786e),_0x261989+=this[_0x258a('0x394')]();}}}}}}else{function _0xa96ae3(){this['drawText'](_0x37b7a1[_0x258a('0x224')](_0x5cf738),_0x2c7927+_0x35d26b,_0x9f6bfd,_0x3049ce);}}}if(_0x2407ef&&this[_0x258a('0xf9')]()!==_0x5b4d2c){if('uyKpe'===_0x258a('0xb0')){function _0x18f780(){return!![];}}else this[_0x258a('0x40f')]();}},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x11b')]=function(){this[_0x258a('0x1f4')](),this[_0x258a('0x264')](),this[_0x258a('0xd1')]();},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x16')]=function(){Window_HorzCommand[_0x258a('0x19a')][_0x258a('0x16')][_0x258a('0x2b')](this),this[_0x258a('0x2a1')]();},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x1f4')]=function(){if(!this[_0x258a('0x45')]())return;const _0x53de02=this[_0x258a('0x266')](),_0x29f1ae=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0x282')],_0x23fb7b=_0x53de02===_0x258a('0x1a5')?TextManager['equip2']:'\x5cI[%1]%2'[_0x258a('0x2c4')](_0x29f1ae,TextManager['equip2']),_0x30dbd5=this['isEquipCommandEnabled']();this[_0x258a('0x131')](_0x23fb7b,'equip',_0x30dbd5);},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x45')]=function(){return!this[_0x258a('0x2cc')]();},Window_EquipCommand['prototype'][_0x258a('0x3dc')]=function(){return!![];},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x264')]=function(){if(!this['isOptimizeCommandAdded']())return;const _0x19a6f4=this[_0x258a('0x266')](),_0xd43988=VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0x2a')],_0x58adf6=_0x19a6f4===_0x258a('0x1a5')?TextManager[_0x258a('0x20f')]:_0x258a('0x1c3')[_0x258a('0x2c4')](_0xd43988,TextManager[_0x258a('0x20f')]),_0x3b141d=this[_0x258a('0x14e')]();this[_0x258a('0x131')](_0x58adf6,_0x258a('0x20f'),_0x3b141d);},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x163')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0xf4')];},Window_EquipCommand[_0x258a('0x19a')]['isOptimizeCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0xd1')]=function(){if(!this[_0x258a('0x3a9')]())return;const _0x209497=this[_0x258a('0x266')](),_0x5b0e9e=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0x351')],_0x4d064f=_0x209497===_0x258a('0x1a5')?TextManager[_0x258a('0x237')]:_0x258a('0x1c3')[_0x258a('0x2c4')](_0x5b0e9e,TextManager[_0x258a('0x237')]),_0x3d1cd3=this[_0x258a('0x2b5')]();this[_0x258a('0x131')](_0x4d064f,_0x258a('0x237'),_0x3d1cd3);},Window_EquipCommand['prototype'][_0x258a('0x3a9')]=function(){return VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')]['EquipScene'][_0x258a('0x46')];},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x2b5')]=function(){return!![];},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x21d')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0x8d')];},Window_EquipCommand['prototype'][_0x258a('0x3a5')]=function(_0x4b0f1a){const _0x33ed85=this[_0x258a('0x1a9')](_0x4b0f1a);if(_0x33ed85===_0x258a('0x403'))this[_0x258a('0x33c')](_0x4b0f1a);else{if(_0x33ed85===_0x258a('0x54')){if(_0x258a('0x1ab')!==_0x258a('0x1ab')){function _0x3c043c(){this[_0x258a('0x390')](_0x1d5029)['match'](/\\I\[(\d+)\]/i);const _0x16c9ce=_0x363064(_0x50170b['$1'])||0x0,_0xadf353=this['itemLineRect'](_0x3edd5b),_0x4925b5=_0xadf353['x']+_0x4cb2d0[_0x258a('0x32')]((_0xadf353[_0x258a('0x1c5')]-_0x3b1dda[_0x258a('0x3f6')])/0x2),_0x524a92=_0xadf353['y']+(_0xadf353['height']-_0x25f77d[_0x258a('0x11')])/0x2;this[_0x258a('0x3b0')](_0x16c9ce,_0x4925b5,_0x524a92);}}else this[_0x258a('0x1e8')](_0x4b0f1a);}else Window_HorzCommand[_0x258a('0x19a')][_0x258a('0x3a5')][_0x258a('0x2b')](this,_0x4b0f1a);}},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x266')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')]['CmdStyle'];},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x1a9')]=function(_0x40acd6){if(_0x40acd6<0x0)return _0x258a('0x1a5');const _0xe7f745=this[_0x258a('0x266')]();if(_0xe7f745!==_0x258a('0x214'))return _0xe7f745;else{if(this[_0x258a('0xcc')]()>0x0){if('ntZDg'!==_0x258a('0x66')){const _0x272bba=this[_0x258a('0x390')](_0x40acd6);if(_0x272bba[_0x258a('0x22d')](/\\I\[(\d+)\]/i)){if(_0x258a('0x3db')===_0x258a('0x7')){function _0x5156fd(){this['resetFontSettings'](),this[_0x258a('0x426')](!![]),this[_0x258a('0xe')](),this[_0x258a('0x39')]()?this[_0x258a('0x136')]():this['drawItemData']();}}else{const _0x23c29e=this[_0x258a('0x280')](_0x40acd6),_0x51d376=this[_0x258a('0x2b3')](_0x272bba)[_0x258a('0x1c5')];if(_0x51d376<=_0x23c29e[_0x258a('0x1c5')]){if(_0x258a('0x345')===_0x258a('0x345'))return _0x258a('0x403');else{function _0x1420aa(){this[_0x258a('0x2b4')]();}}}else{if(_0x258a('0x23c')!==_0x258a('0x1ec'))return _0x258a('0x54');else{function _0x3f9058(){return _0x4b73da[_0x258a('0x1b8')]&&this[_0x258a('0x91')][_0x258a('0x1a1')]()!==''&&_0x5b8ce4[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0xe4')];}}}}}}else{function _0xbc8fef(){_0x1828ac[_0x258a('0xc5')]['Window_EquipStatus_refresh'][_0x258a('0x2b')](this);}}}}return'text';},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x33c')]=function(_0x2cc013){const _0x586610=this[_0x258a('0x280')](_0x2cc013),_0x2a1e10=this[_0x258a('0x390')](_0x2cc013),_0x5d6231=this[_0x258a('0x2b3')](_0x2a1e10)[_0x258a('0x1c5')];this[_0x258a('0x426')](this[_0x258a('0x32d')](_0x2cc013));const _0x464213=this[_0x258a('0x21d')]();if(_0x464213===_0x258a('0x47')){if(_0x258a('0x3b4')!==_0x258a('0x38c'))this['drawTextEx'](_0x2a1e10,_0x586610['x']+_0x586610[_0x258a('0x1c5')]-_0x5d6231,_0x586610['y'],_0x5d6231);else{function _0x4dac84(){this[_0x258a('0x1e8')](_0x522553);}}}else{if(_0x464213===_0x258a('0x161')){const _0x48aa3b=_0x586610['x']+Math[_0x258a('0x32')]((_0x586610['width']-_0x5d6231)/0x2);this[_0x258a('0x4b')](_0x2a1e10,_0x48aa3b,_0x586610['y'],_0x5d6231);}else{if(_0x258a('0x35e')===_0x258a('0x35e'))this[_0x258a('0x4b')](_0x2a1e10,_0x586610['x'],_0x586610['y'],_0x5d6231);else{function _0x41af29(){if(!_0x27132b[_0x258a('0x24e')](_0x299685))return![];}}}}},Window_EquipCommand[_0x258a('0x19a')][_0x258a('0x1e8')]=function(_0x5f0276){this[_0x258a('0x390')](_0x5f0276)['match'](/\\I\[(\d+)\]/i);const _0x15ef6f=Number(RegExp['$1'])||0x0,_0x2ffebf=this[_0x258a('0x280')](_0x5f0276),_0xc5e1ad=_0x2ffebf['x']+Math[_0x258a('0x32')]((_0x2ffebf['width']-ImageManager[_0x258a('0x3f6')])/0x2),_0x11d705=_0x2ffebf['y']+(_0x2ffebf[_0x258a('0x259')]-ImageManager[_0x258a('0x11')])/0x2;this[_0x258a('0x3b0')](_0x15ef6f,_0xc5e1ad,_0x11d705);},Window_EquipSlot[_0x258a('0x19a')][_0x258a('0x2cc')]=function(){return Imported[_0x258a('0x5c')]&&Window_HorzCommand[_0x258a('0x19a')][_0x258a('0x2cc')][_0x258a('0x2b')](this);},Window_EquipSlot['prototype'][_0x258a('0x6b')]=function(){Window_StatusBase[_0x258a('0x19a')][_0x258a('0x6b')][_0x258a('0x2b')](this),this[_0x258a('0x327')]();},Window_EquipSlot[_0x258a('0x19a')][_0x258a('0xc9')]=function(){Window_StatusBase['prototype'][_0x258a('0xc9')][_0x258a('0x2b')](this),this[_0x258a('0x22')]();},Window_EquipSlot[_0x258a('0x19a')][_0x258a('0x22')]=function(){if(!this[_0x258a('0x38e')]())return;if(Input[_0x258a('0x144')]('shift')&&this[_0x258a('0x396')]()){if(_0x258a('0x26')===_0x258a('0x26')){const _0x3f82ef=SceneManager[_0x258a('0x180')][_0x258a('0x91')];if(_0x3f82ef){const _0x1c21f1=_0x3f82ef[_0x258a('0x2ba')]()[this[_0x258a('0xf9')]()];if(_0x3f82ef[_0x258a('0x192')]()['includes'](_0x1c21f1)){if(_0x258a('0x6f')==='sDaUT'){function _0x1e959b(){return _0x10e37e;}}else this[_0x258a('0x289')]();}else{if(_0x258a('0xb1')!==_0x258a('0xb1')){function _0x46bd36(){_0x158621['ItemsEquipsCore'][_0x258a('0x423')]['call'](this),this[_0x258a('0x2cc')]()&&this[_0x258a('0x15b')]();}}else this[_0x258a('0x184')]();}}}else{function _0x5c4971(){this[_0x258a('0x1da')][_0x258a('0x19c')]();}}}},Window_EquipSlot['prototype'][_0x258a('0x184')]=function(){SoundManager[_0x258a('0x215')]();const _0x51b3c9=SceneManager[_0x258a('0x180')]['_actor'];_0x51b3c9[_0x258a('0x170')](this['index'](),null),this[_0x258a('0x16')](),this[_0x258a('0xc0')]['refresh']();},Window_EquipSlot[_0x258a('0x19a')][_0x258a('0x38e')]=function(){return this['active']&&VisuMZ[_0x258a('0xc5')]['Settings'][_0x258a('0x316')][_0x258a('0x13d')];},Window_EquipSlot[_0x258a('0x19a')][_0x258a('0x218')]=function(){if(!this[_0x258a('0x60')]()){if(_0x258a('0x363')!==_0x258a('0x338'))Window_StatusBase[_0x258a('0x19a')][_0x258a('0x218')][_0x258a('0x2b')](this);else{function _0x14ec0f(){this[_0x258a('0x40f')]();}}}},Window_EquipSlot[_0x258a('0x19a')][_0x258a('0x60')]=function(){if(!this[_0x258a('0x248')]())return![];if(SceneManager['_scene'][_0x258a('0xe1')]!==Scene_Equip)return![];if(this[_0x258a('0xf9')]()===0x0&&Input['isTriggered']('up'))this[_0x258a('0x40f')](),Input[_0x258a('0x237')](),SceneManager[_0x258a('0x180')][_0x258a('0xf6')]();else{if(Input[_0x258a('0x271')]('down')){const _0x385f6d=this[_0x258a('0xf9')]();return Input[_0x258a('0xd')](_0x258a('0x335'))?this[_0x258a('0x15a')]():this[_0x258a('0x187')](![]),this[_0x258a('0xf9')]()!==_0x385f6d&&this[_0x258a('0x40f')](),!![];}else{if(this['isShiftShortcutKeyForRemove']()&&Input[_0x258a('0x144')](_0x258a('0x335'))){if(_0x258a('0x10e')!==_0x258a('0x2d3'))return!![];else{function _0x40ff95(){this[_0x258a('0xbe')][_0x258a('0x191')]=this[_0x258a('0xb')][_0x258a('0x1d')],_0x4e3e7d=!![];}}}}}return![];},Window_EquipSlot[_0x258a('0x19a')]['isShiftShortcutKeyForRemove']=function(){return VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0x13d')];},Window_EquipSlot[_0x258a('0x19a')][_0x258a('0x261')]=function(){if(this[_0x258a('0x287')]()&&this[_0x258a('0xa7')]&&SceneManager[_0x258a('0x180')][_0x258a('0xe1')]===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput[_0x258a('0x74')]())this[_0x258a('0x352')](![]);else TouchInput[_0x258a('0x144')]()&&this['onTouchSelectModernControls'](!![]);if(TouchInput[_0x258a('0x199')]()){if(_0x258a('0x30f')!==_0x258a('0xfe'))this[_0x258a('0x28c')]();else{function _0x424b53(){return this[_0x258a('0x356')]();}}}else TouchInput[_0x258a('0x3e')]()&&this[_0x258a('0x36e')]();}},Window_EquipSlot[_0x258a('0x19a')][_0x258a('0x352')]=function(_0x53a8de){this['_doubleTouch']=![];const _0xd82a44=this['index'](),_0x41ab33=this[_0x258a('0x1aa')](),_0x1d9835=SceneManager[_0x258a('0x180')][_0x258a('0x234')];if(_0x1d9835[_0x258a('0x287')]()&&_0x1d9835[_0x258a('0xa7')]){if(_0x41ab33>=0x0){if(_0x258a('0x347')===_0x258a('0x255')){function _0x310e9e(){const _0x17ce43=_0x258a('0x31');if(this[_0x258a('0x312')][_0x17ce43])return this['_customItemInfo'][_0x17ce43];return _0x202a0e[_0x258a('0xc1')]&&_0x3b2224[_0x258a('0x128')](this['_item'])!=='MANUAL'?this[_0x258a('0x3c6')]():this[_0x258a('0x124')]();}}else _0x41ab33===this['index']()&&(this[_0x258a('0x3cb')]=!![]),this['activate'](),this[_0x258a('0x115')](_0x41ab33);}else{if(_0x1d9835['hitIndex']()>=0x0){if(_0x258a('0x392')!==_0x258a('0x13e'))this[_0x258a('0x2e5')](),this[_0x258a('0x20a')]();else{function _0x197e4d(){_0x4f0e2b=_0x386ba2[_0x258a('0x1fb')];}}}}}_0x53a8de&&this[_0x258a('0xf9')]()!==_0xd82a44&&this['playCursorSound']();},VisuMZ[_0x258a('0xc5')][_0x258a('0x41c')]=Window_EquipItem[_0x258a('0x19a')][_0x258a('0x3e4')],Window_EquipItem[_0x258a('0x19a')]['includes']=function(_0x10657e){return _0x10657e===null&&this[_0x258a('0x192')]()[_0x258a('0x3e4')](this[_0x258a('0x22e')]())?this[_0x258a('0x156')][_0x258a('0x2a7')]>0x0?![]:!![]:VisuMZ[_0x258a('0xc5')][_0x258a('0x41c')][_0x258a('0x2b')](this,_0x10657e);},VisuMZ[_0x258a('0xc5')][_0x258a('0x3a4')]=Window_EquipItem[_0x258a('0x19a')][_0x258a('0x34e')],Window_EquipItem[_0x258a('0x19a')][_0x258a('0x34e')]=function(_0x457aa9){if(!_0x457aa9&&this[_0x258a('0x192')]()[_0x258a('0x3e4')](this[_0x258a('0x22e')]())){if(_0x258a('0x126')===_0x258a('0x126'))return![];else{function _0x194b27(){return!![];}}}else return VisuMZ[_0x258a('0xc5')][_0x258a('0x3a4')][_0x258a('0x2b')](this,_0x457aa9);},Window_EquipItem[_0x258a('0x19a')]['nonRemovableEtypes']=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0x373')];},Window_EquipItem[_0x258a('0x19a')][_0x258a('0x3a5')]=function(_0x6609ab){const _0x53ba6f=this[_0x258a('0x1f7')](_0x6609ab);_0x53ba6f?Window_ItemList[_0x258a('0x19a')][_0x258a('0x3a5')]['call'](this,_0x6609ab):this[_0x258a('0x200')](_0x6609ab);},Window_EquipItem['prototype'][_0x258a('0x200')]=function(_0x4b5dd6){this[_0x258a('0x426')](this[_0x258a('0x34e')](null));const _0x322f8a=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')],_0x35a523=this[_0x258a('0x280')](_0x4b5dd6),_0x3678e3=_0x35a523['y']+(this[_0x258a('0x394')]()-ImageManager[_0x258a('0x11')])/0x2,_0x5b163f=ImageManager[_0x258a('0x3f6')]+0x4,_0xcfaeb4=Math['max'](0x0,_0x35a523[_0x258a('0x1c5')]-_0x5b163f);this[_0x258a('0x52')](),this[_0x258a('0x3b0')](_0x322f8a[_0x258a('0x2ad')],_0x35a523['x'],_0x3678e3),this['drawText'](_0x322f8a[_0x258a('0xfc')],_0x35a523['x']+_0x5b163f,_0x35a523['y'],_0xcfaeb4),this[_0x258a('0x426')](!![]);},Window_EquipItem[_0x258a('0x19a')][_0x258a('0x3fa')]=function(){Window_ItemList[_0x258a('0x19a')][_0x258a('0x3fa')][_0x258a('0x2b')](this);if(this[_0x258a('0x91')]&&this[_0x258a('0x1da')]&&this[_0x258a('0x2a6')]>=0x0){const _0x3189f9=JsonEx[_0x258a('0x3de')](this[_0x258a('0x91')]);_0x3189f9['_tempActor']=!![],_0x3189f9[_0x258a('0x364')](this['_slotId'],this[_0x258a('0x396')]()),this[_0x258a('0x1da')]['setTempActor'](_0x3189f9);}},VisuMZ['ItemsEquipsCore'][_0x258a('0x371')]=Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x1fd')],Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x1fd')]=function(_0x535583){VisuMZ[_0x258a('0xc5')]['Window_ShopCommand_initialize'][_0x258a('0x2b')](this,_0x535583),this[_0x258a('0x104')](_0x535583);},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x104')]=function(_0x8b394b){const _0x298806=new Rectangle(0x0,0x0,_0x8b394b[_0x258a('0x1c5')],_0x8b394b[_0x258a('0x259')]);this[_0x258a('0x296')]=new Window_Base(_0x298806),this[_0x258a('0x296')][_0x258a('0x117')]=0x0,this[_0x258a('0x38b')](this['_commandNameWindow']),this['updateCommandNameWindow']();},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x327')]=function(){Window_HorzCommand[_0x258a('0x19a')][_0x258a('0x327')][_0x258a('0x2b')](this);if(this[_0x258a('0x296')])this[_0x258a('0x10f')]();},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x10f')]=function(){const _0x17ef98=this['_commandNameWindow'];_0x17ef98[_0x258a('0x393')]['clear']();const _0x2ab84c=this[_0x258a('0x1a9')](this['index']());if(_0x2ab84c===_0x258a('0x54')){const _0x5ece6b=this[_0x258a('0x280')](this['index']());let _0x3b599c=this[_0x258a('0x390')](this[_0x258a('0xf9')]());_0x3b599c=_0x3b599c['replace'](/\\I\[(\d+)\]/gi,''),_0x17ef98[_0x258a('0x174')](),this[_0x258a('0x7b')](_0x3b599c,_0x5ece6b),this['commandNameWindowDrawText'](_0x3b599c,_0x5ece6b),this[_0x258a('0x3e9')](_0x3b599c,_0x5ece6b);}},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x7b')]=function(_0x362bbb,_0x41859b){},Window_ShopCommand[_0x258a('0x19a')]['commandNameWindowDrawText']=function(_0x17a2b0,_0x4fee9d){const _0x543423=this[_0x258a('0x296')];_0x543423[_0x258a('0xef')](_0x17a2b0,0x0,_0x4fee9d['y'],_0x543423[_0x258a('0x11e')],_0x258a('0x161'));},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x3e9')]=function(_0xd627e8,_0xe0f07c){const _0x80f89a=this['_commandNameWindow'],_0x5cd929=$gameSystem['windowPadding'](),_0x4eb8fc=_0xe0f07c['x']+Math[_0x258a('0x32')](_0xe0f07c['width']/0x2)+_0x5cd929;_0x80f89a['x']=_0x80f89a[_0x258a('0x1c5')]/-0x2+_0x4eb8fc,_0x80f89a['y']=Math[_0x258a('0x32')](_0xe0f07c[_0x258a('0x259')]/0x2);},Window_ShopCommand[_0x258a('0x19a')]['maxCols']=function(){return this[_0x258a('0x1af')]?this[_0x258a('0x1af')][_0x258a('0x2a7')]:0x3;},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x299')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x3b6')][_0x258a('0xff')];},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x11b')]=function(){this[_0x258a('0x39b')](),this['addSellCommand'](),this[_0x258a('0x1f8')]();},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x16')]=function(){Window_HorzCommand[_0x258a('0x19a')]['refresh'][_0x258a('0x2b')](this),this[_0x258a('0x2a1')]();},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x39b')]=function(){const _0x1f60b0=this[_0x258a('0x266')](),_0x587ac1=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x3b6')][_0x258a('0x1a2')],_0x4bccbd=_0x1f60b0===_0x258a('0x1a5')?TextManager[_0x258a('0x1a6')]:_0x258a('0x1c3')[_0x258a('0x2c4')](_0x587ac1,TextManager[_0x258a('0x1a6')]),_0x50ba38=this[_0x258a('0x333')]();if(this['hideDisabledCommands']()&&!_0x50ba38)return;this[_0x258a('0x131')](_0x4bccbd,_0x258a('0x1a6'),_0x50ba38);},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x333')]=function(){return SceneManager[_0x258a('0x180')]['constructor']===Scene_Shop?SceneManager['_scene']['_goodsCount']>0x0:!![];},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x20c')]=function(){const _0x104e62=this[_0x258a('0x266')](),_0x230e15=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x3b6')][_0x258a('0x260')],_0xb021d3=_0x104e62===_0x258a('0x1a5')?TextManager[_0x258a('0x81')]:_0x258a('0x1c3')['format'](_0x230e15,TextManager[_0x258a('0x81')]),_0x382f7f=this[_0x258a('0x58')]();if(this[_0x258a('0x299')]()&&!_0x382f7f)return;this[_0x258a('0x131')](_0xb021d3,'sell',_0x382f7f);},Window_ShopCommand['prototype'][_0x258a('0x58')]=function(){return!this[_0x258a('0xf1')];},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x1f8')]=function(){const _0x4e501e=this[_0x258a('0x266')](),_0x278f25=VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x3b6')][_0x258a('0xaa')],_0x370c96=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x3b6')][_0x258a('0x2fb')],_0x40fce7=_0x4e501e===_0x258a('0x1a5')?_0x370c96:_0x258a('0x1c3')[_0x258a('0x2c4')](_0x278f25,_0x370c96);this[_0x258a('0x131')](_0x40fce7,'cancel');},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x21d')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['ShopScene']['CmdTextAlign'];},Window_ShopCommand['prototype'][_0x258a('0x3a5')]=function(_0x3d813c){const _0x3cad42=this['commandStyleCheck'](_0x3d813c);if(_0x3cad42===_0x258a('0x403'))this[_0x258a('0x33c')](_0x3d813c);else{if(_0x3cad42===_0x258a('0x54')){if(_0x258a('0x44')===_0x258a('0x2e4')){function _0x1c547e(){return _0x1e9498[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x3b6')][_0x258a('0x1c7')];}}else this[_0x258a('0x1e8')](_0x3d813c);}else Window_HorzCommand[_0x258a('0x19a')][_0x258a('0x3a5')]['call'](this,_0x3d813c);}},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x266')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x3b6')][_0x258a('0x341')];},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x1a9')]=function(_0x5ad30d){if(_0x5ad30d<0x0)return _0x258a('0x1a5');const _0x2cc619=this['commandStyle']();if(_0x2cc619!==_0x258a('0x214'))return _0x2cc619;else{if(this['maxItems']()>0x0){const _0x583874=this['commandName'](_0x5ad30d);if(_0x583874[_0x258a('0x22d')](/\\I\[(\d+)\]/i)){if('Ndfyh'!==_0x258a('0x366')){const _0x802110=this['itemLineRect'](_0x5ad30d),_0x5caf95=this[_0x258a('0x2b3')](_0x583874)[_0x258a('0x1c5')];if(_0x5caf95<=_0x802110[_0x258a('0x1c5')]){if(_0x258a('0x33f')!==_0x258a('0x25a'))return _0x258a('0x403');else{function _0x533f82(){const _0x2b9983=_0x258a('0x3b5');if(this['_customItemInfo'][_0x2b9983])return this[_0x258a('0x312')][_0x2b9983];const _0x41390a=_0x37a04b['ItemsEquipsCore'][_0x258a('0x27f')]['ItemScene'][_0x258a('0x80')];return _0x41390a['format'](_0x3e4666['numItems'](this[_0x258a('0xb')]));}}}else{if(_0x258a('0x194')===_0x258a('0x194'))return _0x258a('0x54');else{function _0x442871(){const _0x376294=_0x328590[_0x258a('0x3de')](this[_0x258a('0x91')]);_0x376294[_0x258a('0x2ff')]=!![],_0x376294[_0x258a('0x364')](this[_0x258a('0x2a6')],this[_0x258a('0x396')]()),this[_0x258a('0x1da')][_0x258a('0x39e')](_0x376294);}}}}else{function _0x2ec497(){this[_0x258a('0x3ec')]();}}}}}return _0x258a('0x1a5');},Window_ShopCommand[_0x258a('0x19a')]['drawItemStyleIconText']=function(_0x5579cd){const _0x51daa3=this[_0x258a('0x280')](_0x5579cd),_0x158d6c=this[_0x258a('0x390')](_0x5579cd),_0x147fe6=this['textSizeEx'](_0x158d6c)[_0x258a('0x1c5')];this[_0x258a('0x426')](this[_0x258a('0x32d')](_0x5579cd));const _0x30b115=this['itemTextAlign']();if(_0x30b115===_0x258a('0x47'))this[_0x258a('0x4b')](_0x158d6c,_0x51daa3['x']+_0x51daa3[_0x258a('0x1c5')]-_0x147fe6,_0x51daa3['y'],_0x147fe6);else{if(_0x30b115===_0x258a('0x161')){if('RLxIM'===_0x258a('0x1d1')){const _0x270a65=_0x51daa3['x']+Math[_0x258a('0x32')]((_0x51daa3[_0x258a('0x1c5')]-_0x147fe6)/0x2);this['drawTextEx'](_0x158d6c,_0x270a65,_0x51daa3['y'],_0x147fe6);}else{function _0x3b164e(){const _0x5b5e54=0x0,_0x2bf5ba=this[_0x258a('0x19b')](),_0x42a707=_0x221bd4[_0x258a('0x111')],_0x5bab7b=this[_0x258a('0x369')]();return new _0x2df57a(_0x5b5e54,_0x2bf5ba,_0x42a707,_0x5bab7b);}}}else{if(_0x258a('0x3f8')===_0x258a('0x3f8'))this[_0x258a('0x4b')](_0x158d6c,_0x51daa3['x'],_0x51daa3['y'],_0x147fe6);else{function _0x106bb9(){if(this[_0x258a('0x2ff')]){const _0xdac608=_0x3c0014['makeDeepCopy'](this);_0xdac608[_0x258a('0x2ff')]=!![],_0x580382[_0x258a('0xc5')][_0x258a('0x1ad')][_0x258a('0x2b')](this,_0x19a229,_0x4cfeb4),this[_0x258a('0x3f3')](_0xdac608);}else _0x46564e[_0x258a('0xc5')]['Game_Actor_changeEquip'][_0x258a('0x2b')](this,_0x2fca29,_0x4e86cc);}}}}},Window_ShopCommand[_0x258a('0x19a')][_0x258a('0x1e8')]=function(_0x3ca852){this[_0x258a('0x390')](_0x3ca852)[_0x258a('0x22d')](/\\I\[(\d+)\]/i);const _0x5da1bc=Number(RegExp['$1'])||0x0,_0x50077a=this[_0x258a('0x280')](_0x3ca852),_0x5674de=_0x50077a['x']+Math[_0x258a('0x32')]((_0x50077a[_0x258a('0x1c5')]-ImageManager[_0x258a('0x3f6')])/0x2),_0x2ecb4a=_0x50077a['y']+(_0x50077a['height']-ImageManager[_0x258a('0x11')])/0x2;this[_0x258a('0x3b0')](_0x5da1bc,_0x5674de,_0x2ecb4a);},VisuMZ[_0x258a('0xc5')][_0x258a('0x61')]=Window_ShopBuy[_0x258a('0x19a')][_0x258a('0x16')],Window_ShopBuy[_0x258a('0x19a')][_0x258a('0x16')]=function(){this[_0x258a('0x349')](),VisuMZ[_0x258a('0xc5')]['Window_ShopBuy_refresh']['call'](this);},Window_ShopBuy[_0x258a('0x19a')][_0x258a('0x349')]=function(){if(SceneManager[_0x258a('0x180')][_0x258a('0xe1')]===Scene_Shop){if(_0x258a('0x2a2')!==_0x258a('0xde'))this['_money']=SceneManager[_0x258a('0x180')][_0x258a('0xe3')]();else{function _0xa9cf10(){return _0x1ceab1[_0x258a('0xc5')][_0x258a('0x1bd')][_0x258a('0x2b')](this);}}}},VisuMZ[_0x258a('0xc5')]['Window_ShopBuy_price']=Window_ShopBuy[_0x258a('0x19a')][_0x258a('0x4d')],Window_ShopBuy['prototype'][_0x258a('0x4d')]=function(_0x227702){if(!_0x227702)return 0x0;const _0xfcaf56=VisuMZ[_0x258a('0xc5')]['Window_ShopBuy_price'][_0x258a('0x2b')](this,_0x227702);return this[_0x258a('0xf0')](_0x227702,_0xfcaf56);},Window_ShopBuy[_0x258a('0x19a')][_0x258a('0xf0')]=function(_0xa0a1c6,_0x1d0760){const _0x297c6b=_0xa0a1c6[_0x258a('0x133')];if(_0x297c6b[_0x258a('0x22d')](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){if(_0x258a('0x209')===_0x258a('0x209')){const _0x122a8d=String(RegExp['$1']);try{eval(_0x122a8d);}catch(_0x3e5caa){if($gameTemp['isPlaytest']())console[_0x258a('0xae')](_0x3e5caa);}}else{function _0x1792ad(){return _0x57b549[_0x258a('0x180')][_0x258a('0x3eb')]()?0x1:0x2;}}}_0x1d0760=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['ShopScene'][_0x258a('0x1d5')][_0x258a('0x2b')](this,_0xa0a1c6,_0x1d0760);if(isNaN(_0x1d0760))_0x1d0760=0x0;return Math[_0x258a('0x32')](_0x1d0760);},Window_ShopBuy['prototype'][_0x258a('0x3a5')]=function(_0x3aebee){this['resetFontSettings']();const _0x3a4f1a=this['itemAt'](_0x3aebee),_0x2da4bd=this[_0x258a('0x4d')](_0x3a4f1a),_0x5dea69=TextManager[_0x258a('0x4f')],_0x3c0675=this[_0x258a('0x280')](_0x3aebee),_0x2dfef8=this[_0x258a('0x367')](),_0x3b6962=this[_0x258a('0x10b')](_0x5dea69),_0x4a7948=_0x3c0675['x']+_0x3c0675[_0x258a('0x1c5')]-_0x2dfef8-_0x3b6962,_0x4d27b8=_0x3c0675[_0x258a('0x1c5')]-_0x2dfef8-_0x3b6962;this[_0x258a('0x426')](this[_0x258a('0x34e')](_0x3a4f1a)),this[_0x258a('0x254')](_0x3a4f1a,_0x3c0675['x'],_0x3c0675['y'],_0x4d27b8),this[_0x258a('0xef')](_0x2da4bd,_0x4a7948,_0x3c0675['y'],_0x2dfef8,'right'),this[_0x258a('0x3ed')](ColorManager[_0x258a('0x114')]()),this['drawText'](_0x5dea69,_0x3c0675['x'],_0x3c0675['y'],_0x3c0675[_0x258a('0x1c5')],_0x258a('0x47')),this[_0x258a('0x426')](!![]);},Window_ShopSell['prototype'][_0x258a('0x185')]=function(){return SceneManager[_0x258a('0x180')][_0x258a('0x3eb')]()?0x1:0x2;},VisuMZ[_0x258a('0xc5')][_0x258a('0x1ff')]=Window_ShopSell[_0x258a('0x19a')][_0x258a('0x34e')],Window_ShopSell[_0x258a('0x19a')][_0x258a('0x34e')]=function(_0x3881c0){if(!_0x3881c0)return![];const _0x2f660c=_0x3881c0[_0x258a('0x133')];if(_0x2f660c[_0x258a('0x22d')](/<CANNOT SELL>/i))return![];if(_0x2f660c['match'](/<CAN SELL>/i))return!![];if(_0x2f660c[_0x258a('0x22d')](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('bKTmi'!==_0x258a('0x269')){const _0x5e97ce=JSON[_0x258a('0x3d9')]('['+RegExp['$1'][_0x258a('0x22d')](/\d+/g)+']');for(const _0x541e35 of _0x5e97ce){if(!$gameSwitches[_0x258a('0x24e')](_0x541e35))return![];}}else{function _0x481655(){const _0x15260a=_0x158187[_0x258a('0x399')][_0x258a('0x160')](_0x4f5619[_0x258a('0x13a')]());if(_0x15260a>0x0)_0x3dbc10[_0x258a('0x2ba')][_0x258a('0xc2')](_0x15260a);}}}if(_0x2f660c[_0x258a('0x22d')](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x532bbe=JSON[_0x258a('0x3d9')]('['+RegExp['$1'][_0x258a('0x22d')](/\d+/g)+']');for(const _0x251231 of _0x532bbe){if(!$gameSwitches[_0x258a('0x24e')](_0x251231))return![];}}if(_0x2f660c[_0x258a('0x22d')](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3d8e5a=JSON[_0x258a('0x3d9')]('['+RegExp['$1'][_0x258a('0x22d')](/\d+/g)+']');for(const _0x3dcca8 of _0x3d8e5a){if($gameSwitches[_0x258a('0x24e')](_0x3dcca8))return![];}}return VisuMZ[_0x258a('0xc5')]['Window_ShopSell_isEnabled']['call'](this,_0x3881c0);},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0xb6')]=function(){Window_StatusBase[_0x258a('0x19a')][_0x258a('0xb6')][_0x258a('0x2b')](this);for(const _0x1c2b63 of $gameParty[_0x258a('0x332')]()){ImageManager[_0x258a('0x3fd')](_0x1c2b63[_0x258a('0x402')]());}},Window_ShopStatus['prototype'][_0x258a('0x2b7')]=function(){return VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x258a('0x2e')];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x16')]=function(){this['contents'][_0x258a('0x237')](),this['contentsBack'][_0x258a('0x237')]();if(this[_0x258a('0xb')]){if(_0x258a('0x211')===_0x258a('0x211')){this[_0x258a('0x174')](),this['changePaintOpacity'](!![]),this[_0x258a('0xe')]();if(this[_0x258a('0x39')]()){if(_0x258a('0x2db')!==_0x258a('0x2db')){function _0x41b837(){_0x63a89[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x316')][_0x258a('0x25c')][_0x258a('0x2b')](this),this['drawParamsItemsEquipsCore']();}}else this[_0x258a('0x136')]();}else this[_0x258a('0x3f2')]();}else{function _0x8cf875(){_0x11fe73[_0x258a('0xc5')][_0x258a('0x371')][_0x258a('0x2b')](this,_0x32b87c),this[_0x258a('0x104')](_0x545264);}}}},Window_ShopStatus[_0x258a('0x19a')]['drawPossession']=function(_0x4d3889,_0x4a5076){if(!this[_0x258a('0x39')]()&&!DataManager['isItem'](this['_item']))return;const _0x2e1bfc=this[_0x258a('0x11e')]-this[_0x258a('0x3ca')]()-_0x4d3889,_0x333575=this[_0x258a('0x10b')](_0x258a('0xac'));this[_0x258a('0x3ed')](ColorManager[_0x258a('0x114')]()),this[_0x258a('0xef')](TextManager[_0x258a('0x33e')],_0x4d3889+this[_0x258a('0x3ca')](),_0x4a5076,_0x2e1bfc-_0x333575),this[_0x258a('0x52')](),this[_0x258a('0x321')](this[_0x258a('0xb')],_0x4d3889,_0x4a5076,_0x2e1bfc);},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x136')]=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x2ec')][_0x258a('0x2b')](this);},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x3cd')]=function(_0x42ea13,_0x17e9d9,_0x4aa82b){if(!this[_0x258a('0x39')]())return![];const _0x358185=$dataSystem[_0x258a('0x399')][this[_0x258a('0xb')][_0x258a('0x22e')]];return this['drawItemKeyData'](_0x358185,_0x42ea13,_0x17e9d9,_0x4aa82b,!![]),this['drawItemDarkRect'](_0x42ea13,_0x17e9d9,_0x4aa82b),this[_0x258a('0x174')](),!![];},Window_ShopStatus[_0x258a('0x19a')]['getItemQuantityText']=function(){const _0x3672d8=VisuMZ['ItemsEquipsCore']['Settings'][_0x258a('0x357')][_0x258a('0x80')];return _0x3672d8['format']($gameParty[_0x258a('0x41f')](this[_0x258a('0xb')]));},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x3d3')]=function(){return Imported[_0x258a('0x5c')]?VisuMZ[_0x258a('0x2d2')]['Settings'][_0x258a('0xcd')][_0x258a('0x15e')]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x1c6')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x398')];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x127')]=function(_0x4698f5,_0x3d8738,_0x3869fb,_0x51a374){this[_0x258a('0x174')](),this['contents'][_0x258a('0x436')]=this[_0x258a('0x1c6')]();let _0x931ce7=this[_0x258a('0x10b')](TextManager[_0x258a('0x224')](_0x4698f5))+0x4+_0x3d8738;if(Imported[_0x258a('0x5c')])this[_0x258a('0x424')](_0x3d8738,_0x3869fb,_0x51a374,_0x4698f5,!![]),VisuMZ['CoreEngine'][_0x258a('0x27f')][_0x258a('0xcd')][_0x258a('0x401')]&&(_0x931ce7+=ImageManager[_0x258a('0x3f6')]+0x4);else{if(_0x258a('0x39f')==='MGtkk'){function _0x25c2bd(){return this[_0x258a('0x3cc')](_0x16af98);}}else this[_0x258a('0x3ed')](ColorManager['systemColor']()),this['drawText'](TextManager[_0x258a('0x224')](_0x4698f5),_0x3d8738,_0x3869fb,_0x51a374);}return this[_0x258a('0x174')](),_0x931ce7;},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x36')]=function(_0x47515b,_0x449a77,_0x5885c8,_0x1ae63a,_0x142cdd){_0x5885c8+=this['itemPadding'](),_0x142cdd-=this[_0x258a('0x3ca')]()*0x2;const _0x5592d6=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')];this[_0x258a('0x393')][_0x258a('0x436')]=_0x5592d6['ParamChangeFontSize'],this[_0x258a('0x426')](_0x47515b[_0x258a('0x28a')](this['_item']));if(_0x47515b[_0x258a('0x88')](this[_0x258a('0xb')])){if(_0x258a('0x8a')!==_0x258a('0x8a')){function _0xe5f16c(){const _0x41fe4d=new _0x4bde26(0x0,0x0,_0x13e79a[_0x258a('0x1c5')],_0x28f360[_0x258a('0x259')]);this[_0x258a('0x296')]=new _0xf9f38c(_0x41fe4d),this['_commandNameWindow'][_0x258a('0x117')]=0x0,this[_0x258a('0x38b')](this[_0x258a('0x296')]),this[_0x258a('0x10f')]();}}else{const _0x182170=_0x5592d6[_0x258a('0x171')];this[_0x258a('0xef')](_0x182170,_0x5885c8,_0x1ae63a,_0x142cdd,_0x258a('0x161'));}}else{if(_0x47515b['canEquip'](this[_0x258a('0xb')])){const _0x5abc56=this['currentEquippedItem'](_0x47515b,this[_0x258a('0xb')][_0x258a('0x22e')]),_0x39d5e5=JsonEx[_0x258a('0x3de')](_0x47515b);_0x39d5e5[_0x258a('0x2ff')]=!![];const _0x2f2e97=_0x39d5e5[_0x258a('0x2ba')]()[_0x258a('0x160')](this['_item'][_0x258a('0x22e')]);if(_0x2f2e97>=0x0)_0x39d5e5[_0x258a('0x364')](_0x2f2e97,this['_item']);let _0x18935a=0x0,_0x219263=0x0,_0x29fee1=0x0;if(Imported[_0x258a('0x5c')]){if(_0x258a('0xbb')!==_0x258a('0x20e'))_0x18935a=_0x39d5e5[_0x258a('0x42c')](_0x449a77),_0x219263=_0x18935a-_0x47515b[_0x258a('0x42c')](_0x449a77),this[_0x258a('0x3ed')](ColorManager[_0x258a('0xb7')](_0x219263)),_0x29fee1=(_0x219263>=0x0?'+':'')+VisuMZ[_0x258a('0x2ca')](_0x219263,0x0);else{function _0x239179(){const _0x82458b=this[_0x258a('0x234')]['y']+this[_0x258a('0x234')][_0x258a('0x259')],_0x21cbaa=_0x50b5b6[_0x258a('0x111')]-this['statusWidth'](),_0x7a9e75=this[_0x258a('0x190')]()?_0x5d7d0a[_0x258a('0x111')]-_0x21cbaa:0x0,_0x328d59=this[_0x258a('0x3c7')]()-this['_commandWindow'][_0x258a('0x259')];return new _0x33cfc5(_0x7a9e75,_0x82458b,_0x21cbaa,_0x328d59);}}}else{if(_0x258a('0x50')===_0x258a('0x3c8')){function _0x261621(){const _0x5ed42c=this[_0x258a('0x3d5')]['y']+this[_0x258a('0x3d5')][_0x258a('0x259')],_0x4567a6=_0xbd20ce[_0x258a('0x111')]-this[_0x258a('0x2c1')](),_0x840361=this[_0x258a('0x3c7')]()-this[_0x258a('0x3d5')]['height'],_0x5a55d0=this[_0x258a('0x190')]()?_0x106ad9[_0x258a('0x111')]-_0x4567a6:0x0;return new _0x376ddc(_0x5a55d0,_0x5ed42c,_0x4567a6,_0x840361);}}else _0x18935a=_0x39d5e5['param'](_0x449a77),_0x219263=_0x18935a-_0x47515b[_0x258a('0x224')](_0x449a77),this[_0x258a('0x3ed')](ColorManager[_0x258a('0xb7')](_0x219263)),_0x29fee1=(_0x219263>=0x0?'+':'')+_0x219263;}if(_0x29fee1==='+0')_0x29fee1=_0x5592d6[_0x258a('0x24d')];this['drawText'](_0x29fee1,_0x5885c8,_0x1ae63a,_0x142cdd,_0x258a('0x161'));}else{const _0x232694=_0x5592d6[_0x258a('0x2e8')];this['drawText'](_0x232694,_0x5885c8,_0x1ae63a,_0x142cdd,_0x258a('0x161'));}}this[_0x258a('0x174')](),this[_0x258a('0x426')](!![]);},Window_ShopStatus[_0x258a('0x19a')]['drawItemData']=function(){VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x3e5')][_0x258a('0x2b')](this);},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0xe')]=function(){this[_0x258a('0x312')]={};if(!this['_item'])return;const _0xe3ff8c=this[_0x258a('0xb')][_0x258a('0x133')];if(_0xe3ff8c[_0x258a('0x22d')](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){if(_0x258a('0x29e')!=='ouHUS'){const _0x30d57a=String(RegExp['$1'])[_0x258a('0x1fe')](/[\r\n]+/);for(const _0x602de0 of _0x30d57a){if(_0x602de0[_0x258a('0x22d')](/(.*):[ ](.*)/i)){if(_0x258a('0x35c')===_0x258a('0x69')){function _0x5d15ef(){const _0x5889ae=this[_0x258a('0x18a')]();this[_0x258a('0x2d5')](_0x5889ae,_0x396033,_0x170c5e,_0x1c2499,!![]);const _0x421061=this[_0x258a('0x13c')]();return this[_0x258a('0x2d5')](_0x421061,_0x59301e,_0x11f382,_0x299b49,![],'right'),this[_0x258a('0x3f5')](_0x4b5dae,_0x133a22,_0x32661b),this['resetFontSettings'](),!![];}}else{const _0x2618e4=String(RegExp['$1'])[_0x258a('0x176')]()[_0x258a('0x13a')](),_0x2c5c49=String(RegExp['$2'])[_0x258a('0x13a')]();this[_0x258a('0x312')][_0x2618e4]=_0x2c5c49;}}}}else{function _0x483f29(){const _0xd36330=this[_0x258a('0x3ca')]();_0x40afbe[_0x258a('0x5c')]?this[_0x258a('0x424')](_0x535ab2+_0xd36330,_0x5883c3,_0x64b3b,_0x3c4e26,![]):this[_0x258a('0xef')](_0x25cb8c[_0x258a('0x224')](_0x568a29),_0x417c23+_0xd36330,_0x5148b3,_0x3cc060);}}}},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x9b')]=function(){return 0x16;},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x174')]=function(){Window_StatusBase[_0x258a('0x19a')][_0x258a('0x174')][_0x258a('0x2b')](this),this[_0x258a('0x393')][_0x258a('0x436')]=this[_0x258a('0x3d6')]||this[_0x258a('0x393')][_0x258a('0x436')],this[_0x258a('0x393')][_0x258a('0x96')]=this[_0x258a('0x3a2')]||this[_0x258a('0x393')][_0x258a('0x96')];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x3b8')]=function(){return this[_0x258a('0x393')][_0x258a('0x436')]/$gameSystem[_0x258a('0x233')]();},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x3b0')]=function(_0x267d49,_0x28e9da,_0x2435f4){const _0x25d7c2=ImageManager['loadSystem'](_0x258a('0x1f6')),_0xe3adb5=ImageManager[_0x258a('0x3f6')],_0x2917ea=ImageManager[_0x258a('0x11')],_0x4761d8=_0x267d49%0x10*_0xe3adb5,_0xb9c71e=Math[_0x258a('0x32')](_0x267d49/0x10)*_0x2917ea,_0x1e1c2b=Math[_0x258a('0xf2')](_0xe3adb5*this[_0x258a('0x3b8')]()),_0x3cf2f4=Math[_0x258a('0xf2')](_0x2917ea*this[_0x258a('0x3b8')]());this[_0x258a('0x393')][_0x258a('0x315')](_0x25d7c2,_0x4761d8,_0xb9c71e,_0xe3adb5,_0x2917ea,_0x28e9da,_0x2435f4,_0x1e1c2b,_0x3cf2f4);},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x105')]=function(_0x21308e,_0x1c451d){_0x1c451d['drawing']&&this[_0x258a('0x3b0')](_0x21308e,_0x1c451d['x'],_0x1c451d['y']+0x2);_0x1c451d['x']+=Math[_0x258a('0xf2')](ImageManager[_0x258a('0x3f6')]*this[_0x258a('0x3b8')]());if(this['fontSizeRatio']()===0x1)_0x1c451d['x']+=0x4;},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x2d5')]=function(_0x21a036,_0x3cc60f,_0x5327fe,_0x436f80,_0x2e386b,_0x57dfe9){_0x21a036=_0x21a036||'',_0x57dfe9=_0x57dfe9||_0x258a('0x89'),this[_0x258a('0x3d6')]=this[_0x258a('0x9b')](),this['_resetFontColor']=_0x2e386b?ColorManager[_0x258a('0x114')]():this['contents']['textColor'],_0x3cc60f+=this[_0x258a('0x3ca')](),_0x436f80-=this[_0x258a('0x3ca')]()*0x2;const _0x2d322b=this[_0x258a('0x2b3')](_0x21a036);if(_0x57dfe9===_0x258a('0x161'))_0x3cc60f=_0x3cc60f+Math[_0x258a('0x32')]((_0x436f80-_0x2d322b[_0x258a('0x1c5')])/0x2);else{if(_0x57dfe9===_0x258a('0x47')){if(_0x258a('0x3ff')===_0x258a('0x35')){function _0x1e1882(){const _0x69730a=_0x287aba[_0x258a('0x171')];this[_0x258a('0xef')](_0x69730a,_0x5b41ed,_0x2e00c2,_0x5be0f1,_0x258a('0x161'));}}else _0x3cc60f=_0x3cc60f+_0x436f80-_0x2d322b[_0x258a('0x1c5')];}}_0x5327fe+=(this[_0x258a('0x394')]()-_0x2d322b[_0x258a('0x259')])/0x2,this['drawTextEx'](_0x21a036,_0x3cc60f,_0x5327fe,_0x436f80),this[_0x258a('0x3d6')]=undefined,this[_0x258a('0x3a2')]=undefined,this[_0x258a('0x174')]();},Window_ShopStatus['prototype']['drawItemConsumable']=function(_0x1d7745,_0x222c5f,_0x485e1c){if(!DataManager[_0x258a('0x3df')](this[_0x258a('0xb')]))return![];const _0x2014c9=this[_0x258a('0x329')]();this[_0x258a('0x2d5')](_0x2014c9,_0x1d7745,_0x222c5f,_0x485e1c,!![]);const _0x54a839=this[_0x258a('0x2e7')]();return this[_0x258a('0x2d5')](_0x54a839,_0x1d7745,_0x222c5f,_0x485e1c,![],_0x258a('0x47')),this['drawItemDarkRect'](_0x1d7745,_0x222c5f,_0x485e1c),this[_0x258a('0x174')](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x329')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x189')];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x2e7')]=function(){const _0x21ca24=_0x258a('0x22a');if(this[_0x258a('0x312')][_0x21ca24])return this[_0x258a('0x312')][_0x21ca24];if(this['canConsumeItem']()){if('uSsGy'!=='dTqJk')return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x372')];else{function _0x504cee(){_0x118c23[_0x258a('0x271')](_0x258a('0x1ac'))&&!_0x5e6aa9[_0x258a('0xd')]('shift')&&this['cursorRight'](_0x229ff1[_0x258a('0x144')](_0x258a('0x1ac'))),_0x4a1597[_0x258a('0x271')](_0x258a('0x307'))&&!_0x3230f4[_0x258a('0xd')]('shift')&&this[_0x258a('0x65')](_0x4aefd5[_0x258a('0x144')](_0x258a('0x307')));}}}else{if(_0x258a('0xa8')!==_0x258a('0x294'))return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['StatusWindow'][_0x258a('0x1b7')];else{function _0xa697a8(){return this[_0x258a('0x234')]&&this[_0x258a('0x234')][_0x258a('0x2cc')]();}}}},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x265')]=function(){return VisuMZ['CoreEngine']&&VisuMZ[_0x258a('0x2d2')][_0x258a('0x27f')][_0x258a('0x30a')][_0x258a('0x3be')]&&DataManager[_0x258a('0x28b')](this['_item'])?![]:this['_item'][_0x258a('0x2')];},Window_ShopStatus['prototype'][_0x258a('0x2d9')]=function(_0x4e7bb5,_0x29de83,_0x891d31){if(!this[_0x258a('0x39')]()&&!DataManager[_0x258a('0x3df')](this[_0x258a('0xb')]))return![];if(DataManager[_0x258a('0x28b')](this[_0x258a('0xb')])&&!$dataSystem['optKeyItemsNumber']){const _0x13bcfa=TextManager[_0x258a('0x1fb')];this[_0x258a('0x2d5')](_0x13bcfa,_0x4e7bb5,_0x29de83,_0x891d31,!![],_0x258a('0x161'));}else{if(_0x258a('0x1b2')!==_0x258a('0x1b2')){function _0x2f43b1(){if(_0x4bf332)_0x181f3d+=this[_0x258a('0xa9')](_0xdd7586,_0x25869f);}}else{const _0x34b66c=TextManager[_0x258a('0x33e')];this['drawItemKeyData'](_0x34b66c,_0x4e7bb5,_0x29de83,_0x891d31,!![]);const _0x413299=this[_0x258a('0x57')]();this['drawItemKeyData'](_0x413299,_0x4e7bb5,_0x29de83,_0x891d31,![],_0x258a('0x47'));}}return this['drawItemDarkRect'](_0x4e7bb5,_0x29de83,_0x891d31),this[_0x258a('0x174')](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x57')]=function(){const _0x47f3ca='QUANTITY';if(this[_0x258a('0x312')][_0x47f3ca])return this[_0x258a('0x312')][_0x47f3ca];const _0x293295=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x357')][_0x258a('0x80')];return _0x293295[_0x258a('0x2c4')]($gameParty['numItems'](this[_0x258a('0xb')]));},Window_ShopStatus[_0x258a('0x19a')]['drawItemOccasion']=function(_0x761976,_0x2b246d,_0x4af2d1){const _0x46c5bf=this[_0x258a('0x7e')]();return this['drawItemKeyData'](_0x46c5bf,_0x761976,_0x2b246d,_0x4af2d1,![],_0x258a('0x161')),this[_0x258a('0x3f5')](_0x761976,_0x2b246d,_0x4af2d1),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x7e')]=function(){const _0x19026d=_0x258a('0x29f');if(this[_0x258a('0x312')][_0x19026d])return this[_0x258a('0x312')][_0x19026d];const _0x3c1ac5=VisuMZ[_0x258a('0xc5')]['Settings'][_0x258a('0x27b')],_0x535d40='Occasion%1'[_0x258a('0x2c4')](this[_0x258a('0xb')][_0x258a('0xb3')]);return _0x3c1ac5[_0x535d40];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0xad')]=function(_0x579e77,_0x5a5b75,_0x1b82fa){const _0x138dda=this[_0x258a('0x26e')]();return this[_0x258a('0x2d5')](_0x138dda,_0x579e77,_0x5a5b75,_0x1b82fa,![],_0x258a('0x161')),this[_0x258a('0x3f5')](_0x579e77,_0x5a5b75,_0x1b82fa),this[_0x258a('0x174')](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x26e')]=function(){const _0x740761=_0x258a('0x309');if(this[_0x258a('0x312')][_0x740761])return this[_0x258a('0x312')][_0x740761];const _0x3b16cb=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['StatusWindow'];if(Imported[_0x258a('0xc1')]){if(_0x258a('0x223')!==_0x258a('0xd7')){const _0x17d302=this[_0x258a('0xb')][_0x258a('0x133')];if(_0x17d302[_0x258a('0x22d')](/<TARGET:[ ](.*)>/i)){const _0x2350ac=String(RegExp['$1']);if(_0x2350ac[_0x258a('0x22d')](/(\d+) RANDOM ANY/i))return _0x3b16cb['ScopeRandomAny']['format'](Number(RegExp['$1']));else{if(_0x2350ac[_0x258a('0x22d')](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){if(_0x258a('0x24c')!==_0x258a('0x99'))return _0x3b16cb['ScopeRandomEnemies'][_0x258a('0x2c4')](Number(RegExp['$1']));else{function _0x4db7c9(){if(!_0xa157b0[_0x258a('0x24e')](_0x39ffe4))return![];}}}else{if(_0x2350ac['match'](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){if(_0x258a('0x10a')!==_0x258a('0xe7'))return _0x3b16cb[_0x258a('0x25b')][_0x258a('0x2c4')](Number(RegExp['$1']));else{function _0x196333(){if(this[_0x258a('0x36a')](_0xc5bced)){this[_0x258a('0x174')]();const _0xa07015=_0x5d71cd[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x357')],_0x356893=_0xa07015[_0x258a('0x80')],_0x512786=_0x356893[_0x258a('0x2c4')](_0x114fb1[_0x258a('0x41f')](_0x3710fb));this[_0x258a('0x393')][_0x258a('0x436')]=_0xa07015[_0x258a('0x188')],this[_0x258a('0xef')](_0x512786,_0x5e9c3a,_0x428278,_0x594e3d,'right'),this[_0x258a('0x174')]();}}}}else{if(_0x2350ac['match'](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x3b16cb[_0x258a('0x16f')];}}}}}else{function _0x5e9691(){const _0x48a30d=_0x4a848a(_0x597630['$1'])['toUpperCase']()[_0x258a('0x13a')](),_0x2416ba=_0x57b71b(_0x253e93['$2'])[_0x258a('0x13a')]();this[_0x258a('0x312')][_0x48a30d]=_0x2416ba;}}}const _0x427383='Scope%1'[_0x258a('0x2c4')](this['_item'][_0x258a('0xcb')]);return _0x3b16cb[_0x427383];},Window_ShopStatus['prototype']['drawItemSpeed']=function(_0x1b8059,_0x2ef2aa,_0x572b0a){const _0x47f2ab=this[_0x258a('0x3a8')]();this[_0x258a('0x2d5')](_0x47f2ab,_0x1b8059,_0x2ef2aa,_0x572b0a,!![]);const _0x953a84=this[_0x258a('0x1cb')]();return this[_0x258a('0x2d5')](_0x953a84,_0x1b8059,_0x2ef2aa,_0x572b0a,![],'right'),this['drawItemDarkRect'](_0x1b8059,_0x2ef2aa,_0x572b0a),this[_0x258a('0x174')](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x3a8')]=function(){return VisuMZ[_0x258a('0xc5')]['Settings'][_0x258a('0x27b')][_0x258a('0x437')];},Window_ShopStatus[_0x258a('0x19a')]['getItemSpeedText']=function(){const _0x44ae33=_0x258a('0x314');if(this[_0x258a('0x312')][_0x44ae33])return this[_0x258a('0x312')][_0x44ae33];const _0x515e56=this[_0x258a('0xb')][_0x258a('0x152')];if(_0x515e56>=0x7d0)return VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')]['StatusWindow'][_0x258a('0x149')];else{if(_0x515e56>=0x3e8){if(_0x258a('0x431')==='FtdXH')return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x438')];else{function _0x12f1e8(){_0xb979da=_0x8a7315||'',_0x5d0200=_0x1c089b||_0x258a('0x89'),this[_0x258a('0x3d6')]=this[_0x258a('0x9b')](),this[_0x258a('0x3a2')]=_0x338cbe?_0x2e2dfa[_0x258a('0x114')]():this[_0x258a('0x393')][_0x258a('0x96')],_0x2fc48c+=this[_0x258a('0x3ca')](),_0x8dd726-=this[_0x258a('0x3ca')]()*0x2;const _0x597fe5=this['textSizeEx'](_0x3ccf6b);if(_0x58633d===_0x258a('0x161'))_0xa124d2=_0xa95ec6+_0x101b83[_0x258a('0x32')]((_0xc1cf8c-_0x597fe5['width'])/0x2);else _0x2da3ec==='right'&&(_0xa04907=_0x4112df+_0x411cbb-_0x597fe5[_0x258a('0x1c5')]);_0x20990d+=(this[_0x258a('0x394')]()-_0x597fe5[_0x258a('0x259')])/0x2,this[_0x258a('0x4b')](_0x3fe629,_0x318885,_0x1dd92f,_0x3fe16c),this['_resetFontSize']=_0x1ce6e7,this[_0x258a('0x3a2')]=_0x465206,this[_0x258a('0x174')]();}}}else{if(_0x515e56>0x0)return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x172')];else{if(_0x515e56===0x0){if(_0x258a('0x26d')===_0x258a('0x169')){function _0x276ec9(){const _0x54bac0=this['_commandNameWindow'];_0x54bac0[_0x258a('0x393')][_0x258a('0x237')]();const _0x4c79c1=this[_0x258a('0x1a9')](this[_0x258a('0xf9')]());if(_0x4c79c1==='icon'){const _0x46fedf=this['itemLineRect'](this['index']());let _0x5be146=this[_0x258a('0x390')](this[_0x258a('0xf9')]());_0x5be146=_0x5be146[_0x258a('0x1')](/\\I\[(\d+)\]/gi,''),_0x54bac0[_0x258a('0x174')](),this['commandNameWindowDrawBackground'](_0x5be146,_0x46fedf),this[_0x258a('0x3d')](_0x5be146,_0x46fedf),this[_0x258a('0x3e9')](_0x5be146,_0x46fedf);}}}else return VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0xed')];}else{if(_0x515e56>-0x3e8){if(_0x258a('0x229')==='NJBYh'){function _0xb3233a(){return _0x258a('0x403');}}else return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x427')];}else{if(_0x515e56>-0x7d0)return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x37b')];else return _0x515e56<=-0x7d0?VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['StatusWindow'][_0x258a('0x1b5')]:_0x258a('0x279');}}}}}},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x106')]=function(_0x1efede,_0x2b1d9c,_0x148083){const _0x1c0c72=this[_0x258a('0x6c')]();this['drawItemKeyData'](_0x1c0c72,_0x1efede,_0x2b1d9c,_0x148083,!![]);const _0x494ddb=this[_0x258a('0x25e')]();return this[_0x258a('0x2d5')](_0x494ddb,_0x1efede,_0x2b1d9c,_0x148083,![],'right'),this[_0x258a('0x3f5')](_0x1efede,_0x2b1d9c,_0x148083),this[_0x258a('0x174')](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x6c')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['StatusWindow'][_0x258a('0x285')];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x25e')]=function(){const _0x13fddc='SUCCESS\x20RATE';if(this[_0x258a('0x312')][_0x13fddc])return this[_0x258a('0x312')][_0x13fddc];if(Imported[_0x258a('0xc1')]){if(_0x258a('0x19f')===_0x258a('0x9a')){function _0x5c6b57(){const _0x47af47=this[_0x258a('0xf9')](),_0x1dfb77=this[_0x258a('0x1aa')]();_0x1dfb77>=0x0&&_0x1dfb77!==this[_0x258a('0xf9')]()&&this[_0x258a('0x115')](_0x1dfb77),_0x1d84dd&&this[_0x258a('0xf9')]()!==_0x47af47&&this[_0x258a('0x40f')]();}}else{const _0x4910e4=this[_0x258a('0xb')]['note'];if(_0x4910e4[_0x258a('0x22d')](/<ALWAYS HIT>/i)){if('XTEcr'!==_0x258a('0x18e')){function _0x1dee46(){return _0x4e1beb[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x372')];}}else return _0x258a('0xdd');}else{if(_0x4910e4[_0x258a('0x22d')](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x258a('0x385')[_0x258a('0x2c4')](Number(RegExp['$1']));}}}return _0x258a('0x385')[_0x258a('0x2c4')](this[_0x258a('0xb')]['successRate']);},Window_ShopStatus[_0x258a('0x19a')]['drawItemRepeats']=function(_0x170ffe,_0x403435,_0x5a998f){const _0x2ca4b1=this[_0x258a('0x18a')]();this[_0x258a('0x2d5')](_0x2ca4b1,_0x170ffe,_0x403435,_0x5a998f,!![]);const _0x1348a4=this[_0x258a('0x13c')]();return this['drawItemKeyData'](_0x1348a4,_0x170ffe,_0x403435,_0x5a998f,![],_0x258a('0x47')),this[_0x258a('0x3f5')](_0x170ffe,_0x403435,_0x5a998f),this[_0x258a('0x174')](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x18a')]=function(){return VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x3a3')];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x13c')]=function(){const _0x40d4ff=_0x258a('0x62');if(this[_0x258a('0x312')][_0x40d4ff])return this[_0x258a('0x312')][_0x40d4ff];const _0x53d1e6=_0x258a('0x23');return _0x53d1e6[_0x258a('0x2c4')](this[_0x258a('0xb')][_0x258a('0x308')]);},Window_ShopStatus[_0x258a('0x19a')]['drawItemHitType']=function(_0x1e9467,_0x55af9b,_0xb9af4f){const _0x54ce26=this[_0x258a('0x417')]();this[_0x258a('0x2d5')](_0x54ce26,_0x1e9467,_0x55af9b,_0xb9af4f,!![]);const _0x5b26d6=this['getItemHitTypeText']();return this[_0x258a('0x2d5')](_0x5b26d6,_0x1e9467,_0x55af9b,_0xb9af4f,![],_0x258a('0x47')),this[_0x258a('0x3f5')](_0x1e9467,_0x55af9b,_0xb9af4f),this[_0x258a('0x174')](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x417')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x348')];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x102')]=function(){const _0x103c15=_0x258a('0x98');if(this[_0x258a('0x312')][_0x103c15])return this['_customItemInfo'][_0x103c15];const _0x31c48b=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')],_0x2c188d='HitType%1'[_0x258a('0x2c4')](this[_0x258a('0xb')][_0x258a('0x306')]);return _0x31c48b[_0x2c188d];},Window_ShopStatus['prototype']['drawItemDamage']=function(_0x3b39b9,_0x49d623,_0x21bc42){if(this[_0x258a('0xb')]['damage'][_0x258a('0x15d')]<=0x0)return _0x49d623;if(this['drawItemDamageElement'](_0x3b39b9,_0x49d623,_0x21bc42))_0x49d623+=this[_0x258a('0x394')]();if(this[_0x258a('0x2f7')](_0x3b39b9,_0x49d623,_0x21bc42))_0x49d623+=this[_0x258a('0x394')]();return this['resetFontSettings'](),_0x49d623;},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x173')]=function(_0x9f4241,_0xf5dc35,_0x46a5d0){const _0x6944b1=this[_0x258a('0xa3')]();this[_0x258a('0x2d5')](_0x6944b1,_0x9f4241,_0xf5dc35,_0x46a5d0,!![]);const _0xca0142=this[_0x258a('0x400')]();return this[_0x258a('0x2d5')](_0xca0142,_0x9f4241,_0xf5dc35,_0x46a5d0,![],_0x258a('0x47')),this[_0x258a('0x3f5')](_0x9f4241,_0xf5dc35,_0x46a5d0),this[_0x258a('0x174')](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0xa3')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x3ce')];},Window_ShopStatus['prototype'][_0x258a('0x400')]=function(){const _0x27a014=_0x258a('0x213');if(this[_0x258a('0x312')][_0x27a014])return this['_customItemInfo'][_0x27a014];if(this[_0x258a('0xb')]['damage'][_0x258a('0x240')]<=-0x1){if('GJlZb'!==_0x258a('0x3e8'))return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x439')];else{function _0x59f16d(){return this[_0x258a('0x5e')]();}}}else{if(this[_0x258a('0xb')]['damage']['elementId']===0x0){if(_0x258a('0x2c9')!=='OZxyl'){function _0x543b33(){this[_0x258a('0x3d5')][_0x258a('0x19c')]();}}else return VisuMZ[_0x258a('0xc5')]['Settings'][_0x258a('0x27b')][_0x258a('0x374')];}else return $dataSystem[_0x258a('0x2a0')][this[_0x258a('0xb')][_0x258a('0xf')][_0x258a('0x240')]];}},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x2f7')]=function(_0x54be4d,_0x4cf666,_0x86c32b){const _0x538c3b=this[_0x258a('0x31e')]();this[_0x258a('0x2d5')](_0x538c3b,_0x54be4d,_0x4cf666,_0x86c32b,!![]),this[_0x258a('0x2f4')]();const _0x2e9cb9=this[_0x258a('0xbc')](),_0x27ef52=ColorManager[_0x258a('0x17b')]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x258a('0xb')][_0x258a('0xf')][_0x258a('0x15d')]]);return this[_0x258a('0x3ed')](_0x27ef52),this[_0x258a('0x2d5')](_0x2e9cb9,_0x54be4d,_0x4cf666,_0x86c32b,![],_0x258a('0x47')),this[_0x258a('0x3f5')](_0x54be4d,_0x4cf666,_0x86c32b),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x31e')]=function(){if(Imported['VisuMZ_1_BattleCore']&&DataManager[_0x258a('0x128')](this[_0x258a('0xb')])!==_0x258a('0x2c3'))return this[_0x258a('0x19d')]();else{if(_0x258a('0x3fc')!=='oIYWd')return this[_0x258a('0xe5')]();else{function _0x3c2ab5(){const _0x1f6e00=_0x258a('0x247');if(this[_0x258a('0xbe')]['selfTP']===0x0&&!this[_0x258a('0x312')][_0x1f6e00])return![];const _0x4ff7e6=this[_0x258a('0x26b')]();this[_0x258a('0x2d5')](_0x4ff7e6,_0x3c2699,_0x3cb890,_0x3fb312,!![]);const _0xe305f0=this[_0x258a('0x30d')]();return this['_itemData'][_0x258a('0x191')]>0x0?this[_0x258a('0x3ed')](_0x4ef65c[_0x258a('0x216')]()):this[_0x258a('0x3ed')](_0x2f4174[_0x258a('0x197')]()),this[_0x258a('0x2d5')](_0xe305f0,_0xf06427,_0x537c2c,_0x5f3cb5,![],_0x258a('0x47')),this[_0x258a('0x3f5')](_0x124680,_0x2b993d,_0x299a35),this[_0x258a('0x174')](),!![];}}}},Window_ShopStatus[_0x258a('0x19a')]['getItemDamageAmountLabelOriginal']=function(){const _0x3fced7=VisuMZ[_0x258a('0xc5')]['Settings'][_0x258a('0x27b')],_0x1f0a10=_0x258a('0x36c')['format'](this[_0x258a('0xb')]['damage'][_0x258a('0x15d')]),_0x547f02=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x258a('0xb')][_0x258a('0xf')]['type']];return _0x3fced7[_0x1f0a10][_0x258a('0x2c4')](_0x547f02);},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x2f4')]=function(){const _0x5511ac=$gameActors[_0x258a('0x381')](0x1);this[_0x258a('0x435')]=JsonEx[_0x258a('0x3de')](_0x5511ac),this[_0x258a('0x1c')]=JsonEx['makeDeepCopy'](_0x5511ac);},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0xbc')]=function(){const _0x128270=_0x258a('0x31');if(this[_0x258a('0x312')][_0x128270])return this[_0x258a('0x312')][_0x128270];return Imported[_0x258a('0xc1')]&&DataManager['getDamageStyle'](this['_item'])!==_0x258a('0x2c3')?this['getItemDamageAmountTextBattleCore']():this[_0x258a('0x124')]();},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x124')]=function(){window['a']=this['_tempActorA'],window['b']=this[_0x258a('0x1c')],this[_0x258a('0x435')][_0x258a('0x3a6')](!![]),this['_tempActorB'][_0x258a('0x3a6')]([0x3,0x4][_0x258a('0x3e4')](this[_0x258a('0xb')][_0x258a('0xf')][_0x258a('0x15d')]));let _0x2a8379=this['_item'][_0x258a('0xf')][_0x258a('0x236')];try{const _0x410808=Math[_0x258a('0x103')](eval(_0x2a8379),0x0)/window['a'][_0x258a('0x5a')];return this['revertGlobalNamespaceVariables'](),isNaN(_0x410808)?_0x258a('0x279'):'%1%'[_0x258a('0x2c4')](Math[_0x258a('0x6e')](_0x410808*0x64));}catch(_0x361945){if($gameTemp['isPlaytest']()){if(_0x258a('0x31a')===_0x258a('0x31a'))console[_0x258a('0xae')](_0x258a('0x42b')[_0x258a('0x2c4')](this[_0x258a('0xb')][_0x258a('0x145')])),console[_0x258a('0xae')](_0x361945);else{function _0x12e003(){_0x116b55=_0x44fed3[_0x258a('0x103')](_0x3cff17||0x1,0x1);while(_0xfcf2a6--){_0x35a06d=_0x1677f3||this['lineHeight'](),this[_0x258a('0x393')]['paintOpacity']=0xa0;const _0x4ef69b=_0x557882['gaugeBackColor']();this[_0x258a('0x393')][_0x258a('0x277')](_0x4c0b83+0x1,_0x435ee4+0x1,_0x52ee2d-0x2,_0x56bb02-0x2,_0x4ef69b),this[_0x258a('0x393')][_0x258a('0x2a5')]=0xff;}}}}return this[_0x258a('0x2fa')](),_0x258a('0x279');}},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x2fa')]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x1e4')]=function(_0x289949,_0x159946,_0x3cd4e9){if(!this[_0x258a('0x2df')]())return _0x159946;if(this[_0x258a('0x3c3')](_0x289949,_0x159946,_0x3cd4e9))_0x159946+=this[_0x258a('0x394')]();if(this['drawItemEffectsMpRecovery'](_0x289949,_0x159946,_0x3cd4e9))_0x159946+=this[_0x258a('0x394')]();if(this['drawItemEffectsTpRecovery'](_0x289949,_0x159946,_0x3cd4e9))_0x159946+=this[_0x258a('0x394')]();if(this[_0x258a('0x34c')](_0x289949,_0x159946,_0x3cd4e9))_0x159946+=this['lineHeight']();if(this[_0x258a('0x40a')](_0x289949,_0x159946,_0x3cd4e9))_0x159946+=this[_0x258a('0x394')]();if(this['drawItemEffectsTpDamage'](_0x289949,_0x159946,_0x3cd4e9))_0x159946+=this[_0x258a('0x394')]();if(this[_0x258a('0x48')](_0x289949,_0x159946,_0x3cd4e9))_0x159946+=this['lineHeight']();if(this['drawItemEffectsAddedStatesBuffs'](_0x289949,_0x159946,_0x3cd4e9))_0x159946+=this[_0x258a('0x394')]();if(this[_0x258a('0xc3')](_0x289949,_0x159946,_0x3cd4e9))_0x159946+=this[_0x258a('0x394')]();return this['resetFontSettings'](),_0x159946;},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x2df')]=function(){let _0x5793e2=![];this[_0x258a('0xbe')]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};for(const _0x24d156 of this[_0x258a('0xb')][_0x258a('0x95')]){switch(_0x24d156[_0x258a('0x20b')]){case Game_Action['EFFECT_RECOVER_HP']:this[_0x258a('0xbe')][_0x258a('0x386')]+=_0x24d156[_0x258a('0x49')],this[_0x258a('0xbe')][_0x258a('0x3b1')]+=_0x24d156[_0x258a('0x150')],_0x5793e2=!![];break;case Game_Action['EFFECT_RECOVER_MP']:this[_0x258a('0xbe')]['rateMP']+=_0x24d156[_0x258a('0x49')],this[_0x258a('0xbe')][_0x258a('0x429')]+=_0x24d156[_0x258a('0x150')],_0x5793e2=!![];break;case Game_Action[_0x258a('0x18d')]:this[_0x258a('0xbe')][_0x258a('0x2a9')]+=_0x24d156[_0x258a('0x49')],_0x5793e2=!![];break;case Game_Action[_0x258a('0x208')]:this[_0x258a('0xbe')][_0x258a('0x1ae')][_0x258a('0xc2')](_0x24d156[_0x258a('0x408')]),_0x5793e2=!![];break;case Game_Action[_0x258a('0x344')]:this['_itemData'][_0x258a('0xd0')]['push'](_0x24d156[_0x258a('0x408')]),this[_0x258a('0xbe')][_0x258a('0xf5')]=!![],_0x5793e2=!![];break;case Game_Action[_0x258a('0x1a')]:this[_0x258a('0xbe')][_0x258a('0x165')][_0x24d156[_0x258a('0x408')]]+=0x1,_0x5793e2=!![];break;case Game_Action[_0x258a('0x1de')]:this[_0x258a('0xbe')][_0x258a('0x165')][_0x24d156['dataId']]-=0x1,_0x5793e2=!![];break;case Game_Action['EFFECT_REMOVE_BUFF']:this[_0x258a('0xbe')][_0x258a('0x238')][_0x258a('0xc2')](_0x24d156[_0x258a('0x408')]),this['_itemData']['removeStateBuffChanges']=!![],_0x5793e2=!![];break;case Game_Action[_0x258a('0x37e')]:this[_0x258a('0xbe')][_0x258a('0x384')][_0x258a('0xc2')](_0x24d156['dataId']),this[_0x258a('0xbe')]['removeStateBuffChanges']=!![],_0x5793e2=!![];break;}}if(this['_itemData'][_0x258a('0x1ae')][_0x258a('0x2a7')]>0x0)this['_itemData'][_0x258a('0x40c')]=!![];for(let _0xde3980=0x0;_0xde3980<this[_0x258a('0xbe')]['changeBuff'][_0x258a('0x2a7')];_0xde3980++){if(this[_0x258a('0xbe')][_0x258a('0x165')][_0xde3980]!==0x0)this[_0x258a('0xbe')][_0x258a('0x40c')]=!![];}this[_0x258a('0xb')][_0x258a('0x1d')]!==0x0&&(this[_0x258a('0xbe')][_0x258a('0x191')]=this[_0x258a('0xb')]['tpGain'],_0x5793e2=!![]);const _0x5ac46c=[_0x258a('0x3'),'MP\x20RECOVERY',_0x258a('0x31b'),_0x258a('0x250'),_0x258a('0x406'),_0x258a('0x3a7'),_0x258a('0x247'),_0x258a('0x56'),_0x258a('0x26a')];for(const _0xd856f0 of _0x5ac46c){if(this[_0x258a('0x312')][_0xd856f0]){_0x5793e2=!![];break;}}return _0x5793e2;},Window_ShopStatus[_0x258a('0x19a')]['drawItemEffectsHpRecovery']=function(_0xe8b3b,_0x5359d2,_0x2d900f){const _0x39cafd=_0x258a('0x3');if(this[_0x258a('0xbe')][_0x258a('0x386')]<=0x0&&this[_0x258a('0xbe')][_0x258a('0x3b1')]<=0x0&&!this[_0x258a('0x312')][_0x39cafd])return![];const _0x4556c0=this[_0x258a('0x153')]();this['drawItemKeyData'](_0x4556c0,_0xe8b3b,_0x5359d2,_0x2d900f,!![]);const _0x3a569c=this[_0x258a('0x151')]();return this[_0x258a('0x3ed')](ColorManager[_0x258a('0x17b')](0x1)),this[_0x258a('0x2d5')](_0x3a569c,_0xe8b3b,_0x5359d2,_0x2d900f,![],_0x258a('0x47')),this['drawItemDarkRect'](_0xe8b3b,_0x5359d2,_0x2d900f),this[_0x258a('0x174')](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x153')]=function(){const _0x595fe7=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x132')];return _0x595fe7[_0x258a('0x2c4')](TextManager['hp']);},Window_ShopStatus['prototype']['getItemEffectsHpRecoveryText']=function(){const _0xe9308a=_0x258a('0x3');if(this[_0x258a('0x312')][_0xe9308a])return this[_0x258a('0x312')][_0xe9308a];let _0x58388a='';if(this[_0x258a('0xbe')][_0x258a('0x386')]>0x0)_0x58388a+=_0x258a('0x2b1')[_0x258a('0x2c4')](Math[_0x258a('0x32')](this[_0x258a('0xbe')][_0x258a('0x386')]*0x64));if(this[_0x258a('0xbe')]['rateHP']>0x0&&this['_itemData'][_0x258a('0x3b1')]>0x0)_0x58388a+='\x20';if(this[_0x258a('0xbe')][_0x258a('0x3b1')]>0x0)_0x58388a+=_0x258a('0x34a')[_0x258a('0x2c4')](this[_0x258a('0xbe')][_0x258a('0x3b1')]);return _0x58388a;},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x17e')]=function(_0x3a17dc,_0x12530e,_0x39a5c3){const _0x22bea6=_0x258a('0x23d');if(this[_0x258a('0xbe')]['rateMP']<=0x0&&this[_0x258a('0xbe')]['flatMP']<=0x0&&!this[_0x258a('0x312')][_0x22bea6])return![];const _0x425e14=this[_0x258a('0x129')]();this[_0x258a('0x2d5')](_0x425e14,_0x3a17dc,_0x12530e,_0x39a5c3,!![]);const _0x2bef58=this['getItemEffectsMpRecoveryText']();return this[_0x258a('0x3ed')](ColorManager[_0x258a('0x17b')](0x3)),this[_0x258a('0x2d5')](_0x2bef58,_0x3a17dc,_0x12530e,_0x39a5c3,![],'right'),this[_0x258a('0x3f5')](_0x3a17dc,_0x12530e,_0x39a5c3),this[_0x258a('0x174')](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x129')]=function(){const _0x1e9fb5=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0xda')];return _0x1e9fb5[_0x258a('0x2c4')](TextManager['mp']);},Window_ShopStatus[_0x258a('0x19a')]['getItemEffectsMpRecoveryText']=function(){const _0x233342=_0x258a('0x23d');if(this[_0x258a('0x312')][_0x233342])return this[_0x258a('0x312')][_0x233342];let _0x29a271='';if(this[_0x258a('0xbe')][_0x258a('0x3c9')]>0x0)_0x29a271+=_0x258a('0x2b1')[_0x258a('0x2c4')](Math[_0x258a('0x32')](this[_0x258a('0xbe')][_0x258a('0x3c9')]*0x64));if(this['_itemData'][_0x258a('0x3c9')]>0x0&&this[_0x258a('0xbe')][_0x258a('0x429')]>0x0)_0x29a271+='\x20';if(this[_0x258a('0xbe')][_0x258a('0x429')]>0x0)_0x29a271+='+%1'[_0x258a('0x2c4')](this[_0x258a('0xbe')]['flatMP']);return _0x29a271;},Window_ShopStatus['prototype'][_0x258a('0x24b')]=function(_0x555dd0,_0x58a581,_0x1ccfba){const _0x3df31b='TP\x20RECOVERY';if(this[_0x258a('0xbe')]['gainTP']<=0x0&&!this['_customItemInfo'][_0x3df31b])return![];const _0x10728c=this[_0x258a('0x2cd')]();this[_0x258a('0x2d5')](_0x10728c,_0x555dd0,_0x58a581,_0x1ccfba,!![]);const _0x577685=this[_0x258a('0x350')]();return this[_0x258a('0x3ed')](ColorManager[_0x258a('0x216')]()),this[_0x258a('0x2d5')](_0x577685,_0x555dd0,_0x58a581,_0x1ccfba,![],_0x258a('0x47')),this[_0x258a('0x3f5')](_0x555dd0,_0x58a581,_0x1ccfba),this[_0x258a('0x174')](),!![];},Window_ShopStatus['prototype'][_0x258a('0x2cd')]=function(){const _0x420d99=VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x27b')]['LabelRecoverTP'];return _0x420d99['format'](TextManager['tp']);},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x350')]=function(){const _0x460d3e=_0x258a('0x31b');if(this[_0x258a('0x312')][_0x460d3e])return this['_customItemInfo'][_0x460d3e];let _0x2a7928='';return _0x2a7928+=_0x258a('0x34a')[_0x258a('0x2c4')](this[_0x258a('0xbe')][_0x258a('0x2a9')]),_0x2a7928;},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x48')]=function(_0x5a9d7e,_0x3d6e5a,_0x329979){const _0x5d8f1a=_0x258a('0x247');if(this[_0x258a('0xbe')][_0x258a('0x191')]===0x0&&!this[_0x258a('0x312')][_0x5d8f1a])return![];const _0x172f15=this[_0x258a('0x26b')]();this[_0x258a('0x2d5')](_0x172f15,_0x5a9d7e,_0x3d6e5a,_0x329979,!![]);const _0x32454e=this[_0x258a('0x30d')]();return this[_0x258a('0xbe')][_0x258a('0x191')]>0x0?this[_0x258a('0x3ed')](ColorManager[_0x258a('0x216')]()):this[_0x258a('0x3ed')](ColorManager[_0x258a('0x197')]()),this[_0x258a('0x2d5')](_0x32454e,_0x5a9d7e,_0x3d6e5a,_0x329979,![],_0x258a('0x47')),this[_0x258a('0x3f5')](_0x5a9d7e,_0x3d6e5a,_0x329979),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x258a('0x26b')]=function(){const _0x1823c3=VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x27b')]['LabelSelfGainTP'];return _0x1823c3[_0x258a('0x2c4')](TextManager['tp']);},Window_ShopStatus['prototype'][_0x258a('0x30d')]=function(){const _0x2485f9=_0x258a('0x247');if(this['_customItemInfo'][_0x2485f9])return this[_0x258a('0x312')][_0x2485f9];let _0x9b9d58='';if(this[_0x258a('0xbe')][_0x258a('0x191')]>0x0){if(_0x258a('0x1d4')==='hHERT'){function _0x346d27(){const _0x506a35=_0x258a('0x29f');if(this[_0x258a('0x312')][_0x506a35])return this[_0x258a('0x312')][_0x506a35];const _0x322332=_0x308eca['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x27b')],_0x53d3d8='Occasion%1'[_0x258a('0x2c4')](this[_0x258a('0xb')][_0x258a('0xb3')]);return _0x322332[_0x53d3d8];}}else _0x9b9d58+=_0x258a('0x34a')[_0x258a('0x2c4')](this[_0x258a('0xbe')][_0x258a('0x191')]);}else _0x9b9d58+='%1'['format'](this[_0x258a('0xbe')][_0x258a('0x191')]);return _0x9b9d58;},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x34c')]=function(_0x28d714,_0x4a3180,_0x4460d7){const _0x4d938b=_0x258a('0x250');if(this[_0x258a('0xbe')][_0x258a('0x386')]>=0x0&&this[_0x258a('0xbe')][_0x258a('0x3b1')]>=0x0&&!this[_0x258a('0x312')][_0x4d938b])return![];const _0x28af58=this[_0x258a('0x281')]();this[_0x258a('0x2d5')](_0x28af58,_0x28d714,_0x4a3180,_0x4460d7,!![]);const _0x2f7824=this[_0x258a('0x22b')]();return this[_0x258a('0x3ed')](ColorManager[_0x258a('0x17b')](0x0)),this[_0x258a('0x2d5')](_0x2f7824,_0x28d714,_0x4a3180,_0x4460d7,![],'right'),this['drawItemDarkRect'](_0x28d714,_0x4a3180,_0x4460d7),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x281')]=function(){const _0x347e42=VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x27b')]['LabelDamageHP'];return _0x347e42[_0x258a('0x2c4')](TextManager['hp']);},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x22b')]=function(){const _0x217fc8=_0x258a('0x250');if(this['_customItemInfo'][_0x217fc8])return this[_0x258a('0x312')][_0x217fc8];let _0x47472d='';if(this['_itemData'][_0x258a('0x386')]<0x0)_0x47472d+=_0x258a('0x385')[_0x258a('0x2c4')](Math[_0x258a('0x32')](this[_0x258a('0xbe')][_0x258a('0x386')]*0x64));if(this[_0x258a('0xbe')][_0x258a('0x386')]<0x0&&this[_0x258a('0xbe')][_0x258a('0x3b1')]<0x0)_0x47472d+='\x20';if(this[_0x258a('0xbe')][_0x258a('0x3b1')]<0x0)_0x47472d+='%1'[_0x258a('0x2c4')](this['_itemData'][_0x258a('0x3b1')]);return _0x47472d;},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x40a')]=function(_0x4dc91c,_0x5897a1,_0x34aff9){const _0x4bcf84=_0x258a('0x406');if(this['_itemData'][_0x258a('0x3c9')]>=0x0&&this[_0x258a('0xbe')][_0x258a('0x429')]>=0x0&&!this['_customItemInfo'][_0x4bcf84])return![];const _0x5a848c=this[_0x258a('0x242')]();this['drawItemKeyData'](_0x5a848c,_0x4dc91c,_0x5897a1,_0x34aff9,!![]);const _0x14b5c4=this[_0x258a('0x3ac')]();return this[_0x258a('0x3ed')](ColorManager[_0x258a('0x17b')](0x2)),this[_0x258a('0x2d5')](_0x14b5c4,_0x4dc91c,_0x5897a1,_0x34aff9,![],_0x258a('0x47')),this[_0x258a('0x3f5')](_0x4dc91c,_0x5897a1,_0x34aff9),this[_0x258a('0x174')](),!![];},Window_ShopStatus['prototype'][_0x258a('0x242')]=function(){const _0x4ceb9e=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['StatusWindow'][_0x258a('0xea')];return _0x4ceb9e[_0x258a('0x2c4')](TextManager['mp']);},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x3ac')]=function(){const _0x2df2ef=_0x258a('0x406');if(this[_0x258a('0x312')][_0x2df2ef])return this[_0x258a('0x312')][_0x2df2ef];let _0x590bdd='';if(this[_0x258a('0xbe')][_0x258a('0x3c9')]<0x0)_0x590bdd+=_0x258a('0x385')[_0x258a('0x2c4')](Math[_0x258a('0x32')](this['_itemData'][_0x258a('0x3c9')]*0x64));if(this[_0x258a('0xbe')]['rateMP']<0x0&&this[_0x258a('0xbe')][_0x258a('0x429')]<0x0)_0x590bdd+='\x20';if(this[_0x258a('0xbe')][_0x258a('0x429')]<0x0)_0x590bdd+='%1'[_0x258a('0x2c4')](this[_0x258a('0xbe')][_0x258a('0x429')]);return _0x590bdd;},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x298')]=function(_0x23d3b1,_0x364805,_0x549742){const _0x16fabf=_0x258a('0x3a7');if(this[_0x258a('0xbe')][_0x258a('0x2a9')]>=0x0&&!this['_customItemInfo'][_0x16fabf])return![];const _0x1eff2e=this['getItemEffectsTpDamageLabel']();this[_0x258a('0x2d5')](_0x1eff2e,_0x23d3b1,_0x364805,_0x549742,!![]);const _0x37a026=this[_0x258a('0x87')]();return this[_0x258a('0x3ed')](ColorManager['powerDownColor']()),this[_0x258a('0x2d5')](_0x37a026,_0x23d3b1,_0x364805,_0x549742,![],_0x258a('0x47')),this[_0x258a('0x3f5')](_0x23d3b1,_0x364805,_0x549742),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x13f')]=function(){const _0x28eed3=VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')]['StatusWindow'][_0x258a('0x139')];return _0x28eed3[_0x258a('0x2c4')](TextManager['tp']);},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x87')]=function(){const _0x2dab95=_0x258a('0x3a7');if(this[_0x258a('0x312')][_0x2dab95])return this[_0x258a('0x312')][_0x2dab95];let _0x1b2f71='';return _0x1b2f71+='%1'[_0x258a('0x2c4')](this['_itemData'][_0x258a('0x2a9')]),_0x1b2f71;},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x68')]=function(_0x359fc8,_0x41c31c,_0xd600a7){const _0x379727=_0x258a('0x56');if(!this[_0x258a('0xbe')][_0x258a('0x40c')]&&!this[_0x258a('0x312')][_0x379727])return![];const _0x1d5671=this['getItemEffectsAddedStatesBuffsLabel']();this[_0x258a('0x2d5')](_0x1d5671,_0x359fc8,_0x41c31c,_0xd600a7,!![]);const _0x58e1be=this['getItemEffectsAddedStatesBuffsText']();return this[_0x258a('0x2d5')](_0x58e1be,_0x359fc8,_0x41c31c,_0xd600a7,![],'right'),this[_0x258a('0x3f5')](_0x359fc8,_0x41c31c,_0xd600a7),this[_0x258a('0x174')](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x2a3')]=function(){return VisuMZ[_0x258a('0xc5')][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x123')];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x2ac')]=function(){const _0x4a7468=_0x258a('0x56');if(this[_0x258a('0x312')][_0x4a7468])return this[_0x258a('0x312')][_0x4a7468];let _0x2fcd75='',_0x450a55=0x0;const _0x182771=0x8;for(const _0x1791d6 of this[_0x258a('0xbe')][_0x258a('0x1ae')]){const _0x4a902f=$dataStates[_0x1791d6];if(_0x4a902f&&_0x4a902f[_0x258a('0x71')]>0x0){_0x2fcd75+=_0x258a('0x24a')[_0x258a('0x2c4')](_0x4a902f['iconIndex']),_0x450a55++;if(_0x450a55>=_0x182771)return _0x2fcd75;}}for(let _0x3d08c6=0x0;_0x3d08c6<this[_0x258a('0xbe')][_0x258a('0x165')]['length'];_0x3d08c6++){const _0x35f028=this[_0x258a('0xbe')][_0x258a('0x165')][_0x3d08c6],_0x1fdb90=Game_BattlerBase[_0x258a('0x19a')][_0x258a('0x355')](_0x35f028,_0x3d08c6);if(_0x1fdb90>0x0){if(_0x258a('0x3d4')!==_0x258a('0x275')){_0x2fcd75+='\x5cI[%1]'[_0x258a('0x2c4')](_0x1fdb90),_0x450a55++;if(_0x450a55>=_0x182771)return _0x2fcd75;}else{function _0x4f6d63(){!_0x29d830&&this[_0x258a('0x323')](null,_0x859934);if(!this[_0x258a('0x2ff')]){const _0x2a1cc9=_0x3014af['makeDeepCopy'](this);_0x2a1cc9[_0x258a('0x2ff')]=!![],this[_0x258a('0x38d')][_0x512f40][_0x258a('0x1e2')](null),this[_0x258a('0x3f3')](_0x2a1cc9);}else this[_0x258a('0x38d')][_0x51e868]['setObject'](null);_0xafb0dc=!![];}}}}return _0x2fcd75;},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0xc3')]=function(_0x4fb368,_0xee1ad4,_0x1a3fa6){const _0x3fbd6d='REMOVED\x20EFFECTS';if(!this['_itemData'][_0x258a('0xf5')]&&!this[_0x258a('0x312')][_0x3fbd6d])return![];const _0x5dc892=this[_0x258a('0x1c2')]();this[_0x258a('0x2d5')](_0x5dc892,_0x4fb368,_0xee1ad4,_0x1a3fa6,!![]);const _0x424c9f=this[_0x258a('0x228')]();return this[_0x258a('0x2d5')](_0x424c9f,_0x4fb368,_0xee1ad4,_0x1a3fa6,![],'right'),this[_0x258a('0x3f5')](_0x4fb368,_0xee1ad4,_0x1a3fa6),this[_0x258a('0x174')](),!![];},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x1c2')]=function(){return VisuMZ['ItemsEquipsCore']['Settings'][_0x258a('0x27b')][_0x258a('0x313')];},Window_ShopStatus[_0x258a('0x19a')]['getItemEffectsRemovedStatesBuffsText']=function(){const _0x55df57='REMOVED\x20EFFECTS';if(this['_customItemInfo'][_0x55df57])return this[_0x258a('0x312')][_0x55df57];let _0x182856='',_0x11707d=0x0;const _0x2f9477=VisuMZ['ItemsEquipsCore'][_0x258a('0x27f')][_0x258a('0x27b')][_0x258a('0x23a')];for(const _0x3db3f4 of this[_0x258a('0xbe')][_0x258a('0xd0')]){if(_0x258a('0x1c0')===_0x258a('0x1c0')){const _0x32a756=$dataStates[_0x3db3f4];if(_0x32a756&&_0x32a756[_0x258a('0x71')]>0x0){_0x182856+=_0x258a('0x24a')[_0x258a('0x2c4')](_0x32a756[_0x258a('0x71')]),_0x11707d++;if(_0x11707d>=_0x2f9477)return _0x182856;}}else{function _0x1c0c07(){const _0x1572d1=this['equipSlots']();for(let _0x533a1a=0x0;_0x533a1a<_0x1572d1[_0x258a('0x2a7')];_0x533a1a++){if(!this[_0x258a('0x38d')][_0x533a1a])this[_0x258a('0x38d')][_0x533a1a]=new _0x568831();}this[_0x258a('0x377')](![]),this[_0x258a('0x16')]();}}}for(let _0x5552b3=0x0;_0x5552b3<this[_0x258a('0xbe')][_0x258a('0x238')][_0x258a('0x2a7')];_0x5552b3++){const _0x92ab64=Game_BattlerBase[_0x258a('0x19a')][_0x258a('0x355')](0x1,_0x5552b3);if(_0x92ab64>0x0){_0x182856+=_0x258a('0x24a')[_0x258a('0x2c4')](_0x92ab64),_0x11707d++;if(_0x11707d>=_0x2f9477)return _0x182856;}}for(let _0x4b96a8=0x0;_0x4b96a8<this[_0x258a('0xbe')]['removeDebuff'][_0x258a('0x2a7')];_0x4b96a8++){const _0x2b3f7f=Game_BattlerBase[_0x258a('0x19a')][_0x258a('0x355')](-0x1,_0x4b96a8);if(_0x2b3f7f>0x0){_0x182856+=_0x258a('0x24a')['format'](_0x2b3f7f),_0x11707d++;if(_0x11707d>=_0x2f9477)return _0x182856;}}return _0x182856;},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x13')]=function(_0x2fe5e1,_0x1a57a1,_0x2138cd){if(this['_item'][_0x258a('0x133')][_0x258a('0x22d')](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0xac6296=String(RegExp['$1'])[_0x258a('0x1fe')](/[\r\n]+/);for(const _0x115f7d of _0xac6296){if(_0x258a('0x1e0')==='RUgFC'){if(_0x115f7d[_0x258a('0x22d')](/(.*):[ ](.*)/i)){const _0x83b539=String(RegExp['$1'])[_0x258a('0x13a')](),_0xe1c0c7=String(RegExp['$2'])[_0x258a('0x13a')]();this[_0x258a('0x1ce')](_0x83b539,_0xe1c0c7,_0x2fe5e1,_0x1a57a1,_0x2138cd),_0x1a57a1+=this[_0x258a('0x394')]();}}else{function _0x2d77a8(){return!![];}}}}return this[_0x258a('0x174')](),_0x1a57a1;},Window_ShopStatus[_0x258a('0x19a')][_0x258a('0x1ce')]=function(_0x23dc91,_0x26b479,_0x12ab69,_0xdb46dd,_0x45e7cd){this[_0x258a('0x2d5')](_0x23dc91,_0x12ab69,_0xdb46dd,_0x45e7cd,!![]),this[_0x258a('0x2d5')](_0x26b479,_0x12ab69,_0xdb46dd,_0x45e7cd,![],_0x258a('0x47')),this['drawItemDarkRect'](_0x12ab69,_0xdb46dd,_0x45e7cd),this['resetFontSettings']();};