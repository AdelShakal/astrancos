//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.01] [MainMenuCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Main Menu Core plugin is designed to give you more control over the Main
 * Menu outside of RPG Maker MZ's editor's control. Game devs are given control
 * over how commands work, visual aesthetics pertaining to the Main Menu, and 
 * assign menu images to actors as background portraits.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general Main Menu settings.
 * * The ability to set Menu Background Portraits for individual actors.
 * * Flexibility in changing which commands appear in the Main Menu.
 * * Add new windows like the Playtime Window and Variable windows.
 * * Change the style of how the windows are arranged in the Main Menu.
 * * Change the way the status list is displayed and the way it's displayed.
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * <Menu Image: filename>
 *
 * - Used for: Actor
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
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
 * Actor: Change Menu Image (Group)
 * Actor: Change Menu Image (Range)
 * Actor: Change Menu Image (JS)
 * - Changes the actor's Menu Image.
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Step 1: Actor:
 *   - Select which ID(s) to affect.
 *
 *     Single:
 *     - Select which specific ID to affect.
 *
 *     Variable Reference:
 *     - Which variable is used to determine which ID to affect?
 *
 *     Range Start:
 *     - Select where the ID range begins.
 *
 *     Range End:
 *     - Select where the ID range ends.
 *
 *     Group:
 *     - Select which group of ID(s) to affect.
 *
 *     JavaScript:
 *     - JavaScript code to return an array on which ID(s) to affect.
 *
 *   Step 2: Target:
 *   - Select operation on what to change the switch(es) to.
 *   - Depending on what you pick here, one of the following actions are used
 *     in combination with the ID's picked from Step 1.
 *
 *     Filename:
 *     - Selected actor(s) will have their menu images changed to this.
 *
 *     Variable Reference:
 *     - Select the variable used to determine filename used for the selected
 *       actor(s).
 *
 *     JavaScript:
 *     - JavaScript code to determine what filename is used for the selected
 *       actor(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These general settings contain various settings on how the Main Menu scene
 * displays certain windows, alters how specific windows behave, and determines
 * which scenes would display actor menu images as background portraits.
 *
 * ---
 *
 * Gold Window
 * 
 *   Thinner Gold Window:
 *   - Make the Gold Window thinner in the Main Menu?
 *   - Used to match the Playtime and Variable Windows.
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
 *
 * ---
 *
 * Solo Party
 *
 *   Solo Quick Mode:
 *   - When selecting "Skills", "Equip", or "Status" with one party member,
 *     immediately go to the scene.
 *
 * ---
 *
 * Sub Menus
 *
 *   Menus with Actor BG's:
 *   - A list of the menus that would be compatible with Actor Menu Backgrounds
 *
 *   JS: Actor BG Action:
 *   - Code used to determine how to display the sprites upon loading.
 *
 * ---
 * 
 * Party Window
 * 
 *   Show Reserve Memebers:
 *   - Show reserve members while on the Main Menu scene?
 * 
 *   Hide Main Menu Only
 *   - If reserve members are hidden, hide them only in the main menu or
 *     all scenes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window List
 * ============================================================================
 *
 * The Command Window functions as a hub to the various scenes linked from the
 * Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
 * so on. This Plugin Parameter is an array that lets you add, remove, and/or
 * alter the Command Window's various commands, how they're handled, whether or
 * not they're visible, and how they react when selected.
 *
 * These will require knowledge of JavaScript to use them properly.
 *
 * ---
 *
 * Command Window List
 * 
 *   Symbol:
 *   - The symbol used for this command.
 *
 *   Icon:
 *   - Icon used for this command.
 *   - Use 0 for no icon.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 *   JS: Personal Code:
 *   - JavaScript code that runs once the actor list is selected with this
 *     command highlighted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Playtime Window
 * ============================================================================
 *
 * The Playtime Window is an optional feature that can be displayed in the
 * Main Menu. As its name suggests, it displays the playtime of the player's
 * current play through.
 *
 * ---
 *
 * Playtime Window
 * 
 *   Enable:
 *   - Use the Playtime Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Playtime Window?
 *
 *   Background Type:
 *   - Select background type for the Playtime window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Playtime window.
 * 
 *   Time Icon:
 *   - Icon displayed for the 'Time' label.
 * 
 *   Time Text:
 *   - Text for the display of 'Time' in the Playtime window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Playtime window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Variable Window
 * ============================================================================
 *
 * The Variable Window is an optional feature that can be displayed in the
 * Main Menu. If enabled, the Variable Window will display variables of the
 * game dev's choice in the Main Menu itself.
 *
 * ---
 *
 * Variable Window
 * 
 *   Enable:
 *   - Use the Variable Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Variable Window?
 *
 *   Background Type:
 *   - Select background type for the Variable window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Variable window.
 * 
 *   Variable List:
 *   - Select variables to be displayed into the window.
 *     Use \i[x] to determine their icon.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Variable window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window Style & Command Style Settings
 * ============================================================================
 *
 * This determines how the Main Menu appears based on the Command Window Style.
 * If anything but the 'Default' is used, then these settings will take over
 * the window placement settings for the Main Menu. This means that even if you
 * are using VisuStella's Core Engine, the window layouts will be overwritten.
 *
 * ---
 *
 * Command Window Style:
 * - Choose the positioning and style of the Main Menu Command Window.
 * - This will automatically rearrange windows.
 * 
 *   Default Vertical Side Style:
 *   - The default Main Menu layout style.
 *   - Affected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Top Horizontal Style:
 *   - Puts the Command Window at the top of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 *   Bottom Horizontal Style:
 *   - Puts the Command Window at the bottom of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the top.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Mobile Full Screen Style:
 *   - Puts the Command Window at the center of the screen with larger buttons.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is hidden until prompted to be selected.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 * ---
 *
 * Command Style Settings
 *
 *   Style:
 *   - How do you wish to draw command entries in the Command Window?
 *   - Text Only: displays only text.
 *   - Icon Only: displays only the icon.
 *   - Icon + Text: displays icon first, then text.
 *   - Automatic: determines the best fit for the size
 *
 *   Text Alignment:
 *   - Decide how you want the text to be aligned.
 *   - Left, Center, or Right
 * 
 *   Rows:
 *   - Number of visible rows.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Mobile Thickness:
 *   - The thickness of the buttons for mobile version.
 *   - Applies only to Top, Bottom, and Mobile styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Graphic, Status List Style, & List Style Settings
 * ============================================================================
 *
 * Choose how the contents Actor Status List Window in the Main Menu appears.
 * This can range from the which actor graphic is drawn to the style used for
 * the data that's displayed.
 *
 * ---
 *
 * Status Graphic:
 * - Choose how the graphic for actor graphics appear in status-like menus.
 * 
 *   None:
 *   - Don't display any graphic for the actors.
 * 
 *   Face:
 *   - Display the actors' faces. This is the default option in RPG Maker MZ.
 *
 *   Map Sprite:
 *   - Display the actors' map sprites.
 * 
 *   Sideview Battler:
 *   - Display the actors' sideview battlers.
 *
 * ---
 *
 * Main Menu List Style
 * - Choose how the actor status list looks in the Main Menu.
 *
 * Inner-Menu List Style
 * - Choose how the actor status list looks in the inner menus like Scene_Item,
 *   Scene_Skill, etc.
 *
 *   Default Horizontal Style:
 *   - This is the default style found in RPG Maker MZ's Main Menu.
 *
 *   Vertical Style:
 *   - Makes the display for the actor list vertical instead of horizontal.
 *
 *   Portrait Style:
 *   - Similar to the vertical style, except each actor's Menu Image is
 *     displayed in the background instead. Portraits are required.
 *
 *   Solo Style:
 *   - Used for solo party member games. Extends the whole view of the Status
 *     Window to accomodate a single actor.
 *
 *   Thin Horizontal Style:
 *   - Makes the selectable menu entries for the actors a single line thin.
 *
 *   Thicker Horizontal Style:
 *   - Makes the selectable menu entries for the actors two lines thick.
 *
 * ---
 *
 * List Styles
 *   JavaScript code used to determine how the individual styles are drawn.
 *
 *   JS: Default:
 *   JS: Vertical:
 *   JS: Portrait:
 *   JS: Solo:
 *   JS: Thin:
 *   JS: Thicker:
 *   - Code used to draw the data for these styles.
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.01:
 * * Bug Fixes!
 * ** Skill check plugin parameter for show fixed. Fixed by Yanfly and Shaz.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Command Window List > skill >
 *     JS: Show > and changing 'this.needsCommand("item")' to
 *     'this.needsCommand("skill")'
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
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Changes the actor's Menu Image.
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
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
 * @param MainMenuCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param ParamBreak1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the Main Menu.
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @parent StatusListStyle:str
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the inner menus
 * like Scene_Item, Scene_Skill, etc.
 * @default default
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 144) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 144) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 144) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
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
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this command.
 * Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this menu command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @parent GoldWindow
 * @type boolean
 * @on Thinner
 * @off Normal
 * @desc Make the Gold Window thinner in the Main Menu?
 * Used to match the Playtime and Variable Windows.
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 *
 * @param SoloParty
 * @text Solo Party
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @parent SoloParty
 * @type boolean
 * @on Quick
 * @off Normal
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 *
 * @param SubMenus
 * @text Sub Menus
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @parent SubMenus
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @parent SubMenus
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text Party Window
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @parent PartyWindow
 * @type boolean
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @parent ShowReserve:eval
 * @type boolean
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Playtime Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Playtime Window?
 * @default true
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Playtime window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Playtime window.
 * Default: 26
 * @default 20
 *
 * @param Icon:num
 * @text Time Icon
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Variable Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Variable Window?
 * @default false
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Variable window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Variable window.
 * Default: 26
 * @default 20
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window.
 * Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Horizontal Command Window Style
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text Command Style
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
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @min 1
 * @desc Number of visible rows.
 * @default 2
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 4
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @min 1
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 144) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 144) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 144) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
//=============================================================================

const _0x434b=['QvfBJ','_commandWindow','characterIndex','General','onPersonalCancel','vertical','callUpdateHelp','commandName','activate','parse','ARRAYFUNC','Scene_Menu_commandFormation','includes','updateCommandNameWindow','faceHeight','addWindow','max','drawItemActorFace','maxVisibleItems','shift','drawItemStyleIconText','AutoGoldHeight','commandWindowRectThinTopStyle','commandStyle','formation','iconHeight','_statusWindow','drawPendingItemBackground','VuLPR','STRUCT','sNUJr','luWLR','_dummyWindow','CustomCmdWin','index','adjustStatusWindowMobile','getMenuImage','drawItemImage','Game_Actor_setup','_playtimeText','goIqF','_scene','itemRect','itemLineRect','Step2','Scene_Menu_commandPersonal','return\x200','Window_MenuCommand_initialize','createPlaytimeWindow','ARRAYSTRUCT','graphicType','calcWindowHeight','lloPX','createVariableWindow','close','ChangeActorMenuImageRange','width','fwMTL','constructor','IZwiy','commandWindowRect','ShowJS','goldWindowRectBottomStyle','exit','ThinGoldWindow','addOriginalCommands','ChangeActorMenuImageGroup','ARRAYJSON','update','drawItemStatusPortraitStyleOnLoad','Ixjjz','pHFmh','Scene_Menu_commandWindowRect','commandWindowRectTopStyle','needsDummyWindow','addChild','mainAreaTop','VerticalStyle','_actor','reserveCommonEvent','TextStr','onBitmapLoad','goldWindowRectTopStyle','svbattler','isSoloQuickMode','addMainCommands','loadFaceImages','DefaultStyle','onPersonalOk','thinTop','Zumbc','canCreatePlaytimeWindow','save','svActorVertCells','thicker','gYSbB','currentExt','default','format','Playtime','clear','BkGae','PortraitStyle','RUOst','XBXsV','iwuFL','itemHeight','VarList','loadSvActor','FontSize','commandNameWindowDrawBackground','Icon','AdjustCommandHeight','EVAL','portrait','map','Variable','isBigCharacter','sprite','Settings','toUpperCase','MainMenuCore','bottom','updatePosition','contents','itemTextAlign','addSymbolBridge','drawItemStatusThinStyle','drawItemActorMenuImage','drawTextEx','FUNC','updateOpacity','ExtJS','yGphe','addFormationCommand','setBackgroundType','Scene_Menu_onFormationCancel','commandWindowStyle','ChangeActorMenuImageJS','mainAreaHeight','EPWjK','xLrgF','boxHeight','DjQDZ','giYRR','addLoadListener','AutoGoldY','setHandler','Scene_Menu_create','statusWindowRectTopStyle','EsxHn','variables','playtimeWindowRectBottomStyle','ListStyles','Scene_Menu_createStatusWindow','commandStyleCheck','BuAob','item','TaZbH','Step1End','_bitmapReady','_targetX','frsEV','variableWindowRectBottomStyle','Wlidn','right','playtimeText','updateTimer','members','drawItemStyleIcon','commandWindowRectMobileStyle','SoloStyle','characterName','ConvertParams','variableWindowRect','drawPlaytime','actor','MZBoU','CallHandlerJS','value','initMenuImage','_commandNameWindow','goldWindowRect','Step1Start','thin','match','adjustCommandHeightByPlaytime','Window_MenuStatus_maxItems','loadCharacter','fill','drawSvActor','feWmN','ThickerStyle','xUcRa','pOyyD','MYVAj','faceWidth','_playtimeWindow','thinGoldWindow','playtimeWindowRect','WWqpp','min','setMenuImage','commandPersonal','ActorBgMenus','oOGax','icon','TbRxx','setup','drawTimeIcon','addCommand','_timer','Scene_MenuBase_updateActor','DpNLY','textSizeEx','ActorBgMenuJS','EeFjD','isExpGaugeDrawn','Scene_Menu_statusWindowRect','call','refresh','loadOtherActorImages','commandNameWindowCenter','maxBattleMembers','floor','CommandWindowStyle','inKya','QNEZJ','windowPadding','statusWindowRect','name','addOptionsCommand','nujXh','loadBitmap','isCommandEnabled','opacity','isDisplayActorMenuBackgroundImage','addGameEndCommand','BgType','Enable','Untitled','createCommandWindow','hlzQh','playtimeWindowRectTopStyle','epIxp','iconText','KwmxS','drawItemStatusSoloStyle','makeMainMenuCoreCommandList','StatusGraphic','registerCommand','iconWidth','statusWindowRectBottomStyle','updateActor','_list','concat','setTargetActor','SrSqd','mainCommandWidth','updateDuration','colSpacing','adjustCommandHeightByVariable','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','drawIcon','changeTextColor','CEcTh','options','ThinStyle','drawTimeLabel','text','drawItem','createActorMenuBackgroundImageSprite','WindowRect','commandWindowRectThinBottomStyle','STR','setActor','note','drawItemStatusSoloStyleOnLoad','ARRAYEVAL','kjDIp','yUdbN','\x5cI[%1]%2','drawActorFace','battlerName','Rows','OPDvb','hTsCZ','makeCommandList','drawItemActorSprite','listStyle','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','TwquF','_actorMenuBgSprite','commandFormation','bind','InnerMenuListStyle','currentSymbol','StatusListStyle','Window_StatusBase_loadFaceImages','version','addSaveCommand','Scene_Menu_goldWindowRect','Qgfng','NUM','onFormationCancel','drawItemStatusThickerStyle','length','maxCols','bitmap','resetTextColor','Symbol','height','drawItemStatus','drawItemActorSvBattler','PersonalHandlerJS','ARRAYNUM','_commandList','svActorHorzCells','innerWidth','drawItemStatusPortraitStyle','createCommandNameWindow','thinBottom','createBackground','round','changePaintOpacity','_variableWindow','Scene_Menu_onPersonalCancel','JSON','_data','create','openness','_duration','top','systemColor','TextAlign','innerHeight','solo','loadPicture','replace','commandNameWindowDrawText','createDummyWindow','center','left','dQiSD','blt','_goldWindow','popScene','canCreateVariableWindow','_menuImage','fittingHeight','Scene_MenuBase_createBackground','description','Window_MenuStatus_drawItemImage','cLFOj','drawText','lineHeight','trim','drawItemStatusVerticalStyle','variableWindowRectTopStyle','SWQYA','ShowReserve','VKQTW','ceil','initialize','prototype','maxItems','applyThinnerGoldWindowRect','HideMainMenuOnly','open','MobileThickness','statusWindowRectMobileStyle','isArray','hHawv','EnableJS','mainAreaBottom','fontSize','none','commandWindowRectBottomStyle','boxWidth','drawItemBackground','resetFontSettings','isBattleMember','filter','mobile'];(function(_0x1a739c,_0x434b3c){const _0x1cd517=function(_0x168f71){while(--_0x168f71){_0x1a739c['push'](_0x1a739c['shift']());}};_0x1cd517(++_0x434b3c);}(_0x434b,0xd3));const _0x1cd5=function(_0x1a739c,_0x434b3c){_0x1a739c=_0x1a739c-0x0;let _0x1cd517=_0x434b[_0x1a739c];return _0x1cd517;};var label='MainMenuCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1cd5('0xab')](function(_0x325b1d){return _0x325b1d['status']&&_0x325b1d['description'][_0x1cd5('0xb9')]('['+label+']');})[0x0];VisuMZ[label][_0x1cd5('0x124')]=VisuMZ[label][_0x1cd5('0x124')]||{},VisuMZ['ConvertParams']=function(_0x7b0533,_0x349011){for(const _0x2a5af0 in _0x349011){if(_0x1cd5('0xa1')!==_0x1cd5('0x84')){if(_0x2a5af0[_0x1cd5('0x166')](/(.*):(.*)/i)){const _0x160a9f=String(RegExp['$1']),_0x2ae8f5=String(RegExp['$2'])[_0x1cd5('0x125')]()[_0x1cd5('0x91')]();let _0x65a12c,_0x34d2fe,_0x21d3e4;switch(_0x2ae8f5){case _0x1cd5('0x5c'):_0x65a12c=_0x349011[_0x2a5af0]!==''?Number(_0x349011[_0x2a5af0]):0x0;break;case _0x1cd5('0x68'):_0x34d2fe=_0x349011[_0x2a5af0]!==''?JSON[_0x1cd5('0xb6')](_0x349011[_0x2a5af0]):[],_0x65a12c=_0x34d2fe[_0x1cd5('0x120')](_0x28315e=>Number(_0x28315e));break;case _0x1cd5('0x11e'):_0x65a12c=_0x349011[_0x2a5af0]!==''?eval(_0x349011[_0x2a5af0]):null;break;case _0x1cd5('0x43'):_0x34d2fe=_0x349011[_0x2a5af0]!==''?JSON['parse'](_0x349011[_0x2a5af0]):[],_0x65a12c=_0x34d2fe[_0x1cd5('0x120')](_0x42b039=>eval(_0x42b039));break;case _0x1cd5('0x74'):_0x65a12c=_0x349011[_0x2a5af0]!==''?JSON[_0x1cd5('0xb6')](_0x349011[_0x2a5af0]):'';break;case _0x1cd5('0xf0'):_0x34d2fe=_0x349011[_0x2a5af0]!==''?JSON[_0x1cd5('0xb6')](_0x349011[_0x2a5af0]):[],_0x65a12c=_0x34d2fe['map'](_0x382580=>JSON[_0x1cd5('0xb6')](_0x382580));break;case _0x1cd5('0x12f'):_0x65a12c=_0x349011[_0x2a5af0]!==''?new Function(JSON['parse'](_0x349011[_0x2a5af0])):new Function(_0x1cd5('0xdb'));break;case _0x1cd5('0xb7'):_0x34d2fe=_0x349011[_0x2a5af0]!==''?JSON[_0x1cd5('0xb6')](_0x349011[_0x2a5af0]):[],_0x65a12c=_0x34d2fe[_0x1cd5('0x120')](_0xee90fb=>new Function(JSON[_0x1cd5('0xb6')](_0xee90fb)));break;case _0x1cd5('0x3f'):_0x65a12c=_0x349011[_0x2a5af0]!==''?String(_0x349011[_0x2a5af0]):'';break;case'ARRAYSTR':_0x34d2fe=_0x349011[_0x2a5af0]!==''?JSON[_0x1cd5('0xb6')](_0x349011[_0x2a5af0]):[],_0x65a12c=_0x34d2fe[_0x1cd5('0x120')](_0x444356=>String(_0x444356));break;case _0x1cd5('0xca'):_0x21d3e4=_0x349011[_0x2a5af0]!==''?JSON[_0x1cd5('0xb6')](_0x349011[_0x2a5af0]):{},_0x7b0533[_0x160a9f]={},VisuMZ[_0x1cd5('0x15a')](_0x7b0533[_0x160a9f],_0x21d3e4);continue;case _0x1cd5('0xde'):_0x34d2fe=_0x349011[_0x2a5af0]!==''?JSON[_0x1cd5('0xb6')](_0x349011[_0x2a5af0]):[],_0x65a12c=_0x34d2fe['map'](_0x244649=>VisuMZ['ConvertParams']({},JSON[_0x1cd5('0xb6')](_0x244649)));break;default:continue;}_0x7b0533[_0x160a9f]=_0x65a12c;}}else{function _0x3fcf1d(){if(this[_0x1cd5('0x89')]===_0x509da8)this[_0x1cd5('0x161')]();return this[_0x1cd5('0x89')];}}}return _0x7b0533;},(_0x316730=>{const _0x494ad8=_0x316730[_0x1cd5('0x13')];for(const _0x1e0ea8 of dependencies){if(_0x1cd5('0xad')!==_0x1cd5('0xad')){function _0x540c52(){return _0x4d5346[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0x110')][_0x1cd5('0x3d')][_0x1cd5('0x8')](this);}}else{if(!Imported[_0x1e0ea8]){if(_0x1cd5('0x50')!==_0x1cd5('0x50')){function _0x29ee13(){this[_0x1cd5('0xfb')]=_0x193899,this['loadBitmap']();}}else{alert(_0x1cd5('0x4f')[_0x1cd5('0x10f')](_0x494ad8,_0x1e0ea8)),SceneManager['exit']();break;}}}}const _0x4b16c2=_0x316730[_0x1cd5('0x8c')];if(_0x4b16c2[_0x1cd5('0x166')](/\[Version[ ](.*?)\]/i)){const _0x602e42=Number(RegExp['$1']);_0x602e42!==VisuMZ[label][_0x1cd5('0x58')]&&(alert(_0x1cd5('0x33')[_0x1cd5('0x10f')](_0x494ad8,_0x602e42)),SceneManager['exit']());}if(_0x4b16c2[_0x1cd5('0x166')](/\[Tier[ ](\d+)\]/i)){const _0x40b856=Number(RegExp['$1']);_0x40b856<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1cd5('0x10f')](_0x494ad8,_0x40b856,tier)),SceneManager[_0x1cd5('0xec')]()):tier=Math['max'](_0x40b856,tier);}VisuMZ[_0x1cd5('0x15a')](VisuMZ[label][_0x1cd5('0x124')],_0x316730['parameters']);})(pluginData),PluginManager[_0x1cd5('0x27')](pluginData[_0x1cd5('0x13')],_0x1cd5('0xef'),_0x256e8f=>{VisuMZ[_0x1cd5('0x15a')](_0x256e8f,_0x256e8f);const _0x30e8ea=_0x256e8f['Step1'],_0x1c6cd7=_0x256e8f[_0x1cd5('0xd9')];for(let _0x4ce5b6 of _0x30e8ea){_0x4ce5b6=parseInt(_0x4ce5b6)||0x0;if(_0x4ce5b6<=0x0)continue;const _0x396ff7=$gameActors[_0x1cd5('0x15d')](_0x4ce5b6);if(!_0x396ff7)continue;_0x396ff7[_0x1cd5('0x177')](_0x1c6cd7);}}),PluginManager[_0x1cd5('0x27')](pluginData['name'],_0x1cd5('0xe4'),_0x54546f=>{VisuMZ[_0x1cd5('0x15a')](_0x54546f,_0x54546f);const _0x4760fd=_0x54546f[_0x1cd5('0x14c')]>=_0x54546f[_0x1cd5('0x164')]?_0x54546f[_0x1cd5('0x164')]:_0x54546f[_0x1cd5('0x14c')],_0x31b6bb=_0x54546f[_0x1cd5('0x14c')]>=_0x54546f[_0x1cd5('0x164')]?_0x54546f[_0x1cd5('0x14c')]:_0x54546f[_0x1cd5('0x164')],_0x34deb5=Array(_0x31b6bb-_0x4760fd+0x1)[_0x1cd5('0x16a')]()[_0x1cd5('0x120')]((_0x538b13,_0x56e57a)=>_0x4760fd+_0x56e57a),_0x34a0f7=_0x54546f['Step2'];for(let _0x1783e8 of _0x34deb5){_0x1783e8=parseInt(_0x1783e8)||0x0;if(_0x1783e8<=0x0)continue;const _0x114955=$gameActors[_0x1cd5('0x15d')](_0x1783e8);if(!_0x114955)continue;_0x114955[_0x1cd5('0x177')](_0x34a0f7);}}),PluginManager[_0x1cd5('0x27')](pluginData[_0x1cd5('0x13')],_0x1cd5('0x137'),_0x113a05=>{VisuMZ['ConvertParams'](_0x113a05,_0x113a05);const _0x5a06e7=_0x113a05['Step1'];let _0xc9404d=[];while(_0x5a06e7[_0x1cd5('0x5f')]>0x0){const _0x4026d3=_0x5a06e7[_0x1cd5('0xc0')]();Array[_0x1cd5('0xa0')](_0x4026d3)?_0xc9404d=_0xc9404d[_0x1cd5('0x2c')](_0x4026d3):_0xc9404d['push'](_0x4026d3);}const _0x9006ff=_0x113a05[_0x1cd5('0xd9')];for(let _0x4da375 of _0xc9404d){_0x4da375=parseInt(_0x4da375)||0x0;if(_0x4da375<=0x0)continue;const _0x539487=$gameActors[_0x1cd5('0x15d')](_0x4da375);if(!_0x539487)continue;_0x539487['setMenuImage'](_0x9006ff);}}),VisuMZ['MainMenuCore'][_0x1cd5('0xd3')]=Game_Actor[_0x1cd5('0x99')][_0x1cd5('0x17d')],Game_Actor[_0x1cd5('0x99')][_0x1cd5('0x17d')]=function(_0x28e7b2){VisuMZ[_0x1cd5('0x126')][_0x1cd5('0xd3')][_0x1cd5('0x8')](this,_0x28e7b2),this['initMenuImage']();},Game_Actor[_0x1cd5('0x99')][_0x1cd5('0x161')]=function(){this[_0x1cd5('0x89')]='',this['actor']()&&this['actor']()[_0x1cd5('0x41')][_0x1cd5('0x166')](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x1cd5('0x89')]=String(RegExp['$1']));},Game_Actor[_0x1cd5('0x99')][_0x1cd5('0xd1')]=function(){if(this['_menuImage']===undefined)this[_0x1cd5('0x161')]();return this[_0x1cd5('0x89')];},Game_Actor[_0x1cd5('0x99')][_0x1cd5('0x177')]=function(_0x38cff2){if(this[_0x1cd5('0x89')]===undefined)this[_0x1cd5('0x161')]();this[_0x1cd5('0x89')]=_0x38cff2;},Scene_MenuBase[_0x1cd5('0x99')][_0x1cd5('0x19')]=function(){return VisuMZ['MainMenuCore'][_0x1cd5('0x124')][_0x1cd5('0xb0')][_0x1cd5('0x179')]['includes'](this[_0x1cd5('0xe7')][_0x1cd5('0x13')]);},VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x8b')]=Scene_MenuBase[_0x1cd5('0x99')][_0x1cd5('0x6f')],Scene_MenuBase[_0x1cd5('0x99')][_0x1cd5('0x6f')]=function(){VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x8b')][_0x1cd5('0x8')](this),this[_0x1cd5('0x3c')]();},Scene_MenuBase[_0x1cd5('0x99')][_0x1cd5('0x3c')]=function(){this[_0x1cd5('0x51')]=new Sprite_MenuBackgroundActor(),this[_0x1cd5('0xf8')](this[_0x1cd5('0x51')]);},VisuMZ['MainMenuCore']['Scene_MenuBase_updateActor']=Scene_MenuBase[_0x1cd5('0x99')][_0x1cd5('0x2a')],Scene_MenuBase[_0x1cd5('0x99')][_0x1cd5('0x2a')]=function(){VisuMZ['MainMenuCore']['Scene_MenuBase_updateActor'][_0x1cd5('0x8')](this),this[_0x1cd5('0x19')]()&&this[_0x1cd5('0x51')]&&this[_0x1cd5('0x51')][_0x1cd5('0x40')](this[_0x1cd5('0xfb')]);},VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x141')]=Scene_Menu[_0x1cd5('0x99')]['create'],Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x76')]=function(){VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x141')][_0x1cd5('0x8')](this),this[_0x1cd5('0xdd')](),this['createVariableWindow'](),this[_0x1cd5('0x81')]();},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x1e')]=function(){const _0x3c91a4=this[_0x1cd5('0xe9')](),_0x40f654=new Window_MenuCommand(_0x3c91a4);_0x40f654[_0x1cd5('0x140')]('cancel',this[_0x1cd5('0x87')][_0x1cd5('0x53')](this)),this[_0x1cd5('0xbc')](_0x40f654),this[_0x1cd5('0xae')]=_0x40f654;},VisuMZ[_0x1cd5('0x126')][_0x1cd5('0xf5')]=Scene_Menu['prototype'][_0x1cd5('0xe9')],Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0xe9')]=function(){const _0x21fc8f=this[_0x1cd5('0x136')]();if(_0x21fc8f===_0x1cd5('0x79'))return this[_0x1cd5('0xf6')]();else{if(_0x21fc8f===_0x1cd5('0x106'))return this[_0x1cd5('0xc3')]();else{if(_0x21fc8f===_0x1cd5('0x127'))return this[_0x1cd5('0xa6')]();else{if(_0x21fc8f===_0x1cd5('0x6e')){if(_0x1cd5('0x132')!==_0x1cd5('0x13c'))return this[_0x1cd5('0x3e')]();else{function _0x1cfe50(){_0x447386[_0x1cd5('0x126')][_0x1cd5('0x141')][_0x1cd5('0x8')](this),this[_0x1cd5('0xdd')](),this[_0x1cd5('0xe2')](),this[_0x1cd5('0x81')]();}}}else{if(_0x21fc8f===_0x1cd5('0xac'))return this[_0x1cd5('0x157')]();else{if(_0x1cd5('0xc9')!==_0x1cd5('0xc9')){function _0x5d4e9c(){_0x1ee296[_0x1cd5('0x126')][_0x1cd5('0x1')]['call'](this),this[_0x1cd5('0x19')]()&&this['_actorMenuBgSprite']&&this[_0x1cd5('0x51')][_0x1cd5('0x40')](this[_0x1cd5('0xfb')]);}}else{const _0x17dad3=VisuMZ[_0x1cd5('0x126')][_0x1cd5('0xf5')][_0x1cd5('0x8')](this);return this['adjustDefaultCommandWindowRect'](_0x17dad3),_0x17dad3;}}}}}}},Scene_Menu[_0x1cd5('0x99')]['adjustDefaultCommandWindowRect']=function(_0x1ea9c0){if(this[_0x1cd5('0x167')]()){if(_0x1cd5('0x114')===_0x1cd5('0x114'))_0x1ea9c0[_0x1cd5('0x64')]-=this[_0x1cd5('0x174')]()['height'];else{function _0x1a4c85(){_0x452980[_0x1cd5('0x126')][_0x1cd5('0xdc')]['call'](this,_0x5bbc32),this[_0x1cd5('0x6d')](_0x4671a0);}}}if(this['adjustCommandHeightByVariable']()){if(_0x1cd5('0x1f')!==_0x1cd5('0x1f')){function _0x5a256a(){const _0x3b6a7f=_0x2aa473['y']+(this['lineHeight']()-_0x4d38ec['iconHeight'])/0x2;this[_0x1cd5('0x34')](_0x17557b,_0x17e7a['x'],_0x3b6a7f);const _0x4f140c=_0x52996e[_0x1cd5('0x28')]+0x4;_0x4bbd38['x']+=_0x4f140c,_0x3e8aa4[_0x1cd5('0xe5')]-=_0x4f140c;}}else _0x1ea9c0[_0x1cd5('0x64')]-=this[_0x1cd5('0x15b')]()[_0x1cd5('0x64')];}},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0xf6')]=function(){const _0x18d415=VisuMZ['MainMenuCore'][_0x1cd5('0x124')]['CustomCmdWin'][_0x1cd5('0x49')],_0x4ddabf=Graphics[_0x1cd5('0xa7')],_0x410a9c=this[_0x1cd5('0xe0')](_0x18d415,!![]),_0x4d2eab=0x0,_0x392da1=this[_0x1cd5('0xf9')]();return new Rectangle(_0x4d2eab,_0x392da1,_0x4ddabf,_0x410a9c);},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0xc3')]=function(){const _0x408ca4=VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0xce')]['Rows'],_0x521781=Graphics[_0x1cd5('0xa7')],_0x39e3c7=this['calcWindowHeight'](0x1,!![]),_0xbf1852=0x0,_0x3e0745=this[_0x1cd5('0xf9')]();return new Rectangle(_0xbf1852,_0x3e0745,_0x521781,_0x39e3c7);},Scene_Menu['prototype'][_0x1cd5('0xa6')]=function(){const _0x422cf2=VisuMZ['MainMenuCore'][_0x1cd5('0x124')][_0x1cd5('0xce')][_0x1cd5('0x49')],_0x42759e=Graphics[_0x1cd5('0xa7')],_0x1b997e=this[_0x1cd5('0xe0')](_0x422cf2,!![]),_0x400efa=0x0,_0x350560=this[_0x1cd5('0xa3')]()-_0x1b997e;return new Rectangle(_0x400efa,_0x350560,_0x42759e,_0x1b997e);},Scene_Menu[_0x1cd5('0x99')]['commandWindowRectThinBottomStyle']=function(){const _0x1d0236=VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0xce')]['Rows'],_0x628852=Graphics[_0x1cd5('0xa7')],_0x4a2c92=this[_0x1cd5('0xe0')](0x1,!![]),_0x191918=0x0,_0x10809f=this[_0x1cd5('0xa3')]()-_0x4a2c92;return new Rectangle(_0x191918,_0x10809f,_0x628852,_0x4a2c92);},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x157')]=function(){const _0x42137a=VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0xce')][_0x1cd5('0x49')],_0xb1a169=Graphics[_0x1cd5('0xa7')],_0x4eb7f0=Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0x8a')](_0x42137a),_0x4454dd=0x0,_0x2cdcf3=Math[_0x1cd5('0x70')]((Graphics[_0x1cd5('0x13b')]-_0x4eb7f0)/0x2);return new Rectangle(_0x4454dd,_0x2cdcf3,_0xb1a169,_0x4eb7f0);},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x136')]=function(){return VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0xe')];},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x173')]=function(){if(this[_0x1cd5('0x136')]()!==_0x1cd5('0x10e'))return!![];return VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0xb0')][_0x1cd5('0xed')];},Scene_Menu[_0x1cd5('0x99')]['createGoldWindow']=function(){const _0x5a9852=this[_0x1cd5('0x163')]();this[_0x1cd5('0x86')]=this[_0x1cd5('0x173')]()?new Window_ThinGold(_0x5a9852):new Window_Gold(_0x5a9852),this[_0x1cd5('0xbc')](this[_0x1cd5('0x86')]);},VisuMZ['MainMenuCore'][_0x1cd5('0x5a')]=Scene_Menu['prototype'][_0x1cd5('0x163')],Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x163')]=function(){const _0x38c0a9=this[_0x1cd5('0x136')]();if([_0x1cd5('0x79'),_0x1cd5('0x106'),_0x1cd5('0xac')][_0x1cd5('0xb9')](_0x38c0a9))return this[_0x1cd5('0xff')]();else{if([_0x1cd5('0x127'),_0x1cd5('0x6e')][_0x1cd5('0xb9')](_0x38c0a9)){if(_0x1cd5('0x5')!==_0x1cd5('0xd5'))return this['goldWindowRectBottomStyle']();else{function _0x2fae0a(){this[_0x1cd5('0x61')]=new _0x2da4b9(0x1,0x1);}}}else{const _0x5143d7=VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x5a')][_0x1cd5('0x8')](this);return this[_0x1cd5('0x9b')](_0x5143d7),_0x5143d7;}}},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x9b')]=function(_0x74643){if(this['thinGoldWindow']()){if(VisuMZ[_0x1cd5('0x126')]['Settings'][_0x1cd5('0xb0')][_0x1cd5('0x13f')]){if(_0x1cd5('0xe1')!=='lloPX'){function _0x4724c5(){const _0x23cbe2=_0x34195e[_0x1cd5('0x126')][_0x1cd5('0x5a')][_0x1cd5('0x8')](this);return this[_0x1cd5('0x9b')](_0x23cbe2),_0x23cbe2;}}else{const _0x8b5db6=_0x74643[_0x1cd5('0x64')]-this[_0x1cd5('0xe0')](0x1,![]);_0x74643['y']+=_0x8b5db6;}}VisuMZ['MainMenuCore'][_0x1cd5('0x124')][_0x1cd5('0xb0')][_0x1cd5('0xc2')]&&(_0x74643[_0x1cd5('0x64')]=this['calcWindowHeight'](0x1,![]));}},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0xff')]=function(){const _0x1b7c10=this[_0x1cd5('0x2f')](),_0x37fd2c=this[_0x1cd5('0xe0')](0x1,![]),_0x18c30f=Graphics['boxWidth']-_0x1b7c10,_0x556b7e=this['mainAreaBottom']()-_0x37fd2c;return new Rectangle(_0x18c30f,_0x556b7e,_0x1b7c10,_0x37fd2c);},Scene_Menu['prototype'][_0x1cd5('0xeb')]=function(){const _0x1e5fd0=this[_0x1cd5('0x2f')](),_0x5dc209=this[_0x1cd5('0xe0')](0x1,![]),_0x4d2cd6=Graphics[_0x1cd5('0xa7')]-_0x1e5fd0,_0x471bde=this[_0x1cd5('0xf9')]();return new Rectangle(_0x4d2cd6,_0x471bde,_0x1e5fd0,_0x5dc209);},VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x147')]=Scene_Menu[_0x1cd5('0x99')]['createStatusWindow'],Scene_Menu[_0x1cd5('0x99')]['createStatusWindow']=function(){VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x147')][_0x1cd5('0x8')](this),this[_0x1cd5('0xd0')]();},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0xd0')]=function(){this['commandWindowStyle']()===_0x1cd5('0xac')&&(this[_0x1cd5('0xc7')][_0x1cd5('0x77')]=0x0);},VisuMZ['MainMenuCore'][_0x1cd5('0x7')]=Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x12')],Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x12')]=function(){const _0x549b84=this[_0x1cd5('0x136')]();if(['top','thinTop'][_0x1cd5('0xb9')](_0x549b84)){if(_0x1cd5('0x112')!==_0x1cd5('0x112')){function _0x12d4c8(){let _0x3e488c=_0x15fd60[_0x1cd5('0xfd')];if(['',_0x1cd5('0x1d')]['includes'](_0x3e488c))_0x3e488c=_0x25512e['TextJS'][_0x1cd5('0x8')](this);const _0x3391b2=_0x4f1a4b[_0x1cd5('0x11c')];_0x3391b2>0x0&&this[_0x1cd5('0xc4')]()!==_0x1cd5('0x3a')&&(_0x3e488c=_0x1cd5('0x46')[_0x1cd5('0x10f')](_0x3391b2,_0x3e488c));const _0x391b7f=_0x50b1ef['EnableJS'][_0x1cd5('0x8')](this),_0x28c62e=_0x28db34[_0x1cd5('0x131')][_0x1cd5('0x8')](this);this[_0x1cd5('0x17f')](_0x3e488c,_0x229989,_0x391b7f,_0x28c62e),this[_0x1cd5('0x140')](_0x44e086,_0x52fa05[_0x1cd5('0x15f')][_0x1cd5('0x53')](this,_0x28c62e));}}else return this[_0x1cd5('0x142')]();}else{if([_0x1cd5('0x127'),_0x1cd5('0x6e')][_0x1cd5('0xb9')](_0x549b84)){if(_0x1cd5('0x14f')!=='frsEV'){function _0x2a81d1(){const _0x3ce88b=this['_commandNameWindow'],_0x4cee90=_0x3b1a72['windowPadding'](),_0x3e3c69=_0x32518f['x']+_0x57c895[_0x1cd5('0xd')](_0x6b5c7f[_0x1cd5('0xe5')]/0x2)+_0x4cee90;_0x3ce88b['x']=_0x3ce88b[_0x1cd5('0xe5')]/-0x2+_0x3e3c69,_0x3ce88b['y']=_0x53d6ae[_0x1cd5('0xd')](_0x4ddc99[_0x1cd5('0x64')]/0x4);}}else return this[_0x1cd5('0x29')]();}else{if(_0x549b84===_0x1cd5('0xac')){if(_0x1cd5('0x16c')!==_0x1cd5('0x16c')){function _0x5e4ca7(){return _0x2fd872[_0x1cd5('0x126')][_0x1cd5('0x124')]['Playtime'][_0x1cd5('0x1c')];}}else return this[_0x1cd5('0x9f')]();}else return VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x7')][_0x1cd5('0x8')](this);}}},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x142')]=function(){const _0x2e9e86=Graphics[_0x1cd5('0xa7')],_0x56cb94=this[_0x1cd5('0x138')]()-this['_commandWindow'][_0x1cd5('0x64')]-this[_0x1cd5('0x86')]['height'],_0xb4e1fe=0x0,_0x473393=this[_0x1cd5('0xae')]['y']+this['_commandWindow']['height'];return new Rectangle(_0xb4e1fe,_0x473393,_0x2e9e86,_0x56cb94);},Scene_Menu[_0x1cd5('0x99')]['statusWindowRectBottomStyle']=function(){const _0x28c4e3=Graphics[_0x1cd5('0xa7')],_0x254b58=this[_0x1cd5('0x138')]()-this[_0x1cd5('0xae')][_0x1cd5('0x64')]-this[_0x1cd5('0x86')][_0x1cd5('0x64')],_0x22c7a7=0x0,_0x646ff8=this[_0x1cd5('0x86')]['y']+this[_0x1cd5('0x86')][_0x1cd5('0x64')];return new Rectangle(_0x22c7a7,_0x646ff8,_0x28c4e3,_0x254b58);},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x9f')]=function(){const _0x21e7b2=Graphics[_0x1cd5('0xa7')],_0x388693=this[_0x1cd5('0x138')]()-this['_goldWindow'][_0x1cd5('0x64')],_0x44ba65=0x0,_0x8f0ec1=this[_0x1cd5('0xa3')]()-this[_0x1cd5('0x86')][_0x1cd5('0x64')]-_0x388693;return new Rectangle(_0x44ba65,_0x8f0ec1,_0x21e7b2,_0x388693);},Scene_Menu[_0x1cd5('0x99')]['createPlaytimeWindow']=function(){if(!this['canCreatePlaytimeWindow']())return new Rectangle(0x0,0x0,0x0,0x0);const _0x301626=this[_0x1cd5('0x174')]();this[_0x1cd5('0x172')]=new Window_Playtime(_0x301626),this['_playtimeWindow']['setBackgroundType'](VisuMZ[_0x1cd5('0x126')]['Settings'][_0x1cd5('0x110')]['BgType']),this[_0x1cd5('0xbc')](this[_0x1cd5('0x172')]);},Scene_Menu[_0x1cd5('0x99')]['canCreatePlaytimeWindow']=function(){return VisuMZ[_0x1cd5('0x126')]['Settings'][_0x1cd5('0x110')][_0x1cd5('0x1c')];},Scene_Menu[_0x1cd5('0x99')]['adjustCommandHeightByPlaytime']=function(){return this[_0x1cd5('0x108')]()&&VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0x110')][_0x1cd5('0x11d')];},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x174')]=function(){const _0x735b0f=this[_0x1cd5('0x136')]();if([_0x1cd5('0x79'),_0x1cd5('0x106'),_0x1cd5('0xac')][_0x1cd5('0xb9')](_0x735b0f)){if(_0x1cd5('0x107')===_0x1cd5('0x96')){function _0x2b79b4(){this[_0x1cd5('0xc7')][_0x1cd5('0x77')]=0x0;}}else return this[_0x1cd5('0x20')]();}else{if([_0x1cd5('0x127'),_0x1cd5('0x6e')][_0x1cd5('0xb9')](_0x735b0f)){if(_0x1cd5('0xf3')!==_0x1cd5('0x10c'))return this[_0x1cd5('0x145')]();else{function _0x597799(){const _0x34fec3=_0x15cc75(this[_0x1cd5('0xae')][_0x1cd5('0x10d')]());_0x34fec3?(_0x40a0fd['reserveCommonEvent'](_0x34fec3),this[_0x1cd5('0x87')]()):this[_0x1cd5('0xae')][_0x1cd5('0xb5')]();}}}else{if(_0x1cd5('0x13d')===_0x1cd5('0x4a')){function _0xf902e5(){const _0x18b3e8=this[_0x1cd5('0xd8')](this['index']());let _0x23bf7d=this[_0x1cd5('0xb4')](this['index']());_0x23bf7d=_0x23bf7d[_0x1cd5('0x7f')](/\\I\[(\d+)\]/gi,''),_0x8e3f11[_0x1cd5('0xa9')](),this[_0x1cd5('0x11b')](_0x23bf7d,_0x18b3e8),this[_0x1cd5('0x80')](_0x23bf7d,_0x18b3e8),this[_0x1cd5('0xb')](_0x23bf7d,_0x18b3e8);}}else return VisuMZ[_0x1cd5('0x126')]['Settings'][_0x1cd5('0x110')][_0x1cd5('0x3d')][_0x1cd5('0x8')](this);}}},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x20')]=function(){const _0x44ee6=this['mainCommandWidth'](),_0x3dad5f=this[_0x1cd5('0xe0')](0x1,![]),_0x117372=0x0,_0x2b9b50=this[_0x1cd5('0xa3')]()-_0x3dad5f;return new Rectangle(_0x117372,_0x2b9b50,_0x44ee6,_0x3dad5f);},Scene_Menu[_0x1cd5('0x99')]['playtimeWindowRectBottomStyle']=function(){const _0x317c1a=this[_0x1cd5('0x2f')](),_0x54b2ea=this[_0x1cd5('0xe0')](0x1,![]),_0x3088e0=0x0,_0x1f142d=this[_0x1cd5('0xf9')]();return new Rectangle(_0x3088e0,_0x1f142d,_0x317c1a,_0x54b2ea);},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0xe2')]=function(){if(!this[_0x1cd5('0x88')]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x1f628a=this[_0x1cd5('0x15b')]();this[_0x1cd5('0x72')]=new Window_MenuVariables(_0x1f628a),this[_0x1cd5('0x72')][_0x1cd5('0x134')](VisuMZ[_0x1cd5('0x126')]['Settings'][_0x1cd5('0x121')][_0x1cd5('0x1b')]),this[_0x1cd5('0xbc')](this[_0x1cd5('0x72')]);},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x88')]=function(){return VisuMZ['MainMenuCore'][_0x1cd5('0x124')][_0x1cd5('0x121')][_0x1cd5('0x1c')];},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x32')]=function(){return this[_0x1cd5('0x88')]()&&VisuMZ['MainMenuCore'][_0x1cd5('0x124')][_0x1cd5('0x121')][_0x1cd5('0x11d')];},Scene_Menu['prototype']['variableWindowRect']=function(){const _0x1d4952=this[_0x1cd5('0x136')]();if(['top','thinTop',_0x1cd5('0xac')][_0x1cd5('0xb9')](_0x1d4952))return this[_0x1cd5('0x93')]();else return['bottom',_0x1cd5('0x6e')][_0x1cd5('0xb9')](_0x1d4952)?this[_0x1cd5('0x150')]():VisuMZ[_0x1cd5('0x126')]['Settings']['Variable'][_0x1cd5('0x3d')][_0x1cd5('0x8')](this);},Scene_Menu[_0x1cd5('0x99')]['variableWindowRectTopStyle']=function(){const _0x3ed98f=Graphics[_0x1cd5('0xa7')]-this[_0x1cd5('0x86')][_0x1cd5('0xe5')]-(this['_playtimeWindow']?this[_0x1cd5('0x172')]['width']:0x0),_0xe998ab=this['calcWindowHeight'](0x1,![]),_0x589ffa=this[_0x1cd5('0x86')]['x']-_0x3ed98f,_0x509db9=this[_0x1cd5('0xa3')]()-_0xe998ab;return new Rectangle(_0x589ffa,_0x509db9,_0x3ed98f,_0xe998ab);},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x150')]=function(){const _0x2a3580=Graphics[_0x1cd5('0xa7')]-this[_0x1cd5('0x86')][_0x1cd5('0xe5')]-(this[_0x1cd5('0x172')]?this[_0x1cd5('0x172')][_0x1cd5('0xe5')]:0x0),_0x203d4b=this[_0x1cd5('0xe0')](0x1,![]),_0x29d6a3=this['_goldWindow']['x']-_0x2a3580,_0x5049e1=this[_0x1cd5('0xf9')]();return new Rectangle(_0x29d6a3,_0x5049e1,_0x2a3580,_0x203d4b);},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x81')]=function(){if(!this[_0x1cd5('0xf7')]())return;const _0x39b370=this['variableWindowRect']();this[_0x1cd5('0xcd')]=new Window_Base(_0x39b370),this[_0x1cd5('0xcd')]['setBackgroundType'](VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0x121')][_0x1cd5('0x1b')]),this[_0x1cd5('0xbc')](this[_0x1cd5('0xcd')]);},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0xf7')]=function(){if(['default',_0x1cd5('0xac')][_0x1cd5('0xb9')](this[_0x1cd5('0x136')]()))return![];if(this[_0x1cd5('0x72')])return![];return!![];},VisuMZ['MainMenuCore'][_0x1cd5('0xda')]=Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x178')],Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x178')]=function(){if(this[_0x1cd5('0x101')]()&&this[_0x1cd5('0xc7')]){if(_0x1cd5('0x115')!==_0x1cd5('0x4b'))$gameParty[_0x1cd5('0x2d')]($gameParty[_0x1cd5('0x155')]()[0x0]),this['onPersonalOk']();else{function _0xba0d67(){const _0x56d11a=_0x1700be[_0x1cd5('0xa7')]-this['_goldWindow'][_0x1cd5('0xe5')]-(this['_playtimeWindow']?this[_0x1cd5('0x172')][_0x1cd5('0xe5')]:0x0),_0x3a6dd8=this[_0x1cd5('0xe0')](0x1,![]),_0x32eab7=this[_0x1cd5('0x86')]['x']-_0x56d11a,_0x204505=this[_0x1cd5('0xa3')]()-_0x3a6dd8;return new _0x1385b6(_0x32eab7,_0x204505,_0x56d11a,_0x3a6dd8);}}}else{if(_0x1cd5('0x23')!==_0x1cd5('0x21')){if(this['commandWindowStyle']()===_0x1cd5('0xac'))this[_0x1cd5('0xc7')][_0x1cd5('0x9d')]();VisuMZ['MainMenuCore'][_0x1cd5('0xda')][_0x1cd5('0x8')](this);}else{function _0x5ee9b9(){if([_0x1cd5('0x10e'),_0x1cd5('0xac')][_0x1cd5('0xb9')](this[_0x1cd5('0x136')]()))return![];if(this[_0x1cd5('0x72')])return![];return!![];}}}},Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x101')]=function(){return VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0xb0')]['SoloQuick']&&$gameParty[_0x1cd5('0x155')]()[_0x1cd5('0x5f')]<=0x1;},Scene_Menu['prototype'][_0x1cd5('0x105')]=function(){const _0x54d0d8=this[_0x1cd5('0xae')][_0x1cd5('0x55')](),_0x394c8a=this[_0x1cd5('0xae')][_0x1cd5('0x10d')]();for(const _0x251ca0 of Window_MenuCommand[_0x1cd5('0x69')]){if('fwMTL'===_0x1cd5('0xe6')){if(_0x251ca0['Symbol']===_0x54d0d8){if(_0x1cd5('0x15e')!==_0x1cd5('0x15e')){function _0x2def27(){this['_menuImage']='',this[_0x1cd5('0x15d')]()&&this[_0x1cd5('0x15d')]()[_0x1cd5('0x41')][_0x1cd5('0x166')](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)&&(this[_0x1cd5('0x89')]=_0x49a532(_0x4a0898['$1']));}}else{_0x251ca0[_0x1cd5('0x67')][_0x1cd5('0x8')](this,_0x394c8a);return;}}}else{function _0x2b08f3(){this['commandWindowStyle']()===_0x1cd5('0xac')&&(this[_0x1cd5('0xc7')][_0x1cd5('0x77')]=0x0);}}}},VisuMZ[_0x1cd5('0x126')]['Scene_Menu_onPersonalCancel']=Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0xb1')],Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0xb1')]=function(){VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x73')][_0x1cd5('0x8')](this);if(this[_0x1cd5('0x136')]()===_0x1cd5('0xac'))this[_0x1cd5('0xc7')][_0x1cd5('0xe3')]();},Scene_Menu[_0x1cd5('0x99')]['commandCommonEvent']=function(){const _0x2c69c4=parseInt(this[_0x1cd5('0xae')][_0x1cd5('0x10d')]());if(_0x2c69c4){if('WZMhb'==='WZMhb')$gameTemp[_0x1cd5('0xfc')](_0x2c69c4),this[_0x1cd5('0x87')]();else{function _0x1c147b(){const _0x8dd629=_0x3befa3[_0x1cd5('0xd6')][_0x1cd5('0x136')]();return _0x8dd629===_0x1cd5('0x10e')?0x1:_0x29a419[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0x121')][_0x1cd5('0x118')]['length'];}}}else{if(_0x1cd5('0x16f')!==_0x1cd5('0x16f')){function _0x13b9d9(){this[_0x1cd5('0x98')](...arguments);}}else this[_0x1cd5('0xae')][_0x1cd5('0xb5')]();}},VisuMZ[_0x1cd5('0x126')]['Scene_Menu_commandFormation']=Scene_Menu[_0x1cd5('0x99')]['commandFormation'],Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x52')]=function(){VisuMZ[_0x1cd5('0x126')][_0x1cd5('0xb8')][_0x1cd5('0x8')](this);if(this[_0x1cd5('0x136')]()===_0x1cd5('0xac'))this[_0x1cd5('0xc7')][_0x1cd5('0x9d')]();},VisuMZ['MainMenuCore']['Scene_Menu_onFormationCancel']=Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x5d')],Scene_Menu[_0x1cd5('0x99')][_0x1cd5('0x5d')]=function(){VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x135')][_0x1cd5('0x8')](this);if(this['commandWindowStyle']()===_0x1cd5('0xac'))this[_0x1cd5('0xc7')][_0x1cd5('0xe3')]();};function Sprite_MenuBackgroundActor(){this[_0x1cd5('0x98')](...arguments);}Sprite_MenuBackgroundActor[_0x1cd5('0x99')]=Object['create'](Sprite['prototype']),Sprite_MenuBackgroundActor['prototype'][_0x1cd5('0xe7')]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x1cd5('0x99')][_0x1cd5('0x98')]=function(){this[_0x1cd5('0xfb')]=null,this[_0x1cd5('0x14d')]=![],Sprite['prototype'][_0x1cd5('0x98')]['call'](this),this['x']=Graphics[_0x1cd5('0xe5')];},Sprite_MenuBackgroundActor[_0x1cd5('0x99')][_0x1cd5('0x40')]=function(_0x45e347){this['_actor']!==_0x45e347&&(this['_actor']=_0x45e347,this[_0x1cd5('0x16')]());},Sprite_MenuBackgroundActor['prototype'][_0x1cd5('0x16')]=function(){this[_0x1cd5('0x14d')]=![];if(this[_0x1cd5('0xfb')])this[_0x1cd5('0x61')]=ImageManager[_0x1cd5('0x7e')](this[_0x1cd5('0xfb')][_0x1cd5('0xd1')]()),this['bitmap'][_0x1cd5('0x13e')](this['onBitmapLoad'][_0x1cd5('0x53')](this));else{if(_0x1cd5('0x139')!==_0x1cd5('0x2'))this[_0x1cd5('0x61')]=new Bitmap(0x1,0x1);else{function _0x3244cc(){_0x123bba[_0x1cd5('0x126')][_0x1cd5('0x8b')][_0x1cd5('0x8')](this),this['createActorMenuBackgroundImageSprite']();}}}},Sprite_MenuBackgroundActor[_0x1cd5('0x99')][_0x1cd5('0xfe')]=function(){this['_bitmapReady']=!![],VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0xb0')][_0x1cd5('0x4')][_0x1cd5('0x8')](this);},Sprite_MenuBackgroundActor['prototype'][_0x1cd5('0xf1')]=function(){Sprite[_0x1cd5('0x99')][_0x1cd5('0xf1')][_0x1cd5('0x8')](this);if(this[_0x1cd5('0x14d')]){if(_0x1cd5('0x170')===_0x1cd5('0x170'))this[_0x1cd5('0x130')](),this[_0x1cd5('0x128')](),this['updateDuration']();else{function _0x323a64(){return this['statusWindowRectMobileStyle']();}}}},Sprite_MenuBackgroundActor[_0x1cd5('0x99')][_0x1cd5('0x130')]=function(){if(this['_duration']>0x0){const _0x3b55f9=this[_0x1cd5('0x78')];this[_0x1cd5('0x18')]=(this[_0x1cd5('0x18')]*(_0x3b55f9-0x1)+0xff)/_0x3b55f9;}},Sprite_MenuBackgroundActor['prototype']['updatePosition']=function(){if(this[_0x1cd5('0x78')]>0x0){const _0x1aba7d=this[_0x1cd5('0x78')];this['x']=(this['x']*(_0x1aba7d-0x1)+this[_0x1cd5('0x14e')])/_0x1aba7d,this['y']=(this['y']*(_0x1aba7d-0x1)+this['_targetY'])/_0x1aba7d;}},Sprite_MenuBackgroundActor[_0x1cd5('0x99')][_0x1cd5('0x30')]=function(){if(this[_0x1cd5('0x78')]>0x0)this[_0x1cd5('0x78')]--;},ImageManager['svActorHorzCells']=0x9,ImageManager[_0x1cd5('0x10a')]=0x6,Window_Base[_0x1cd5('0x99')][_0x1cd5('0x16b')]=function(_0x1ce2ce,_0x1dcd52,_0x27c1f8){const _0x390f74=ImageManager[_0x1cd5('0x119')](_0x1ce2ce),_0x4da86b=_0x390f74[_0x1cd5('0xe5')]/ImageManager[_0x1cd5('0x6a')],_0x58ec1c=_0x390f74[_0x1cd5('0x64')]/ImageManager['svActorVertCells'],_0x487b30=0x0,_0x121a00=0x0;this[_0x1cd5('0x129')][_0x1cd5('0x85')](_0x390f74,_0x487b30,_0x121a00,_0x4da86b,_0x58ec1c,_0x1dcd52-_0x4da86b/0x2,_0x27c1f8-_0x58ec1c);},Window_MenuCommand[_0x1cd5('0x69')]=VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')]['CommandList'],VisuMZ[_0x1cd5('0x126')][_0x1cd5('0xdc')]=Window_MenuCommand[_0x1cd5('0x99')]['initialize'],Window_MenuCommand['prototype'][_0x1cd5('0x98')]=function(_0x5b8594){VisuMZ['MainMenuCore'][_0x1cd5('0xdc')][_0x1cd5('0x8')](this,_0x5b8594),this[_0x1cd5('0x6d')](_0x5b8594);},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0x6d')]=function(_0x2f827a){const _0x7099d2=new Rectangle(0x0,0x0,_0x2f827a[_0x1cd5('0xe5')],_0x2f827a[_0x1cd5('0x64')]);this['_commandNameWindow']=new Window_Base(_0x7099d2),this[_0x1cd5('0x162')][_0x1cd5('0x18')]=0x0,this[_0x1cd5('0xf8')](this[_0x1cd5('0x162')]),this[_0x1cd5('0xba')]();},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0xb3')]=function(){Window_HorzCommand[_0x1cd5('0x99')]['callUpdateHelp'][_0x1cd5('0x8')](this);if(this[_0x1cd5('0x162')])this['updateCommandNameWindow']();},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0xba')]=function(){const _0x1a904e=this[_0x1cd5('0x162')];_0x1a904e[_0x1cd5('0x129')][_0x1cd5('0x111')]();const _0x4b0ab2=this[_0x1cd5('0x148')](this[_0x1cd5('0xcf')]());if(_0x4b0ab2===_0x1cd5('0x17b')){const _0x3de4fb=this[_0x1cd5('0xd8')](this[_0x1cd5('0xcf')]());let _0x84a595=this[_0x1cd5('0xb4')](this[_0x1cd5('0xcf')]());_0x84a595=_0x84a595[_0x1cd5('0x7f')](/\\I\[(\d+)\]/gi,''),_0x1a904e[_0x1cd5('0xa9')](),this['commandNameWindowDrawBackground'](_0x84a595,_0x3de4fb),this[_0x1cd5('0x80')](_0x84a595,_0x3de4fb),this[_0x1cd5('0xb')](_0x84a595,_0x3de4fb);}},Window_MenuCommand['prototype']['commandNameWindowDrawBackground']=function(_0x565d97,_0x1acbca){},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0x80')]=function(_0x42c7f2,_0x50de4f){const _0x10cad4=this[_0x1cd5('0x162')];_0x10cad4[_0x1cd5('0x8f')](_0x42c7f2,0x0,_0x50de4f['y'],_0x10cad4[_0x1cd5('0x6b')],_0x1cd5('0x82'));},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0xb')]=function(_0x202b5f,_0x4e8a22){const _0x3d91f4=this[_0x1cd5('0x162')],_0x39d5e8=$gameSystem[_0x1cd5('0x11')](),_0x4cc565=_0x4e8a22['x']+Math[_0x1cd5('0xd')](_0x4e8a22[_0x1cd5('0xe5')]/0x2)+_0x39d5e8;_0x3d91f4['x']=_0x3d91f4['width']/-0x2+_0x4cc565,_0x3d91f4['y']=Math[_0x1cd5('0xd')](_0x4e8a22[_0x1cd5('0x64')]/0x4);},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0x117')]=function(){const _0x2ca0ba=SceneManager[_0x1cd5('0xd6')][_0x1cd5('0x136')]();if(_0x2ca0ba===_0x1cd5('0xac')){const _0x2b40c5=VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0xce')][_0x1cd5('0x9e')];return this[_0x1cd5('0x90')]()*_0x2b40c5+0x8;}else return Window_Command[_0x1cd5('0x99')][_0x1cd5('0x117')][_0x1cd5('0x8')](this);},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0x4c')]=function(){this[_0x1cd5('0x25')]();},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0x25')]=function(){for(const _0x3b634b of Window_MenuCommand[_0x1cd5('0x69')]){const _0x2b4e92=_0x3b634b[_0x1cd5('0x63')];if(_0x3b634b[_0x1cd5('0xea')]['call'](this)){if(_0x1cd5('0x16e')===_0x1cd5('0x16e')){let _0x282493=_0x3b634b['TextStr'];if(['',_0x1cd5('0x1d')][_0x1cd5('0xb9')](_0x282493))_0x282493=_0x3b634b['TextJS'][_0x1cd5('0x8')](this);const _0x522b16=_0x3b634b[_0x1cd5('0x11c')];_0x522b16>0x0&&this[_0x1cd5('0xc4')]()!==_0x1cd5('0x3a')&&(_0x282493='\x5cI[%1]%2'[_0x1cd5('0x10f')](_0x522b16,_0x282493));const _0x4adf21=_0x3b634b[_0x1cd5('0xa2')][_0x1cd5('0x8')](this),_0x3897d8=_0x3b634b[_0x1cd5('0x131')]['call'](this);this[_0x1cd5('0x17f')](_0x282493,_0x2b4e92,_0x4adf21,_0x3897d8),this[_0x1cd5('0x140')](_0x2b4e92,_0x3b634b['CallHandlerJS'][_0x1cd5('0x53')](this,_0x3897d8));}else{function _0x511050(){_0xc533f9[_0x1cd5('0x2d')](_0x4c3b9c[_0x1cd5('0x155')]()[0x0]),this['onPersonalOk']();}}}this[_0x1cd5('0x12b')](_0x2b4e92);}},Window_MenuCommand['prototype'][_0x1cd5('0x12b')]=function(_0x48af26){switch(_0x48af26){case _0x1cd5('0x14a'):this[_0x1cd5('0x102')]();break;case _0x1cd5('0xc5'):this['addFormationCommand'](),this[_0x1cd5('0xee')]();break;case _0x1cd5('0x37'):this[_0x1cd5('0x14')]();break;case _0x1cd5('0x109'):this['addSaveCommand']();break;case'gameEnd':this[_0x1cd5('0x1a')]();break;}},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0x102')]=function(){},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0x133')]=function(){},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0xee')]=function(){},Window_MenuCommand[_0x1cd5('0x99')]['addOptionsCommand']=function(){},Window_MenuCommand['prototype'][_0x1cd5('0x59')]=function(){},Window_MenuCommand[_0x1cd5('0x99')]['addGameEndCommand']=function(){},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0x60')]=function(){const _0x55fa38=SceneManager[_0x1cd5('0xd6')][_0x1cd5('0x136')]();if(['thinTop',_0x1cd5('0x6e')][_0x1cd5('0xb9')](_0x55fa38)){if(_0x1cd5('0xcc')!==_0x1cd5('0xcc')){function _0x3ba238(){if(this[_0x1cd5('0x78')]>0x0){const _0x27ecd5=this[_0x1cd5('0x78')];this[_0x1cd5('0x18')]=(this[_0x1cd5('0x18')]*(_0x27ecd5-0x1)+0xff)/_0x27ecd5;}}}else return this[_0x1cd5('0x2b')]?this[_0x1cd5('0x9a')]():0x4;}else{if(_0x55fa38!==_0x1cd5('0x10e')){if(_0x1cd5('0x149')!==_0x1cd5('0x13a'))return VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0xce')]['Cols'];else{function _0x281bd7(){const _0x330023=_0x1afb12(_0x22e304['$1']);_0x330023<_0x214857?(_0x4a1d5f('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1cd5('0x10f')](_0x5555bb,_0x330023,_0x5eb7a0)),_0x459dfd[_0x1cd5('0xec')]()):_0x3b1039=_0x379469[_0x1cd5('0xbd')](_0x330023,_0x646681);}}}else{if(_0x1cd5('0x151')===_0x1cd5('0xe8')){function _0x1a83fd(){return _0x5e00fe[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0x121')]['VarList'][_0x1cd5('0x5f')];}}else return Window_Command['prototype'][_0x1cd5('0x60')][_0x1cd5('0x8')](this);}}},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0x12a')]=function(){return VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')]['CustomCmdWin'][_0x1cd5('0x7b')];},Window_MenuCommand[_0x1cd5('0x99')]['drawItem']=function(_0x522574){const _0x121167=this[_0x1cd5('0x148')](_0x522574);if(_0x121167===_0x1cd5('0x22'))this[_0x1cd5('0xc1')](_0x522574);else{if(_0x121167==='icon')this[_0x1cd5('0x156')](_0x522574);else{if('ayolb'==='Qnwon'){function _0x3cf533(){return _0x4a5057[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0xce')][_0x1cd5('0x7b')];}}else Window_Command[_0x1cd5('0x99')]['drawItem'][_0x1cd5('0x8')](this,_0x522574);}}},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0xc4')]=function(){return VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0xce')]['Style'];},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0x148')]=function(_0x10f03b){const _0x4c067f=this[_0x1cd5('0xc4')]();if(_0x4c067f!=='auto'){if('WWqpp'!==_0x1cd5('0x175')){function _0x2ee56c(){if(this[_0x1cd5('0x78')]>0x0)this[_0x1cd5('0x78')]--;}}else return _0x4c067f;}else{const _0x4a5e02=this[_0x1cd5('0xb4')](_0x10f03b);if(_0x4a5e02[_0x1cd5('0x166')](/\\I\[(\d+)\]/i)){const _0x5de01e=this[_0x1cd5('0xd8')](_0x10f03b),_0x439276=this[_0x1cd5('0x3')](_0x4a5e02)[_0x1cd5('0xe5')];if(_0x439276<=_0x5de01e[_0x1cd5('0xe5')]){if('BBlwP'===_0x1cd5('0x94')){function _0x2d50ab(){this[_0x1cd5('0x12e')](_0x252153,_0x1e14d9['x'],_0x4b1c98['y'],_0x2854c0);}}else return _0x1cd5('0x22');}else return _0x1cd5('0x17b');}else return _0x1cd5('0x3a');}},Window_MenuCommand[_0x1cd5('0x99')]['drawItemStyleIconText']=function(_0x20a84b){const _0x4bbb64=this[_0x1cd5('0xd8')](_0x20a84b),_0x446f63=this['commandName'](_0x20a84b),_0x50057d=this[_0x1cd5('0x3')](_0x446f63)[_0x1cd5('0xe5')];this[_0x1cd5('0x71')](this[_0x1cd5('0x17')](_0x20a84b));let _0xc7a113=this[_0x1cd5('0x12a')]();if(_0xc7a113==='right')this[_0x1cd5('0x12e')](_0x446f63,_0x4bbb64['x']+_0x4bbb64[_0x1cd5('0xe5')]-_0x50057d,_0x4bbb64['y'],_0x50057d);else{if(_0xc7a113===_0x1cd5('0x82')){const _0x4ac13d=_0x4bbb64['x']+Math[_0x1cd5('0xd')]((_0x4bbb64[_0x1cd5('0xe5')]-_0x50057d)/0x2);this[_0x1cd5('0x12e')](_0x446f63,_0x4ac13d,_0x4bbb64['y'],_0x50057d);}else{if(_0x1cd5('0x17c')!==_0x1cd5('0x10'))this[_0x1cd5('0x12e')](_0x446f63,_0x4bbb64['x'],_0x4bbb64['y'],_0x50057d);else{function _0x2c320a(){return 0x1;}}}}},Window_MenuCommand[_0x1cd5('0x99')][_0x1cd5('0x156')]=function(_0x278877){this[_0x1cd5('0xb4')](_0x278877)[_0x1cd5('0x166')](/\\I\[(\d+)\]/i);const _0x50426c=Number(RegExp['$1']),_0x474c4d=this[_0x1cd5('0xd8')](_0x278877),_0x30a505=_0x474c4d['x']+Math[_0x1cd5('0xd')]((_0x474c4d[_0x1cd5('0xe5')]-ImageManager[_0x1cd5('0x28')])/0x2),_0x1e9419=_0x474c4d['y']+(_0x474c4d[_0x1cd5('0x64')]-ImageManager[_0x1cd5('0xc6')])/0x2;this['drawIcon'](_0x50426c,_0x30a505,_0x1e9419);},VisuMZ['MainMenuCore'][_0x1cd5('0x57')]=Window_StatusBase[_0x1cd5('0x99')][_0x1cd5('0x103')],Window_StatusBase[_0x1cd5('0x99')][_0x1cd5('0x103')]=function(){VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x57')][_0x1cd5('0x8')](this),this[_0x1cd5('0xa')]();},Window_StatusBase[_0x1cd5('0x99')][_0x1cd5('0xa')]=function(){switch(this['graphicType']()){case _0x1cd5('0x123'):for(const _0x800933 of $gameParty[_0x1cd5('0x155')]()){if(_0x1cd5('0x14b')!==_0x1cd5('0x44'))ImageManager['loadCharacter'](_0x800933[_0x1cd5('0x159')]());else{function _0x49ec1c(){_0x52a350[_0x1cd5('0x126')]['Settings']['ListStyles'][_0x1cd5('0xfa')][_0x1cd5('0x8')](this,_0x4913d0,_0x45d742);}}}break;case _0x1cd5('0x100'):for(const _0x43a931 of $gameParty[_0x1cd5('0x155')]()){if(_0x1cd5('0xcb')!==_0x1cd5('0xcb')){function _0x2335db(){const _0xa55c48=_0x28fc82[_0x1cd5('0xa7')],_0x5daef1=this[_0x1cd5('0x138')]()-this[_0x1cd5('0xae')][_0x1cd5('0x64')]-this[_0x1cd5('0x86')][_0x1cd5('0x64')],_0x31df6d=0x0,_0x110484=this[_0x1cd5('0xae')]['y']+this[_0x1cd5('0xae')][_0x1cd5('0x64')];return new _0x3d16ed(_0x31df6d,_0x110484,_0xa55c48,_0x5daef1);}}else ImageManager[_0x1cd5('0x119')](_0x43a931['battlerName']());}break;}},Window_StatusBase[_0x1cd5('0x99')][_0x1cd5('0xdf')]=function(){return VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0x26')];},Window_StatusBase[_0x1cd5('0x99')][_0x1cd5('0xbe')]=function(_0x1ba50a,_0x298f66,_0x47b245,_0x3c2765,_0x5c4943){_0x3c2765=_0x3c2765||ImageManager[_0x1cd5('0x171')],_0x5c4943=_0x5c4943||ImageManager['faceHeight'];const _0x530512=ImageManager[_0x1cd5('0x171')],_0x190edc=_0x5c4943-0x2,_0x140520=_0x298f66+Math[_0x1cd5('0xd')]((_0x3c2765-_0x530512)/0x2);if(this[_0x1cd5('0xe7')]===Window_MenuStatus){if(_0x1cd5('0x15')!=='nujXh'){function _0x4c217b(){this[_0x1cd5('0xfb')]!==_0x52394a&&(this[_0x1cd5('0xfb')]=_0x358b5e,this[_0x1cd5('0x16')]());}}else this[_0x1cd5('0x71')](_0x1ba50a[_0x1cd5('0xaa')]());}this[_0x1cd5('0x47')](_0x1ba50a,_0x140520,_0x47b245,_0x530512,_0x190edc),this[_0x1cd5('0x71')](!![]);},Window_StatusBase[_0x1cd5('0x99')]['drawItemActorSprite']=function(_0xf9774d,_0x5e8867,_0x5f129f,_0x58f945,_0x1522b1){_0x58f945=_0x58f945||ImageManager[_0x1cd5('0x171')],_0x1522b1=_0x1522b1||ImageManager['faceHeight'];const _0x384f2c=_0xf9774d[_0x1cd5('0x159')](),_0x1f52b5=_0xf9774d[_0x1cd5('0xaf')](),_0x36d6b7=ImageManager[_0x1cd5('0x169')](_0x384f2c),_0x180e80=ImageManager[_0x1cd5('0x122')](_0x384f2c),_0x213623=_0x36d6b7[_0x1cd5('0xe5')]/(_0x180e80?0x3:0xc),_0x557df8=_0x36d6b7[_0x1cd5('0x64')]/(_0x180e80?0x4:0x8),_0x5c47ad=_0x58f945,_0x28b7bd=_0x1522b1-0x2,_0x1e6e81=_0x5e8867+Math[_0x1cd5('0xd')](_0x5c47ad/0x2),_0x42ce9d=_0x5f129f+Math['ceil']((_0x1522b1+_0x557df8)/0x2);this[_0x1cd5('0xe7')]===Window_MenuStatus&&this[_0x1cd5('0x71')](_0xf9774d[_0x1cd5('0xaa')]());const _0x16a99a=Math[_0x1cd5('0x176')](_0x58f945,_0x213623),_0x49b73b=Math[_0x1cd5('0x176')](_0x1522b1,_0x557df8),_0x459b3c=Math[_0x1cd5('0xd')](_0x5e8867+Math[_0x1cd5('0xbd')](_0x58f945-_0x213623,0x0)/0x2),_0x3a5df9=Math[_0x1cd5('0xd')](_0x5f129f+Math[_0x1cd5('0xbd')](_0x1522b1-_0x557df8,0x0)/0x2),_0x332584=_0x180e80?0x0:_0x1f52b5,_0x533f7c=(_0x332584%0x4*0x3+0x1)*_0x213623,_0x4d18ff=Math[_0x1cd5('0xd')](_0x332584/0x4)*0x4*_0x557df8;this['contents'][_0x1cd5('0x85')](_0x36d6b7,_0x533f7c,_0x4d18ff,_0x16a99a,_0x49b73b,_0x459b3c,_0x3a5df9),this[_0x1cd5('0x71')](!![]);},Window_StatusBase[_0x1cd5('0x99')]['drawItemActorSvBattler']=function(_0x46ddd4,_0x5100a5,_0x262435,_0x4d5299,_0x484556){_0x4d5299=_0x4d5299||ImageManager['faceWidth'],_0x484556=_0x484556||ImageManager[_0x1cd5('0xbb')];const _0x2fd4ed=ImageManager[_0x1cd5('0x119')](_0x46ddd4[_0x1cd5('0x48')]()),_0x34ad95=_0x2fd4ed[_0x1cd5('0xe5')]/ImageManager[_0x1cd5('0x6a')],_0x17d509=_0x2fd4ed[_0x1cd5('0x64')]/ImageManager[_0x1cd5('0x10a')],_0x3d3e5e=_0x4d5299,_0x256f7b=_0x484556-0x2,_0x185ca5=_0x5100a5+Math['floor'](_0x3d3e5e/0x2),_0x483ead=_0x262435+Math[_0x1cd5('0x97')]((_0x484556+_0x17d509)/0x2);if(this[_0x1cd5('0xe7')]===Window_MenuStatus){if(_0x1cd5('0x45')!==_0x1cd5('0x2e'))this[_0x1cd5('0x71')](_0x46ddd4[_0x1cd5('0xaa')]());else{function _0x118e74(){this[_0x1cd5('0x98')](...arguments);}}}const _0x3ade2c=Math[_0x1cd5('0x176')](_0x4d5299,_0x34ad95),_0x1d6e58=Math[_0x1cd5('0x176')](_0x484556,_0x17d509),_0x552fe1=Math[_0x1cd5('0xd')](_0x5100a5+Math[_0x1cd5('0xbd')](_0x4d5299-_0x34ad95,0x0)/0x2),_0x301af7=Math[_0x1cd5('0xd')](_0x262435+Math[_0x1cd5('0xbd')](_0x484556-_0x17d509,0x0)/0x2),_0x374b1a=0x0,_0x9de274=0x0;this[_0x1cd5('0x129')][_0x1cd5('0x85')](_0x2fd4ed,_0x374b1a,_0x9de274,_0x3ade2c,_0x1d6e58,_0x552fe1,_0x301af7),this['changePaintOpacity'](!![]);},Window_StatusBase['prototype'][_0x1cd5('0x12d')]=function(_0x166d52,_0x5d4a14,_0x3864a0,_0x45bae9,_0x3cdd02){const _0xac7455=ImageManager[_0x1cd5('0x7e')](_0x166d52[_0x1cd5('0xd1')]());_0x45bae9=(_0x45bae9||ImageManager['faceWidth'])-0x2,_0x3cdd02=(_0x3cdd02||ImageManager[_0x1cd5('0xbb')])-0x2;const _0x21cb4c=_0xac7455['width'],_0x4abb5c=_0xac7455[_0x1cd5('0x64')],_0x418f40=_0x45bae9,_0xced011=_0x3cdd02-0x2,_0x2b13bc=_0x5d4a14+Math['floor'](_0x418f40/0x2),_0x55ba1f=_0x3864a0+Math[_0x1cd5('0x97')]((_0x3cdd02+_0x4abb5c)/0x2);if(this[_0x1cd5('0xe7')]===Window_MenuStatus){if(_0x1cd5('0x116')==='tpPXd'){function _0x21b7f1(){if(this[_0x1cd5('0x136')]()===_0x1cd5('0xac'))this[_0x1cd5('0xc7')]['open']();_0x3b250e[_0x1cd5('0x126')][_0x1cd5('0xda')]['call'](this);}}else this[_0x1cd5('0x71')](_0x166d52[_0x1cd5('0xaa')]());}const _0x2d6b8b=Math[_0x1cd5('0x176')](_0x45bae9,_0x21cb4c),_0x3b6e80=Math[_0x1cd5('0x176')](_0x3cdd02,_0x4abb5c),_0x115be9=_0x5d4a14+0x1,_0xc6a2e9=Math[_0x1cd5('0xbd')](_0x3864a0+0x1,_0x3864a0+_0xced011-_0x4abb5c+0x3),_0x533151=(_0x21cb4c-_0x2d6b8b)/0x2,_0x306a6a=(_0x4abb5c-_0x3b6e80)/0x2;this[_0x1cd5('0x129')][_0x1cd5('0x85')](_0xac7455,_0x533151,_0x306a6a,_0x2d6b8b,_0x3b6e80,_0x115be9,_0xc6a2e9),this[_0x1cd5('0x71')](!![]);},VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x168')]=Window_MenuStatus[_0x1cd5('0x99')][_0x1cd5('0x9a')],Window_MenuStatus[_0x1cd5('0x99')]['maxItems']=function(){if(this['showOnlyBattleMembers']()){if(_0x1cd5('0x36')!==_0x1cd5('0x36')){function _0x90c5f9(){return this[_0x1cd5('0x75')][_0x1cd5('0x5f')];}}else return $gameParty['battleMembers']()['length'];}else return VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x168')][_0x1cd5('0x8')](this);},Window_MenuStatus['prototype']['showOnlyBattleMembers']=function(){const _0x39dce1=VisuMZ['MainMenuCore'][_0x1cd5('0x124')][_0x1cd5('0xb0')];if(_0x39dce1[_0x1cd5('0x95')]===undefined)_0x39dce1[_0x1cd5('0x95')]=!![];const _0x3ac247=SceneManager['_scene'];if(!_0x39dce1[_0x1cd5('0x95')]){if(_0x1cd5('0x8e')===_0x1cd5('0x8e')){if(_0x39dce1[_0x1cd5('0x9c')])return _0x3ac247['constructor']===Scene_Menu;return!![];}else{function _0x21ecac(){return _0x36fe23['MainMenuCore'][_0x1cd5('0x124')][_0x1cd5('0x54')];}}}return![];},Window_MenuStatus[_0x1cd5('0x99')][_0x1cd5('0x4e')]=function(){const _0x12d2c6=SceneManager[_0x1cd5('0xd6')][_0x1cd5('0xe7')];if(_0x12d2c6===Scene_Menu)return VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0x56')];else{if(_0x1cd5('0x5b')==='ImBKb'){function _0x2a454e(){if(!this[_0x1cd5('0xf7')]())return;const _0xee6702=this[_0x1cd5('0x15b')]();this['_dummyWindow']=new _0x4e94a7(_0xee6702),this['_dummyWindow'][_0x1cd5('0x134')](_0x33c397[_0x1cd5('0x126')]['Settings'][_0x1cd5('0x121')][_0x1cd5('0x1b')]),this[_0x1cd5('0xbc')](this[_0x1cd5('0xcd')]);}}else return VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')]['InnerMenuListStyle'];}},Window_MenuStatus['prototype']['numVisibleRows']=function(){const _0x101773=this['listStyle']();switch(_0x101773){case _0x1cd5('0xb2'):case _0x1cd5('0x11f'):return 0x1;case _0x1cd5('0x7d'):return 0x1;default:return $gameParty[_0x1cd5('0xc')]();}},Window_MenuStatus['prototype']['maxCols']=function(){const _0x568cdb=this[_0x1cd5('0x4e')]();switch(_0x568cdb){case _0x1cd5('0xb2'):case _0x1cd5('0x11f'):return $gameParty[_0x1cd5('0xc')]();default:return 0x1;}},VisuMZ[_0x1cd5('0x126')]['Window_MenuStatus_itemHeight']=Window_MenuStatus[_0x1cd5('0x99')][_0x1cd5('0x117')],Window_MenuStatus['prototype']['itemHeight']=function(){const _0x2b584a=this[_0x1cd5('0x4e')]();switch(_0x2b584a){case _0x1cd5('0xb2'):case _0x1cd5('0x11f'):case _0x1cd5('0x7d'):return this[_0x1cd5('0x7c')];case _0x1cd5('0x165'):return Window_Selectable[_0x1cd5('0x99')][_0x1cd5('0x117')][_0x1cd5('0x8')](this);case _0x1cd5('0x10b'):return this[_0x1cd5('0x90')]()*0x2+0x8;default:return VisuMZ[_0x1cd5('0x126')]['Window_MenuStatus_itemHeight'][_0x1cd5('0x8')](this);}},Window_MenuStatus[_0x1cd5('0x99')][_0x1cd5('0x3b')]=function(_0x5e5ca5){this[_0x1cd5('0xc8')](_0x5e5ca5),this[_0x1cd5('0x65')](_0x5e5ca5);},VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x8d')]=Window_MenuStatus[_0x1cd5('0x99')][_0x1cd5('0xd2')],Window_MenuStatus[_0x1cd5('0x99')]['drawActorGraphic']=function(_0x53fb21,_0x4b13e7,_0x42ed26,_0xcf92b8,_0x38b390){switch(this[_0x1cd5('0xdf')]()){case _0x1cd5('0xa5'):break;case _0x1cd5('0x123'):this[_0x1cd5('0x4d')](_0x53fb21,_0x4b13e7,_0x42ed26+0x1,_0xcf92b8,_0x38b390-0x2);break;case _0x1cd5('0x100'):this[_0x1cd5('0x66')](_0x53fb21,_0x4b13e7,_0x42ed26+0x1,_0xcf92b8,_0x38b390-0x2);break;default:this[_0x1cd5('0xbe')](_0x53fb21,_0x4b13e7,_0x42ed26,_0xcf92b8,_0x38b390);break;}},Window_MenuStatus[_0x1cd5('0x99')][_0x1cd5('0x65')]=function(_0x4dc3c7){this[_0x1cd5('0xa9')]();const _0x4cdbd7=this[_0x1cd5('0x15d')](_0x4dc3c7),_0x2a63b5=this[_0x1cd5('0xd7')](_0x4dc3c7),_0x40f1d9=this[_0x1cd5('0x4e')]();switch(_0x40f1d9){case _0x1cd5('0xb2'):this[_0x1cd5('0x92')](_0x4cdbd7,_0x2a63b5);break;case _0x1cd5('0x11f'):this[_0x1cd5('0x6c')](_0x4cdbd7,_0x2a63b5);break;case _0x1cd5('0x7d'):this[_0x1cd5('0x24')](_0x4cdbd7,_0x2a63b5);break;case _0x1cd5('0x165'):this[_0x1cd5('0x12c')](_0x4cdbd7,_0x2a63b5);break;case _0x1cd5('0x10b'):this['drawItemStatusThickerStyle'](_0x4cdbd7,_0x2a63b5);break;default:this['drawItemStatusDefaultStyle'](_0x4cdbd7,_0x2a63b5);break;}},Window_MenuStatus[_0x1cd5('0x99')][_0x1cd5('0x92')]=function(_0x5b8996,_0x40507d){VisuMZ['MainMenuCore'][_0x1cd5('0x124')][_0x1cd5('0x146')][_0x1cd5('0xfa')]['call'](this,_0x5b8996,_0x40507d);},Window_MenuStatus['prototype'][_0x1cd5('0x6c')]=function(_0x42613f,_0x5b0d1c){if(_0x42613f[_0x1cd5('0xd1')]()!==''){if(_0x1cd5('0xf4')===_0x1cd5('0xf4')){const _0x2046a0=ImageManager[_0x1cd5('0x7e')](_0x42613f[_0x1cd5('0xd1')]());_0x2046a0[_0x1cd5('0x13e')](this[_0x1cd5('0xf2')]['bind'](this,_0x42613f,_0x5b0d1c));}else{function _0x4d1794(){_0x59af14=_0x2b439b||_0x1f988b['faceWidth'],_0x44773e=_0x14324d||_0xe14148[_0x1cd5('0xbb')];const _0x10394d=_0x1c199c[_0x1cd5('0x119')](_0x9844d4[_0x1cd5('0x48')]()),_0x1b88ae=_0x10394d[_0x1cd5('0xe5')]/_0x51d6c1[_0x1cd5('0x6a')],_0x56e47e=_0x10394d[_0x1cd5('0x64')]/_0x1f2e19[_0x1cd5('0x10a')],_0x35918d=_0x2a2215,_0x3ebd9a=_0x32f04e-0x2,_0x34b751=_0x19cc19+_0x2d7a0a[_0x1cd5('0xd')](_0x35918d/0x2),_0x2fc812=_0x5f11b8+_0x319d03[_0x1cd5('0x97')]((_0x30e06a+_0x56e47e)/0x2);this[_0x1cd5('0xe7')]===_0x22aed0&&this[_0x1cd5('0x71')](_0x42a27b[_0x1cd5('0xaa')]());const _0x281ee4=_0x5f29c0['min'](_0x3882e1,_0x1b88ae),_0x39572a=_0x407b65[_0x1cd5('0x176')](_0x39b2a5,_0x56e47e),_0x5c4582=_0x100e60[_0x1cd5('0xd')](_0x3b25c0+_0x51bb11[_0x1cd5('0xbd')](_0x3179a5-_0x1b88ae,0x0)/0x2),_0x1179cc=_0x435ca5[_0x1cd5('0xd')](_0x22e5c6+_0x1faffa['max'](_0x19eb8a-_0x56e47e,0x0)/0x2),_0x107ba4=0x0,_0x92a710=0x0;this[_0x1cd5('0x129')]['blt'](_0x10394d,_0x107ba4,_0x92a710,_0x281ee4,_0x39572a,_0x5c4582,_0x1179cc),this[_0x1cd5('0x71')](!![]);}}}else this['drawItemStatusVerticalStyle'](_0x42613f,_0x5b0d1c);},Window_MenuStatus[_0x1cd5('0x99')][_0x1cd5('0xf2')]=function(_0x4dfae2,_0x59e569){VisuMZ['MainMenuCore']['Settings'][_0x1cd5('0x146')][_0x1cd5('0x113')]['call'](this,_0x4dfae2,_0x59e569);},Window_MenuStatus[_0x1cd5('0x99')]['drawItemStatusSoloStyle']=function(_0x689dd5,_0x4ced0f){const _0x206097=ImageManager[_0x1cd5('0x7e')](_0x689dd5[_0x1cd5('0xd1')]());_0x206097[_0x1cd5('0x13e')](this[_0x1cd5('0x42')][_0x1cd5('0x53')](this,_0x689dd5,_0x4ced0f));},Window_MenuStatus['prototype'][_0x1cd5('0x42')]=function(_0x55581e,_0x4ee853){VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0x146')][_0x1cd5('0x158')][_0x1cd5('0x8')](this,_0x55581e,_0x4ee853);},Window_MenuStatus[_0x1cd5('0x99')][_0x1cd5('0x12c')]=function(_0x32f2ab,_0x304b9b){VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0x146')][_0x1cd5('0x38')][_0x1cd5('0x8')](this,_0x32f2ab,_0x304b9b);},Window_MenuStatus['prototype'][_0x1cd5('0x5e')]=function(_0x1a763c,_0x2984a7){VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0x146')][_0x1cd5('0x16d')][_0x1cd5('0x8')](this,_0x1a763c,_0x2984a7);},Window_MenuStatus[_0x1cd5('0x99')][_0x1cd5('0x6')]=function(){const _0x2d8b82=this[_0x1cd5('0x4e')]();if([_0x1cd5('0x165'),_0x1cd5('0x10b')][_0x1cd5('0xb9')](_0x2d8b82))return![];return Window_StatusBase[_0x1cd5('0x99')][_0x1cd5('0x6')][_0x1cd5('0x8')](this);},Window_MenuStatus[_0x1cd5('0x99')]['drawItemStatusDefaultStyle']=function(_0x33ccc1,_0x1e37d5){VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0x146')][_0x1cd5('0x104')][_0x1cd5('0x8')](this,_0x33ccc1,_0x1e37d5);},Window_SkillStatus['prototype'][_0x1cd5('0x47')]=function(_0x465b48,_0x270cc0,_0x1c2310,_0x39a2c9,_0xb0914b){switch(this[_0x1cd5('0xdf')]()){case _0x1cd5('0xa5'):break;case _0x1cd5('0x123'):this[_0x1cd5('0x4d')](_0x465b48,_0x270cc0,_0x1c2310,_0x39a2c9,_0xb0914b);break;case _0x1cd5('0x100'):this['drawItemActorSvBattler'](_0x465b48,_0x270cc0,_0x1c2310,_0x39a2c9,_0xb0914b);break;default:Window_StatusBase['prototype'][_0x1cd5('0x47')][_0x1cd5('0x8')](this,_0x465b48,_0x270cc0,_0x1c2310,_0x39a2c9,_0xb0914b);break;}},Window_EquipStatus[_0x1cd5('0x99')][_0x1cd5('0x47')]=function(_0x42dd8b,_0x4005e1,_0xf296c,_0x283f7f,_0x9ee367){switch(this[_0x1cd5('0xdf')]()){case _0x1cd5('0xa5'):break;case'sprite':this[_0x1cd5('0x4d')](_0x42dd8b,_0x4005e1,_0xf296c,_0x283f7f,_0x9ee367);break;case _0x1cd5('0x100'):this[_0x1cd5('0x66')](_0x42dd8b,_0x4005e1,_0xf296c,_0x283f7f,_0x9ee367);break;default:Window_StatusBase['prototype'][_0x1cd5('0x47')][_0x1cd5('0x8')](this,_0x42dd8b,_0x4005e1,_0xf296c,_0x283f7f,_0x9ee367);break;}};function Window_ThinGold(){this[_0x1cd5('0x98')](...arguments);}Window_ThinGold[_0x1cd5('0x99')]=Object[_0x1cd5('0x76')](Window_Gold[_0x1cd5('0x99')]),Window_ThinGold[_0x1cd5('0x99')]['constructor']=Window_ThinGold,Window_ThinGold[_0x1cd5('0x99')][_0x1cd5('0x117')]=function(){return this[_0x1cd5('0x90')]();},Window_ThinGold[_0x1cd5('0x99')][_0x1cd5('0x31')]=function(){return Window_Selectable[_0x1cd5('0x99')]['colSpacing'][_0x1cd5('0x8')](this);};function Window_Playtime(){this[_0x1cd5('0x98')](...arguments);}Window_Playtime['prototype']=Object[_0x1cd5('0x76')](Window_Selectable[_0x1cd5('0x99')]),Window_Playtime['prototype'][_0x1cd5('0xe7')]=Window_Playtime,Window_Playtime[_0x1cd5('0x99')][_0x1cd5('0x98')]=function(_0x32b337){this[_0x1cd5('0xd4')]=$gameSystem[_0x1cd5('0x153')](),this[_0x1cd5('0x0')]=0x3c,Window_Selectable[_0x1cd5('0x99')]['initialize'][_0x1cd5('0x8')](this,_0x32b337),this[_0x1cd5('0x9')]();},Window_Playtime['prototype'][_0x1cd5('0x117')]=function(){return this[_0x1cd5('0x90')]();},Window_Playtime[_0x1cd5('0x99')][_0x1cd5('0xf1')]=function(){Window_Selectable[_0x1cd5('0x99')][_0x1cd5('0xf1')][_0x1cd5('0x8')](this),this[_0x1cd5('0x154')]();},Window_Playtime['prototype']['updateTimer']=function(){if(this[_0x1cd5('0x0')]-->0x0){if(_0x1cd5('0x143')===_0x1cd5('0x17a')){function _0x1b8fea(){const _0x2a8fac=_0x48ebfd['MainMenuCore'][_0x1cd5('0x124')][_0x1cd5('0xce')]['Rows'],_0x1b7f70=_0x579e4c[_0x1cd5('0xa7')],_0x5938e4=_0x185539[_0x1cd5('0x99')][_0x1cd5('0x8a')](_0x2a8fac),_0xee7abd=0x0,_0x44c0f4=_0x2b7067[_0x1cd5('0x70')]((_0x36c6e6['boxHeight']-_0x5938e4)/0x2);return new _0x5a1179(_0xee7abd,_0x44c0f4,_0x1b7f70,_0x5938e4);}}else{if(this[_0x1cd5('0x0')]<=0x0)this[_0x1cd5('0x9')]();}}},Window_Playtime[_0x1cd5('0x99')][_0x1cd5('0x9')]=function(){this[_0x1cd5('0x0')]=0x3c;const _0x345685=this['itemLineRect'](0x0),_0x48385f=_0x345685['x'],_0x2784ff=_0x345685['y'],_0x2b6ca1=_0x345685[_0x1cd5('0xe5')];this[_0x1cd5('0x129')][_0x1cd5('0x111')](),this[_0x1cd5('0x17e')](_0x345685),this[_0x1cd5('0x39')](_0x345685),this['drawPlaytime'](_0x345685);},Window_Playtime[_0x1cd5('0x99')][_0x1cd5('0xa9')]=function(){Window_Selectable[_0x1cd5('0x99')][_0x1cd5('0xa9')]['call'](this),this[_0x1cd5('0x129')][_0x1cd5('0xa4')]=VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0x110')][_0x1cd5('0x11a')];},Window_Playtime['prototype'][_0x1cd5('0x17e')]=function(_0x1a72f7){if(VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')]['Playtime']['Icon']>0x0){const _0x136ab7=VisuMZ['MainMenuCore'][_0x1cd5('0x124')][_0x1cd5('0x110')][_0x1cd5('0x11c')],_0x1b7a90=_0x1a72f7['y']+(this[_0x1cd5('0x90')]()-ImageManager[_0x1cd5('0xc6')])/0x2;this['drawIcon'](_0x136ab7,_0x1a72f7['x'],_0x1b7a90);const _0x4b503a=ImageManager[_0x1cd5('0x28')]+0x4;_0x1a72f7['x']+=_0x4b503a,_0x1a72f7[_0x1cd5('0xe5')]-=_0x4b503a;}},Window_Playtime[_0x1cd5('0x99')]['drawTimeLabel']=function(_0xb1a761){this['resetFontSettings'](),this[_0x1cd5('0x35')](ColorManager[_0x1cd5('0x7a')]());const _0x2f945f=VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')][_0x1cd5('0x110')]['Time'];this['drawText'](_0x2f945f,_0xb1a761['x'],_0xb1a761['y'],_0xb1a761['width'],_0x1cd5('0x83')),this[_0x1cd5('0x62')]();},Window_Playtime[_0x1cd5('0x99')][_0x1cd5('0x15c')]=function(_0x3f9c9b){const _0x1663ed=$gameSystem[_0x1cd5('0x153')]();this[_0x1cd5('0x8f')](_0x1663ed,_0x3f9c9b['x'],_0x3f9c9b['y'],_0x3f9c9b[_0x1cd5('0xe5')],_0x1cd5('0x152'));};function Window_MenuVariables(){this[_0x1cd5('0x98')](...arguments);}Window_MenuVariables['prototype']=Object[_0x1cd5('0x76')](Window_Selectable['prototype']),Window_MenuVariables[_0x1cd5('0x99')][_0x1cd5('0xe7')]=Window_MenuVariables,Window_MenuVariables[_0x1cd5('0x99')]['initialize']=function(_0x2a7404){Window_Selectable[_0x1cd5('0x99')]['initialize'][_0x1cd5('0x8')](this,_0x2a7404),this[_0x1cd5('0x75')]=VisuMZ['MainMenuCore'][_0x1cd5('0x124')]['Variable'][_0x1cd5('0x118')],this[_0x1cd5('0x9')]();},Window_MenuVariables[_0x1cd5('0x99')][_0x1cd5('0x117')]=function(){return this[_0x1cd5('0x90')]();},Window_MenuVariables[_0x1cd5('0x99')]['maxCols']=function(){const _0x57a0e8=SceneManager[_0x1cd5('0xd6')][_0x1cd5('0x136')]();if(_0x57a0e8===_0x1cd5('0x10e')){if(_0x1cd5('0xf')===_0x1cd5('0xf'))return 0x1;else{function _0x130ad6(){return _0x2e57ea[_0x1cd5('0x126')][_0x1cd5('0x168')][_0x1cd5('0x8')](this);}}}else return VisuMZ[_0x1cd5('0x126')]['Settings'][_0x1cd5('0x121')]['VarList']['length'];},Window_MenuVariables[_0x1cd5('0x99')][_0x1cd5('0xa9')]=function(){Window_Selectable[_0x1cd5('0x99')][_0x1cd5('0xa9')]['call'](this),this[_0x1cd5('0x129')][_0x1cd5('0xa4')]=VisuMZ[_0x1cd5('0x126')][_0x1cd5('0x124')]['Variable'][_0x1cd5('0x11a')],this[_0x1cd5('0x35')](ColorManager[_0x1cd5('0x7a')]());},Window_MenuVariables[_0x1cd5('0x99')][_0x1cd5('0x9a')]=function(){return this[_0x1cd5('0x75')][_0x1cd5('0x5f')];},Window_MenuVariables[_0x1cd5('0x99')]['drawAllItems']=function(){const _0x5e3f03=this['topIndex']();for(let _0x2d1425=0x0;_0x2d1425<this[_0x1cd5('0xbf')]();_0x2d1425++){const _0x21fba7=_0x5e3f03+_0x2d1425;_0x21fba7<this[_0x1cd5('0x9a')]()&&(this['drawItemBackground'](_0x21fba7),this[_0x1cd5('0x3b')](_0x21fba7));}},Window_MenuVariables[_0x1cd5('0x99')][_0x1cd5('0xa8')]=function(_0xb8ef58){},Window_MenuVariables['prototype'][_0x1cd5('0x3b')]=function(_0x4c9c45){const _0x3c348a=this[_0x1cd5('0x75')][_0x4c9c45];if(_0x3c348a<=0x0)return;const _0x43543e=this[_0x1cd5('0xd8')](_0x4c9c45);this[_0x1cd5('0xa9')]();let _0x5ef688=0x0,_0x4192a2=$dataSystem[_0x1cd5('0x144')][_0x3c348a][_0x1cd5('0x91')]();_0x4192a2[_0x1cd5('0x166')](/\\I\[(\d+)\]/i)&&(_0x5ef688=Number(RegExp['$1']),_0x4192a2=_0x4192a2[_0x1cd5('0x7f')](/\\I\[(\d+)\]/i,'')[_0x1cd5('0x91')]());if(_0x5ef688>0x0){const _0x1d51e1=_0x43543e['y']+(this['lineHeight']()-ImageManager[_0x1cd5('0xc6')])/0x2;this[_0x1cd5('0x34')](_0x5ef688,_0x43543e['x'],_0x1d51e1);const _0x47fba4=ImageManager[_0x1cd5('0x28')]+0x4;_0x43543e['x']+=_0x47fba4,_0x43543e['width']-=_0x47fba4;}this[_0x1cd5('0x8f')](_0x4192a2,_0x43543e['x'],_0x43543e['y'],_0x43543e[_0x1cd5('0xe5')],_0x1cd5('0x83')),this[_0x1cd5('0x35')](ColorManager['normalColor']()),this['drawText']($gameVariables[_0x1cd5('0x160')](_0x3c348a),_0x43543e['x'],_0x43543e['y'],_0x43543e[_0x1cd5('0xe5')],'right');};