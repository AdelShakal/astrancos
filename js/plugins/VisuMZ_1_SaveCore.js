//=============================================================================
// VisuStella MZ - Save Core
// VisuMZ_1_SaveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SaveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SaveCore = VisuMZ.SaveCore || {};
VisuMZ.SaveCore.version = 1.00;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.00] [SaveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Save_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Save Core plugin adds upon the existing functionality of how saves
 * operate in RPG Maker MZ and how the Save Menu appears in-game. Control over
 * autosaves is also provided by this plugin as well as the ability to make
 * Global Switches and Variables accessible across all game saves (including
 * new games).
 *
 * Features include all (but not limited to) the following:
 * 
 * - Save file technicalities including how filenames are made and or how
 *   forage keys are labeled to distinguish games from one another.
 * - Save types (standard, slot-locked, or single) to change saving to be
 *   suited for each game type.
 * - Save confirmation window added to relay information to player on whether
 *   or not a save has been made successfully.
 * - Global Switches and Variables that span across all saves and new games.
 * - Control over how autosaves handle (their own file, save over existing
 *   files, and/or both).
 * - Plugin Commands that enable/disable autosaves and forcefully activate them
 *   or request them.
 * - Change up how the Save Menu appears with various save styles.
 * - Add descriptions and pictures to the save files.
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
 * Global Switches and Global Variables
 * ============================================================================
 *
 * Global Switches and Global Variables are now added into the game engine via
 * this plugin. Global Switches and Global Variables exist in the same state
 * across all save files. This means if Switch 40 is declared to be a Global
 * Switch and is turned ON, then whether you start up a new game or open a
 * different save file, Switch 40 will be in the ON state. Similar will occur
 * with Global Variables.
 *
 * ---
 *
 * <Global> Switch/Variable Name
 *
 * To declare Global Switches and/or Global Variables, insert <Global> into
 * the Switch/Variable's name. That's all there is to it. Whatever value you
 * change the Global Switch/Variable to after declaring it will be changed
 * across all saves.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <Global>, <JS>, or <Self> simultaneously.
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
 * Autosave: Enable/Disable
 * - Enable or Disable Autosave
 * - Requires Database => System 1 => [x] Enable Autosave
 *
 *   Enable or Disable?:
 *   - Enable or disable autosave?
 *
 * ---
 *
 * Autosave: (Stage 1) Request
 * - Autosaves the game at current point if enabled.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - Autosave does not go through if it is neither enabled in the database or
 *   in-game through the "Autosave: Enable/Disable" plugin command.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 2) Execute
 * - Executes autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 3) Force
 * - Forces autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 *
 * ---
 *
 * Save: Current Slot
 * - Process the game's current save at the current point.
 * - Must be outside of battle and on the map.
 *
 * ---
 *
 * Save: Set Description
 * - Set the description text that will appear in the save files.
 *
 *   Text:
 *   - Insert desired save description text here.
 *   - Text codes supported.
 *
 * ---
 *
 * Save: Set Picture
 * - Set the picture that would appear in the save file.
 *
 *   Filename:
 *   - Input the filename here of the desired picture.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Save Settings
 * ============================================================================
 *
 * These are general settings pertaining to saves and the technicalities behind
 * how saves work in your game.
 *
 * ---
 *
 * General
 * 
 *   Save Style:
 *   - Select a save style for the game. Some of these options may alter other
 *     Plugin Parameter settings.
 *   - Standard: Save freely in any slot.
 *   - Slot-Locked: Select one dedicated slot at New Game.
 *   - Single: Only one slot is available for the game.
 * 
 *   Max Save Files:
 *   - Maximum number of save files for the game.
 * 
 *   Autosave Counts?:
 *   - Count the autosave file towards the max count?
 *
 * ---
 *
 * Local Mode
 * 
 *   Local Mode?:
 *   - When running the game on client, use the Local Mode of saving via files
 *     or store saves to forage keys?
 * 
 *   Filename Format:
 *   - Filename format for save files.
 *   - %1 - Save File ID
 * 
 *   Extension Format:
 *   - Filename extension format for save files.
 *   - %1 - Save Name
 *
 * ---
 *
 * Forage Key
 * 
 *   Forage Key Format:
 *   - Forage Key format when saving to memory.
 *   - %1 - Game ID, %2 - Save Name
 * 
 *   Forage Key Test:
 *   - Key used to test if saving a forage key is possible.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Help: Slot-Locked:
 *   - Help description used for initial slot-locked selection.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Save Success:
 *   - Code to perform when a save is successful.
 * 
 *   JS: On Save Failure:
 *   - Code to perform when a save has failed.
 * 
 *   JS: On Load Success:
 *   - Code to perform when a load is successful.
 * 
 *   JS: On Load Failure:
 *   - Code to perform when a load has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Confirm Window Settings
 * ============================================================================
 *
 * The Save Confirmation Window is a new feature added through this plugin.
 * It gives the player visual feedback letting the player know that a save is
 * successful or not.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Save Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions of the Save Confirmation Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for a "Save Success" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Save Failure:
 *   - Text used for a "Save Failure" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Load Failure:
 *   - Text used for a "Load Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Settings
 * ============================================================================
 *
 * These settings adjust how autosaves work in your game project. The settings
 * will encompass the original autosave settings made by RPG Maker MZ as well
 * as new settings added through this plugin.
 *
 * ---
 *
 * General
 * 
 *   Autosave Type:
 *   - Select autosave type.
 *   - Requires Database => System 1 => [x] Enable Autosave
 *   - Autosave File: Dedicated save file for autosaves.
 *   - Current File: Overwrites the current save file.
 *   - Autosave File + Current File: Both of the above.
 * 
 *   Start Enabled?:
 *   - Start with autosave enabled?
 *   - Requires Database => System 1 => [x] Enable Autosave
 *
 * ---
 *
 * Requests
 * 
 *   Requires Save Enable?:
 *   - Autosave requests require Saving to be enabled?
 * 
 *   Request after Battle?:
 *   - Requests an autosave after battle?
 * 
 *   Request on Transfer?:
 *   - Requests an autosave after a map transfer?
 * 
 *   Request on Menu Open?:
 *   - Requests an autosave after opening the main menu?
 * 
 *   Request on Menu Exit?:
 *   - Requests an autosave after exiting the main menu?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Success:
 *   - Code to perform when an autosave is successful.
 * 
 *   JS: On Failure:
 *   - Code to perform when an autosave has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Confirm Window Settings
 * ============================================================================
 *
 * The Autosave Confirmation Window is a new feature added by this plugin to
 * notify the player whenever autosaving occurs.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Autoave Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   Screen Position:
 *   - Where does this window appear on the screen?
 *   - Lower Left
 *   - Lower Center
 *   - Lower Right
 *   - Middle Left
 *   - Middle Center
 *   - Middle Right
 *   - Upper Left
 *   - Upper Center
 *   - Upper Right
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for an "Autosave Success" message popup.
 *   - Text codes are allowed
 * 
 *   Pop Up: Save Failure:
 *   - Text used for an "Autosave Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Options Settings
 * ============================================================================
 *
 * This plugin adds the "Autosave" option to the Options menu, allowing players
 * to decide if they want autosave enabled or not. This feature can be disabled
 * as well, to better suit games. If the "Autosave" option is turned off by the
 * player, then any Autosave requests and executions.
 *
 * ---
 *
 * Autosave Options
 * 
 *   Add Option?:
 *   - Add the 'Autosave' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - Determine the default value of this option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Graphic Settings
 * ============================================================================
 *
 * This Plugin Parameter lets you select which graphic to use for displaying
 * the actor party found inside the save menu.
 *
 * ---
 *
 * Actor Graphic
 * 
 *   None:
 *   - Don't display any actors.
 * 
 *   Face:
 *   - Display the face graphics for the actors.
 * 
 *   Map Sprite:
 *   - Display the sprite graphics for the actors.
 * 
 *   Sideview Battler:
 *   - Display the SV Battler graphics for the actors.
 *   * Note: If you have an existing save made before this plugin was
 *     installed, you may need to save over the existing ones to see the
 *     Sideview Battler graphics.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Menu Styles
 * ============================================================================
 *
 * Save Menu Styles affect how the save files themselves appear to the player,
 * as long horizontal lists, vertical columns, small boxes, or a large file.
 *
 * ---
 *
 * Save Menu Styles
 * 
 *   List:
 *   - Save files stretch horizontally across the screen.
 *   - Save files are listed as rows.
 * 
 *   Vertical:
 *   - Save files are stretched vertically across the screen.
 *   - Save files are depicted as columns.
 * 
 *   Box:
 *   - Save files are small boxes shown on the screen.
 *   - Save files are sign in both rows and columns.
 * 
 *   Large:
 *   - Save files take up the whole screen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Style Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to manipulate how the save styles
 * appear in-game if they're not to your liking. JavaScript familiarity is a
 * must to adjust them.
 *
 * ---
 *
 * General
 * 
 *   Latest Text:
 *   - Text used to depict latest save file.
 * 
 *   Latest Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Sprite Width:
 *   - Pixel width of map sprites when drawn in the Save Menu.
 * 
 *   SV Battler Width:
 *   - Pixel width of sv battlers when drawn in the Save Menu.
 *
 *   JS: Save Display Info:
 *   - Code that, upon saving, determines which info is quickly stored
 *     for displaying.
 *
 * ---
 *
 * List Style
 * Vertical Style
 * Box Style
 * Large Style
 * 
 *   Rows:
 *   - Number of rows for this style.
 * 
 *   Columns:
 *   - Number of column for this style.
 * 
 *   JS: Draw Contents:
 *   - Code on how to draw the contents for this style.
 * 
 *   JS: Draw File Data:
 *   - Code on how to draw the file data for this style.
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
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveEnable
 * @text Autosave: Enable/Disable
 * @desc Enable or Disable Autosave
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @arg Enable:eval
 * @text Enable or Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable or disable autosave?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveRequest
 * @text Autosave: (Stage 1) Request
 * @desc Autosaves the game at current point if enabled.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveExecute
 * @text Autosave: (Stage 2) Execute
 * @desc Executes autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveForce
 * @text Autosave: (Stage 3) Force
 * @desc Force autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveCurrentSlot
 * @text Save: Current Slot
 * @desc Process the game's current save at the current point.
 * Must be outside of battle and on the map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveDescription
 * @text Save: Set Description
 * @desc Set the description text that will appear in the save files.
 *
 * @arg Text:str
 * @text Text
 * @desc Insert desired save description text here.
 * Text codes supported.
 * @default Text
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SavePicture
 * @text Save: Set Picture
 * @desc Set the picture that would appear in the save file.
 *
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Input the filename here of the desired picture.
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
 * @param SaveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Save:struct
 * @text Save Settings
 * @type struct<Save>
 * @desc General save settings pertaining to the game.
 * @default {"General":"","SaveStyle:str":"standard","MaxSaveFiles:num":"20","AutosaveMaxCount:eval":"false","LocalMode":"","LocalMode:eval":"true","FilenameFmt:str":"file%1","ExtensionFmt:str":"%1.rmmzsave","ForageKey":"","KeyFmt:str":"rmmzsave.%1.%2","TestKey:str":"rmmzsave.test","Vocabulary":"","VocabLockedSaveSlot:str":"Pick a file to start a new game.","JavaScript":"","OnSaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnSaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param SaveConfirm:struct
 * @text Confirm Window
 * @parent Save:struct
 * @type struct<SaveConfirm>
 * @desc Settings regarding the Save Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ConfirmRect:func":"\"const width = Graphics.boxWidth / 2;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = (Graphics.width - width) / 2;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Vocabulary":"","VocabSaveSuccess:str":"Save Successful!","VocabSaveFailure:str":"Could not save!","VocabLoadFailure:str":"Could not load save file!"}
 *
 * @param Autosave:struct
 * @text Autoave Settings
 * @type struct<Autosave>
 * @desc Game settings related to autosave.
 * @default {"General":"","AutosaveType:str":"file0","StartEnabled:eval":"true","Requests":"","RequestsRequireSaveEnable:eval":"true","AfterBattle:eval":"true","AfterTransfer:eval":"true","AfterMenuCall:eval":"true","AfterExitMenu:eval":"true","JavaScript":"","OnAutosaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnAutosaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param AutosaveConfirm:struct
 * @text Confirm Window
 * @parent Autosave:struct
 * @type struct<AutosaveConfirm>
 * @desc Settings regarding the Autosave Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ScreenPosition:str":"lower right","Vocabulary":"","VocabAutosaveSuccess:str":"\\I[193]Autosaved!","VocabAutosaveFailure:str":"\\I[194]Autosave failed!"}
 *
 * @param AutosaveOption:struct
 * @text Options Settings
 * @parent Autosave:struct
 * @type struct<AutosaveOption>
 * @desc Options Menu settings regarding Autosave.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Autosave","Default:num":"true"}
 *
 * @param StyleBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ActorGraphic:str
 * @text Actor Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in save menus.
 * @default face
 *
 * @param SaveMenuStyle:str
 * @text Save Menu Style
 * @type select
 * @option List
 * @value list
 * @option Vertical
 * @value vertical
 * @option Box
 * @value box
 * @option Large
 * @value large
 * @desc Choose what kind of style to use for the Save Menu.
 * @default box
 *
 * @param SaveMenu:struct
 * @text Style Settings
 * @parent SaveMenuStyle:str
 * @type struct<SaveMenu>
 * @desc Settings regarding the individual Save Menu styles.
 * @default {"General":"","LatestText:str":"NEW!","LatestColor:str":"#f49ac1","SpriteWidth:num":"48","SvBattlerWidth:num":"64","MakeSavefileInfoJS:func":"\"// Declare Constants\\nconst info = arguments[0];\\n\\n// Store Displayed Save Data\\ninfo.gold = $gameParty.gold();\\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\\ninfo.description = $gameSystem.getSaveDescription() || '';\\ninfo.picture = $gameSystem.getSavePicture() || '';\\n\\n// Return Save Info\\nreturn info;\"","List":"","ListRows:num":"4","ListCols:num":"1","ListContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nlet ch = rect.height;\\nif (this.actorStyle() === 'sprite') {\\n    ch -= lineHeight - 8;\\n} else if (this.actorStyle() === 'svbattler') {\\n    ch -= lineHeight - 12;\\n}\\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nif (info.gold || info.description) {\\n    const gy = rect.y + rect.height - lineHeight;\\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n}\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight;\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\"","ListFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);\"","Vertical":"","VertRows:num":"1","VertCols:num":"3","VertContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + rect.height - lineHeight;\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny -= lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    y -= lineHeight;\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","VertFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Box":"","BoxRows:num":"2","BoxCols:num":"3","BoxContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst rh = rect.height - lineHeight * 3;\\nconst ch = ImageManager.faceHeight;\\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + lineHeight;\\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\ny += lineHeight;\\nconst hw = rect.width / 2;\\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nif (info.gold) {\\n    // Ignore drawing gold in this style\\n    // y = rect.y + rect.height - lineHeight * 3;\\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\"","BoxFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Large":"","LargeRows:num":"1","LargeCols:num":"1","LargeContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 1.5;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","LargeFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\""}
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
 * General Save Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Save:
 *
 * @param General
 *
 * @param SaveStyle:str
 * @text Save Style
 * @parent General
 * @type select
 * @option Standard: Save freely in any slot.
 * @value standard
 * @option Slot-Locked: Select one dedicated slot at New Game.
 * @value locked
 * @option Single: Only one slot is available for the game.
 * @value single
 * @desc Select a save style for the game. Some of these options
 * may alter other Plugin Parameter settings.
 * @default standard
 *
 * @param MaxSaveFiles:num
 * @text Max Save Files
 * @parent General
 * @desc Maximum number of save files for the game.
 * @default 20
 *
 * @param AutosaveMaxCount:eval
 * @text Autosave Counts?
 * @parent General
 * @type boolean
 * @on Counts Towards Max
 * @off Doesn't Count
 * @desc Count the autosave file towards the max count?
 * @default false
 *
 * @param LocalMode
 * @text Local Mode
 *
 * @param LocalMode:eval
 * @text Local Mode?
 * @parent LocalMode
 * @type boolean
 * @on Local File
 * @off Forage Key
 * @desc When running the game on client, use the Local Mode of
 * saving via files or store saves to forage keys?
 * @default true
 *
 * @param FilenameFmt:str
 * @text Filename Format
 * @parent LocalMode
 * @desc Filename format for save files.
 * %1 - Save File ID
 * @default file%1
 *
 * @param ExtensionFmt:str
 * @text Extension Format
 * @parent LocalMode
 * @desc Filename extension format for save files.
 * %1 - Save Name
 * @default %1.rmmzsave
 *
 * @param ForageKey
 * @text Forage Key
 *
 * @param KeyFmt:str
 * @text Forage Key Format
 * @parent ForageKey
 * @desc Forage Key format when saving to memory.
 * %1 - Game ID, %2 - Save Name
 * @default rmmzsave.%1.%2
 *
 * @param TestKey:str
 * @text Forage Key Test
 * @parent ForageKey
 * @desc Key used to test if saving a forage key is possible.
 * @default rmmzsave.test
 *
 * @param Vocabulary
 *
 * @param VocabLockedSaveSlot:str
 * @text Help: Slot-Locked
 * @parent Vocabulary
 * @desc Help description used for initial slot-locked selection.
 * @default Pick a file to start a new game.
 *
 * @param JavaScript
 *
 * @param OnSaveSuccessJS:func
 * @text JS: On Save Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnSaveFailureJS:func
 * @text JS: On Save Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadSuccessJS:func
 * @text JS: On Load Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadFailureJS:func
 * @text JS: On Load Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Save Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ConfirmRect:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions of the 
 * Save Confirmation Window.
 * @default "const width = Graphics.boxWidth / 2;\nconst height = this.calcWindowHeight(1, false);\nconst x = (Graphics.width - width) / 2;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Vocabulary
 *
 * @param VocabSaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for a "Save Success" message popup.
 * Text codes are allowed.
 * @default Save Successful!
 *
 * @param VocabSaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for a "Save Failure" message popup.
 * Text codes are allowed.
 * @default Could not save!
 *
 * @param VocabLoadFailure:str
 * @text Pop Up: Load Failure
 * @parent Vocabulary
 * @desc Text used for a "Load Failure" message popup.
 * Text codes are allowed.
 * @default Could not load save file!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Autosave:
 *
 * @param General
 *
 * @param AutosaveType:str
 * @text Autosave Type
 * @parent General
 * @type select
 * @option Autosave File: Dedicated file for autosaves.
 * @value file0
 * @option Current File: Overwrites the current save file.
 * @value current
 * @option Autosave File + Current File: Both of the above.
 * @value both
 * @desc Select autosave type.
 * Requires Database => System 1 => [x] Enable Autosave
 * @default file0
 *
 * @param StartEnabled:eval
 * @text Start Enabled?
 * @parent General
 * @type boolean
 * @on Start Enabled
 * @off Start Disabled
 * @desc Start with autosave enabled?
 * Requires Database => System 1 => [x] Enable Autosave
 * @default true
 *
 * @param Requests
 *
 * @param RequestsRequireSaveEnable:eval
 * @text Requires Save Enable?
 * @parent Requests
 * @type boolean
 * @on Requires Save Enable
 * @off Doesn't Require
 * @desc Autosave requests require Saving to be enabled?
 * @default true
 *
 * @param AfterBattle:eval
 * @text Request after Battle?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after battle?
 * @default true
 *
 * @param AfterTransfer:eval
 * @text Request on Transfer?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after a map transfer?
 * @default true
 *
 * @param AfterMenuCall:eval
 * @text Request on Menu Open?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after opening the main menu?
 * @default true
 *
 * @param AfterExitMenu:eval
 * @text Request on Menu Exit?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after exiting the main menu?
 * @default true
 *
 * @param JavaScript
 *
 * @param OnAutosaveSuccessJS:func
 * @text JS: On Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnAutosaveFailureJS:func
 * @text JS: On Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Autoave Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ScreenPosition:str
 * @text Screen Position
 * @parent General
 * @type select
 * @option Lower Left
 * @value lower left
 * @option Lower Center
 * @value lower center
 * @option Lower Right
 * @value lower right
 * @option Middle Left
 * @value middle left
 * @option Middle Center
 * @value middle center
 * @option Middle Right
 * @value middle right
 * @option Upper Left
 * @value upper left
 * @option Upper Center
 * @value upper center
 * @option Upper Right
 * @value upper right
 * @desc Where does this window appear on the screen?
 * @default lower right
 *
 * @param Vocabulary
 *
 * @param VocabAutosaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for an "Autosave Success" message popup.
 * Text codes are allowed.
 * @default \I[193]Autosaved!
 *
 * @param VocabAutosaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for an "Autosave Failure" message popup.
 * Text codes are allowed.
 * @default \I[194]Autosave failed!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveOption:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Autosave' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Autosave
 *
 * @param Default:eval
 * @text Default Value
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Determine the default value of this option.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param General
 *
 * @param LatestText:str
 * @text Latest Text
 * @parent General
 * @desc Text used to depict latest save file.
 * @default NEW!
 *
 * @param LatestColor:str
 * @text Latest Color
 * @parent General
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #f49ac1
 *
 * @param SpriteWidth:num
 * @text Sprite Width
 * @parent General
 * @type number
 * @desc Pixel width of map sprites when drawn in the Save Menu.
 * @default 48
 *
 * @param SvBattlerWidth:num
 * @text SV Battler Width
 * @parent General
 * @type number
 * @desc Pixel width of sv battlers when drawn in the Save Menu.
 * @default 64
 *
 * @param MakeSavefileInfoJS:func
 * @text JS: Save Display Info
 * @parent General
 * @type note
 * @desc Code that, upon saving, determines which info is quickly stored for displaying.
 * @default "// Declare Constants\nconst info = arguments[0];\n\n// Store Displayed Save Data\ninfo.gold = $gameParty.gold();\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\ninfo.description = $gameSystem.getSaveDescription() || '';\ninfo.picture = $gameSystem.getSavePicture() || '';\n\n// Return Save Info\nreturn info;"
 *
 * @param List
 * @text List Style
 *
 * @param ListRows:num
 * @text Rows
 * @parent List
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 4
 *
 * @param ListCols:num
 * @text Columns
 * @parent List
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param ListContentsJS:func
 * @text JS: Draw Contents
 * @parent List
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nlet ch = rect.height;\nif (this.actorStyle() === 'sprite') {\n    ch -= lineHeight - 8;\n} else if (this.actorStyle() === 'svbattler') {\n    ch -= lineHeight - 12;\n}\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nif (info.gold || info.description) {\n    const gy = rect.y + rect.height - lineHeight;\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n}\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight;\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');"
 *
 * @param ListFileDataJS:func
 * @text JS: Draw File Data
 * @parent List
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);"
 *
 * @param Vertical
 * @text Vertical Style
 *
 * @param VertRows:num
 * @text Rows
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param VertCols:num
 * @text Columns
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param VertContentsJS:func
 * @text JS: Draw Contents
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + rect.height - lineHeight;\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny -= lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    y -= lineHeight;\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param VertFileDataJS:func
 * @text JS: Draw File Data
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Box
 * @text Box Style
 *
 * @param BoxRows:num
 * @text Rows
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 2
 *
 * @param BoxCols:num
 * @text Columns
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param BoxContentsJS:func
 * @text JS: Draw Contents
 * @parent Box
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst rh = rect.height - lineHeight * 3;\nconst ch = ImageManager.faceHeight;\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + lineHeight;\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\ny += lineHeight;\nconst hw = rect.width / 2;\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nif (info.gold) {\n    // Ignore drawing gold in this style\n    // y = rect.y + rect.height - lineHeight * 3;\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);"
 *
 * @param BoxFileDataJS:func
 * @text JS: Draw File Data
 * @parent Box
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Large
 * @text Large Style
 *
 * @param LargeRows:num
 * @text Rows
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param LargeCols:num
 * @text Columns
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param LargeContentsJS:func
 * @text JS: Draw Contents
 * @parent Large
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 1.5;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param LargeFileDataJS:func
 * @text JS: Draw File Data
 * @parent Large
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 */
//=============================================================================

const _0x5dbc=['Game_Variables_setValue','getSavePicture','SaveMenu','ListContentsJS','Scene_Base_onAutosaveFailure','svActorHorzCells','switches','push','_commandWindow','BoxRows','calcWindowHeight','ConfigManager_makeData','open','gameId','drawSvBattlerSprites','playSave','updateFade','ARRAYSTRUCT','inBattle','number','Scene_Save_executeSave','onAutosaveFailure','callMenu','getSeconds','IoWNx','addGeneralOptions','onBeforeSave','Scene_Save_onSaveFailure','onSaveCoreLoadSuccess','getFullYear','requestAutosave','contentsOpacity','oWwgW','isSaveEnabled','JisqG','aQmcX','TestKey','AfterBattle','fileDirectoryPath','svActorVertCells','registerCommand','Game_System_savefileId','gllxE','Scene_Boot_onDatabaseLoaded','Game_Switches_setValue','GlweZ','isEnabled','filePath','RequestsRequireSaveEnable','face','LatestColor','getDate','onSaveSuccess','whIwo','KsQRI','isAutosaveCompatible','QDfvh','saveSuccess','loadFailureConfirmationWindow','_SaveCoreSettings','setWordWrap','constructor','iqScw','process_VisuMZ_SaveCore_Settings','SaveMenuStyle','SaveDescription','YNhYQ','max','Window_Options_addGeneralOptions','drawPlaytime','Game_System_initialize','fadeIn','yFyUu','JSON','DataManager_makeSavefileInfo','AutosaveType','prototype','initialize','dimColor2','svbattlersForSaveFile','actorStyle','Scene_Title_initialize','nzEBh','getScreenPosition','VertRows','commandContinue','optAutosave','forageTestKey','VocabAutosaveFailure','bBpQw','maxSavefiles','includes','OnLoadFailureJS','ConvertParams','createAutosaveConfirmationWindow','onAfterLoad','onSaveCoreLoadFailure','isNwjs','LatestText','drawCurrencyValue','join','SaveConfirm','gradientFillRect','onSaveFailure','PSXFP','SavePicture','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','close','variables','_loadSuccess','_bypassAutosave','setSavefileId','executeSave','LocalMode','Scene_Base_onAutosaveSuccess','Scene_Load_onLoadSuccess','Scene_Title_commandNewGame','Scene_Options_maxCommands','drawLatestMarker','mainCommandWidth','ftkmc','file','fadeOutAll','Filename','_processingAutosave','faces','battlerName','TOHsU','picture','_pickLockedSaveSlot','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ceil','drawSvActor','drawListStyleContents','removeChild','peyEe','file0','padStart','_listWindow','isAutosaveConfirmWindowEnabled','pickLockedSaveSlot','BnMvT','refresh','name','svbattlers','savefileInfo','call','LargeCols','AutosaveEnable','determineAutosaveBypass','AutosaveConfirm','savePicture','isGlobal','isEventTest','EVAL','ARRAYEVAL','drawDescription','resetFontSettings','openAutosaveConfirmationWindow','menuStyle','faceWidth','version','loadFailure','Scene_Menu_create','xTCfF','VisuMZ_1_MessageCore','popScene','large','isBattleTest','drawItem','autosaveType','width','height','return\x200','textSizeEx','left','contentsBack','SaveCore','Text','pOeqd','DqJCE','etvXF','loadSvActor','forageKey','goto','_savefileId','autosaveOption','center','maxCols','AfterMenuCall','Scene_Title_terminate','drawBackground','closeSaveConfirmationWindow','autosaveEnabled','setSaveDescription','globalValue','ExtensionFmt','HgjsY','format','commandSaveLocked','toUpperCase','getColorDataFromPluginParameters','loadGame','replace','description','playtime','ConfigManager_applyData','autosaveFailure','Scene_Base_requestAutosave','OnLoadSuccessJS','BoxCols','isAutosaveEnabled','executeAutosave','VocabSaveSuccess','drawActorSprites','onTransferEnd','_saveConfirmWindow','addLoadListener','playLoad','startNewGameLockedSave','autosaveSuccess','dimColor1','vertical','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','drawBoxStyleFileData','commandSave','AddOption','saveMenuSpriteWidth','BoxFileDataJS','contents','ListRows','saveMenuSvBattlerWidth','right','setFadeSpeed','log','onSaveCoreSaveFailure','innerHeight','FilenameFmt','exit','resetWordWrap','drawTitle','indexToSavefileId','STR','savefileId','loadPicture','_success','value','saveFailure','box','Autosave','drawLargeStyleContents','gold','autosave','timestamp','NNpen','process_VisuMZ_SaveCore_Switches_Variables','OnSaveSuccessJS','commandNewGame','reloadMapIfUpdated','Scene_Map_onMapLoaded','AutosaveMaxCount','battleMembers','cFwbU','characters','catch','drawText','VocabSaveFailure','getMinutes','maxBattleMembers','tyOpY','setValue','xmdTg','addSaveCoreAutosaveCommand','OnAutosaveFailureJS','ActorGraphic','drawPicture','saveDescription','setSetSuccess','createContents','openSaveConfirmationWindow','addSaveCoreCommands','drawActorFaces','makeSavefileInfo','AdjustRect','AutosaveRequest','AutosaveForce','playBuzzer','currencyUnit','YEbTo','Settings','onLoadFailure','status','drawCenteredPicture','onMapLoaded','[Year].[Month].[Date]\x20[Hour]:[Minute]:[Second]','onLoadSuccess','drawVerticalStyleFileData','FUNC','ConfirmRect','BoxContentsJS','onSaveCoreSaveSuccess','clear','floor','AutosaveOption','GlobalSwitches','ScreenPosition','VertCols','_active','drawContentsLoaded','maxCommands','drawFace','Save','makeSavename','map','addCommand','Scene_Map_onTransferEnd','drawCharacter','lLpNo','AfHEj','IwNZV','autosaveConfirmationWindowRect','AfterTransfer','drawActors','fadeOut','getTimestamp','Enable','filter','initSaveCore','Default','latestSavefile','transfer','_stored_latestSavefile','forceAutosave','Scene_Save_helpWindowText','create','changeTextColor','makeData','then','_scene','update','saveConfirmationWindowRect','setMode','saveStyle','helpWindowText','onAutosaveSuccess','activateListWindow','battle','StartEnabled','commandContinueSaveCoreSingle','setSavePicture','drawTimestamp','commandNewGameSaveCoreLocked','single','min','both','GlobalVariables','Window_SavefileList_setMode','drawBoxStyleContents','round','mwTBu','drawVerticalStyleContents','LargeContentsJS','ListFileDataJS','saveCurrentSlot','smoothSelect','save','OnAutosaveSuccessJS','_autosaveConfirmWindow','ARRAYFUNC','drawTextEx','STRUCT','drawListStyleFileData','enableAutosave','Scene_Title_commandContinue','match','NCBOQ','Game_Variables_value','Game_Switches_value','bind','_colorCache','createSaveConfirmationWindow','AutosaveExecute','setupNewGame','locked','drawFileData','SaveCurrentSlot','savefileIdToIndex','parse','length','OnSaveFailureJS','Scene_Menu_commandSave','windowPadding','SaveStyle','blt','Duration','innerWidth','getHours','onDatabaseLoaded','selectSavefile','sprite','terminate','current','getMonth','addChild','globalSwitches','_fadeSpeed','isPreviousScene','QHARx','closeAutosaveConfirmationWindow','VocabAutosaveSuccess','ARRAYJSON','globalVariables','setGlobalValue','drawContents','split','shouldAutosave','saveGame','isSaveConfirmWindowEnabled','QWJXc','opacity'];(function(_0x54b45a,_0x5dbc2b){const _0x5f0ee0=function(_0x4abf3e){while(--_0x4abf3e){_0x54b45a['push'](_0x54b45a['shift']());}};_0x5f0ee0(++_0x5dbc2b);}(_0x5dbc,0x1c8));const _0x5f0e=function(_0x54b45a,_0x5dbc2b){_0x54b45a=_0x54b45a-0x0;let _0x5f0ee0=_0x5dbc[_0x54b45a];return _0x5f0ee0;};var label=_0x5f0e('0x8d'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5f0e('0x122')](function(_0x3b6fea){return _0x3b6fea[_0x5f0e('0xff')]&&_0x3b6fea[_0x5f0e('0xa8')][_0x5f0e('0x37')]('['+label+']');})[0x0];VisuMZ[label][_0x5f0e('0xfd')]=VisuMZ[label][_0x5f0e('0xfd')]||{},VisuMZ[_0x5f0e('0x39')]=function(_0x1b108a,_0x4ae48b){for(const _0x392d89 in _0x4ae48b){if(_0x5f0e('0xa1')!==_0x5f0e('0xa1')){function _0x48f037(){const _0x21675e=_0x51f49b[_0x5f0e('0x13d')](_0x3b06c8[_0x5f0e('0x59')][_0x5f0e('0x160')],_0x334339[_0x5f0e('0xe8')]()),_0x39f4ad=_0x4db3d2[_0x5f0e('0x13d')](_0x57c4d7[_0x5f0e('0x7c')],_0x36f4f9[_0x5f0e('0x10a')](_0x3bad6e/_0x21675e));_0x24966b=_0x1da59d+_0x3adaa8['round']((_0x54af48-_0x21675e*_0x39f4ad)/0x2);for(const _0x1cb5dd of _0x57a859[_0x5f0e('0x59')]){this[_0x5f0e('0x112')](_0x1cb5dd[0x0],_0x1cb5dd[0x1],_0x4b615f,_0x564f17+0x1,_0x39f4ad,_0x5a248d-0x2),_0xa7fd15+=_0x39f4ad;}}}else{if(_0x392d89[_0x5f0e('0x152')](/(.*):(.*)/i)){if(_0x5f0e('0x1a2')===_0x5f0e('0x63')){function _0xf131f6(){_0x1b6f18[_0x5f0e('0x8d')][_0x5f0e('0x22')][_0x5f0e('0x6e')](this),this[_0x5f0e('0x123')]();}}else{const _0x18cd2a=String(RegExp['$1']),_0x2925a6=String(RegExp['$2'])[_0x5f0e('0xa4')]()['trim']();let _0x1ad7ed,_0x5c3e46,_0x5451bd;switch(_0x2925a6){case'NUM':_0x1ad7ed=_0x4ae48b[_0x392d89]!==''?Number(_0x4ae48b[_0x392d89]):0x0;break;case'ARRAYNUM':_0x5c3e46=_0x4ae48b[_0x392d89]!==''?JSON[_0x5f0e('0x15f')](_0x4ae48b[_0x392d89]):[],_0x1ad7ed=_0x5c3e46['map'](_0x2db1bb=>Number(_0x2db1bb));break;case _0x5f0e('0x76'):_0x1ad7ed=_0x4ae48b[_0x392d89]!==''?eval(_0x4ae48b[_0x392d89]):null;break;case _0x5f0e('0x77'):_0x5c3e46=_0x4ae48b[_0x392d89]!==''?JSON[_0x5f0e('0x15f')](_0x4ae48b[_0x392d89]):[],_0x1ad7ed=_0x5c3e46[_0x5f0e('0x115')](_0x57bc55=>eval(_0x57bc55));break;case _0x5f0e('0x25'):_0x1ad7ed=_0x4ae48b[_0x392d89]!==''?JSON['parse'](_0x4ae48b[_0x392d89]):'';break;case _0x5f0e('0x176'):_0x5c3e46=_0x4ae48b[_0x392d89]!==''?JSON[_0x5f0e('0x15f')](_0x4ae48b[_0x392d89]):[],_0x1ad7ed=_0x5c3e46[_0x5f0e('0x115')](_0x10b7f7=>JSON[_0x5f0e('0x15f')](_0x10b7f7));break;case _0x5f0e('0x105'):_0x1ad7ed=_0x4ae48b[_0x392d89]!==''?new Function(JSON[_0x5f0e('0x15f')](_0x4ae48b[_0x392d89])):new Function(_0x5f0e('0x89'));break;case _0x5f0e('0x14c'):_0x5c3e46=_0x4ae48b[_0x392d89]!==''?JSON['parse'](_0x4ae48b[_0x392d89]):[],_0x1ad7ed=_0x5c3e46[_0x5f0e('0x115')](_0x8260b8=>new Function(JSON['parse'](_0x8260b8)));break;case _0x5f0e('0xce'):_0x1ad7ed=_0x4ae48b[_0x392d89]!==''?String(_0x4ae48b[_0x392d89]):'';break;case'ARRAYSTR':_0x5c3e46=_0x4ae48b[_0x392d89]!==''?JSON['parse'](_0x4ae48b[_0x392d89]):[],_0x1ad7ed=_0x5c3e46['map'](_0x36009f=>String(_0x36009f));break;case _0x5f0e('0x14e'):_0x5451bd=_0x4ae48b[_0x392d89]!==''?JSON['parse'](_0x4ae48b[_0x392d89]):{},_0x1b108a[_0x18cd2a]={},VisuMZ[_0x5f0e('0x39')](_0x1b108a[_0x18cd2a],_0x5451bd);continue;case _0x5f0e('0x191'):_0x5c3e46=_0x4ae48b[_0x392d89]!==''?JSON[_0x5f0e('0x15f')](_0x4ae48b[_0x392d89]):[],_0x1ad7ed=_0x5c3e46[_0x5f0e('0x115')](_0x92180e=>VisuMZ[_0x5f0e('0x39')]({},JSON[_0x5f0e('0x15f')](_0x92180e)));break;default:continue;}_0x1b108a[_0x18cd2a]=_0x1ad7ed;}}}}return _0x1b108a;},(_0x43cd02=>{const _0x1af0e4=_0x43cd02[_0x5f0e('0x6b')];for(const _0x26e782 of dependencies){if(_0x5f0e('0x44')===_0x5f0e('0x8f')){function _0x35c6e5(){_0x4df962['prototype'][_0x5f0e('0x9c')]['call'](this,_0x5b14ca),_0x14e911?this['activateListWindow']():this[_0x5f0e('0x135')]();}}else{if(!Imported[_0x26e782]){if(_0x5f0e('0xda')===_0x5f0e('0x35')){function _0x54059e(){this[_0x5f0e('0xb7')](_0x52dfbf);}}else{alert(_0x5f0e('0x46')[_0x5f0e('0xa2')](_0x1af0e4,_0x26e782)),SceneManager['exit']();break;}}}}const _0x1b8c3f=_0x43cd02[_0x5f0e('0xa8')];if(_0x1b8c3f[_0x5f0e('0x152')](/\[Version[ ](.*?)\]/i)){if('QHARx'===_0x5f0e('0x173')){const _0x167f83=Number(RegExp['$1']);if(_0x167f83!==VisuMZ[label][_0x5f0e('0x7d')]){if('KZeRp'!==_0x5f0e('0x12'))alert(_0x5f0e('0x5e')['format'](_0x1af0e4,_0x167f83)),SceneManager[_0x5f0e('0xca')]();else{function _0x3579f2(){return this['battleMembers']()[_0x5f0e('0x115')](_0x2aaa92=>_0x2aaa92[_0x5f0e('0x5a')]());}}}}else{function _0x4168af(){if(!_0x33ed5c[_0x5f0e('0x32')])return![];if(this[_0x5f0e('0x17')]===_0x29b3fe)this[_0x5f0e('0x123')]();if(this[_0x5f0e('0x17')][_0x5f0e('0xf0')]===_0x18cf8b)this['initSaveCore']();return this[_0x5f0e('0x17')][_0x5f0e('0xf0')];}}}if(_0x1b8c3f[_0x5f0e('0x152')](/\[Tier[ ](\d+)\]/i)){const _0x5a2a99=Number(RegExp['$1']);if(_0x5a2a99<tier)alert(_0x5f0e('0xbb')[_0x5f0e('0xa2')](_0x1af0e4,_0x5a2a99,tier)),SceneManager['exit']();else{if(_0x5f0e('0xfc')!==_0x5f0e('0xfc')){function _0x2fe8a8(){const _0x42287f=this[_0x5f0e('0x53')](),_0x50cea2=this['calcWindowHeight'](0x1,![]),_0x3260d0=_0x311817['width']-_0x42287f,_0x2178d6=_0x1c031b[_0x5f0e('0x88')]-_0x50cea2;return new _0x247e75(_0x3260d0,_0x2178d6,_0x42287f,_0x50cea2);}}else tier=Math[_0x5f0e('0x1f')](_0x5a2a99,tier);}}VisuMZ[_0x5f0e('0x39')](VisuMZ[label][_0x5f0e('0xfd')],_0x43cd02['parameters']);})(pluginData),PluginManager[_0x5f0e('0x4')](pluginData[_0x5f0e('0x6b')],_0x5f0e('0x70'),_0x12270f=>{if(!DataManager[_0x5f0e('0x13')]())return;VisuMZ['ConvertParams'](_0x12270f,_0x12270f);if($gameSystem)$gameSystem[_0x5f0e('0x150')](_0x12270f[_0x5f0e('0x121')]);}),PluginManager[_0x5f0e('0x4')](pluginData[_0x5f0e('0x6b')],_0x5f0e('0xf8'),_0x297f89=>{if(!DataManager[_0x5f0e('0x13')]()||$gameParty[_0x5f0e('0x192')]())return;SceneManager[_0x5f0e('0x12e')][_0x5f0e('0x19e')]();}),PluginManager[_0x5f0e('0x4')](pluginData[_0x5f0e('0x6b')],_0x5f0e('0x159'),_0x4a74b8=>{if(!DataManager[_0x5f0e('0x13')]()||$gameParty['inBattle']())return;SceneManager[_0x5f0e('0x12e')][_0x5f0e('0xb0')]();}),PluginManager[_0x5f0e('0x4')](pluginData['name'],_0x5f0e('0xf9'),_0x509ab3=>{if(!DataManager['isAutosaveCompatible']()||$gameParty[_0x5f0e('0x192')]())return;SceneManager[_0x5f0e('0x12e')][_0x5f0e('0x128')]();}),PluginManager[_0x5f0e('0x4')](pluginData[_0x5f0e('0x6b')],_0x5f0e('0x15d'),_0x2484cc=>{SceneManager[_0x5f0e('0x12e')]['saveCurrentSlot']();}),PluginManager[_0x5f0e('0x4')](pluginData[_0x5f0e('0x6b')],_0x5f0e('0x1d'),_0x201394=>{VisuMZ[_0x5f0e('0x39')](_0x201394,_0x201394);if($gameSystem)$gameSystem[_0x5f0e('0x9e')](_0x201394[_0x5f0e('0x8e')]);}),PluginManager[_0x5f0e('0x4')](pluginData['name'],_0x5f0e('0x45'),_0x5be3f0=>{VisuMZ[_0x5f0e('0x39')](_0x5be3f0,_0x5be3f0);if($gameSystem)$gameSystem[_0x5f0e('0x139')](_0x5be3f0[_0x5f0e('0x57')]);}),VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x7')]=Scene_Boot['prototype'][_0x5f0e('0x169')],Scene_Boot[_0x5f0e('0x28')][_0x5f0e('0x169')]=function(){VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x7')][_0x5f0e('0x6e')](this),this[_0x5f0e('0x1b')](),this[_0x5f0e('0xdb')]();},Scene_Boot[_0x5f0e('0x28')][_0x5f0e('0x1b')]=function(){if(StorageManager[_0x5f0e('0x132')]()===_0x5f0e('0x13c'))$dataSystem[_0x5f0e('0x32')]=!![];},VisuMZ['GlobalSwitches']=[],VisuMZ['GlobalVariables']=[],Scene_Boot[_0x5f0e('0x28')][_0x5f0e('0xdb')]=function(){for(let _0x95be89=0x1;_0x95be89<$dataSystem[_0x5f0e('0x186')][_0x5f0e('0x160')];_0x95be89++){if($dataSystem[_0x5f0e('0x186')][_0x95be89][_0x5f0e('0x152')](/<GLOBAL>/i))VisuMZ['GlobalSwitches'][_0x5f0e('0x187')](_0x95be89);}for(let _0x44612e=0x1;_0x44612e<$dataSystem['variables'][_0x5f0e('0x160')];_0x44612e++){if(_0x5f0e('0x119')!==_0x5f0e('0x119')){function _0x539140(){this['x']=(_0xf6a1b9[_0x5f0e('0x87')]-this[_0x5f0e('0x87')])/0x2;}}else{if($dataSystem[_0x5f0e('0x48')][_0x44612e][_0x5f0e('0x152')](/<GLOBAL>/i))VisuMZ['GlobalVariables'][_0x5f0e('0x187')](_0x44612e);}}},DataManager[_0x5f0e('0x13')]=function(){return!DataManager[_0x5f0e('0x84')]()&&!DataManager[_0x5f0e('0x75')]()&&$dataSystem[_0x5f0e('0x32')];},DataManager[_0x5f0e('0x36')]=function(){if(StorageManager[_0x5f0e('0x132')]()===_0x5f0e('0x13c'))return 0x1;let _0x2fe6d9=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')]['Save'][_0x5f0e('0xe0')]?0x0:0x1;return VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x113')]['MaxSaveFiles']+_0x2fe6d9;},DataManager[_0x5f0e('0x114')]=function(_0x81e45){const _0x49cbe4=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x113')][_0x5f0e('0xc9')];return _0x49cbe4['format'](_0x81e45);},VisuMZ['SaveCore'][_0x5f0e('0x26')]=DataManager['makeSavefileInfo'],DataManager[_0x5f0e('0xf6')]=function(){const _0x3ac7e3=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x26')]['call'](this);return VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x182')]['MakeSavefileInfoJS'][_0x5f0e('0x6e')](this,_0x3ac7e3);},ConfigManager[_0x5f0e('0xd8')]=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x10b')][_0x5f0e('0x124')],ConfigManager[_0x5f0e('0x170')]=[],ConfigManager[_0x5f0e('0x177')]=[],VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x18b')]=ConfigManager[_0x5f0e('0x12c')],ConfigManager[_0x5f0e('0x12c')]=function(){const _0x509c2f=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x18b')]['call'](this);return _0x509c2f[_0x5f0e('0xd8')]=this[_0x5f0e('0xd8')]||VisuMZ[_0x5f0e('0x8d')]['Settings'][_0x5f0e('0x10b')][_0x5f0e('0x124')],_0x509c2f[_0x5f0e('0x170')]=this[_0x5f0e('0x170')]||[],_0x509c2f[_0x5f0e('0x177')]=this['globalVariables']||[],_0x509c2f;},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xaa')]=ConfigManager['applyData'],ConfigManager['applyData']=function(_0x548cb6){VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xaa')][_0x5f0e('0x6e')](this,_0x548cb6),this[_0x5f0e('0xd8')]=_0x548cb6[_0x5f0e('0xd8')]!==undefined?_0x548cb6[_0x5f0e('0xd8')]:VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x10b')][_0x5f0e('0x124')],this[_0x5f0e('0x170')]=_0x548cb6['globalSwitches']||[],this[_0x5f0e('0x177')]=_0x548cb6['globalVariables']||[];},StorageManager['isLocalMode']=function(){if(Utils[_0x5f0e('0x3d')]()){if(_0x5f0e('0x1a')!==_0x5f0e('0x1a')){function _0x4c48d7(){this[_0x5f0e('0x14b')][_0x5f0e('0x11f')]();}}else return VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x113')][_0x5f0e('0x4d')];}else{if(_0x5f0e('0x153')!==_0x5f0e('0x153')){function _0x4b9131(){return _0x3831ee['SaveCore']['Settings']['SaveConfirm'][_0x5f0e('0x121')];}}else return![];}},StorageManager[_0x5f0e('0xb')]=function(_0x55a0ea){const _0x3c1c23=this[_0x5f0e('0x2')](),_0x422a10=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x113')][_0x5f0e('0xa0')];return _0x3c1c23+_0x422a10[_0x5f0e('0xa2')](_0x55a0ea);},StorageManager[_0x5f0e('0x93')]=function(_0x23adfe){const _0x324f23=$dataSystem['advanced'][_0x5f0e('0x18d')],_0x8ccf1f=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')]['Save']['KeyFmt'];return _0x8ccf1f[_0x5f0e('0xa2')](_0x324f23,_0x23adfe);},StorageManager[_0x5f0e('0x33')]=function(){return VisuMZ[_0x5f0e('0x8d')]['Settings'][_0x5f0e('0x113')][_0x5f0e('0x0')];},StorageManager[_0x5f0e('0x132')]=function(){return VisuMZ[_0x5f0e('0x8d')]['Settings'][_0x5f0e('0x113')][_0x5f0e('0x164')];},StorageManager[_0x5f0e('0x86')]=function(){if(this[_0x5f0e('0x132')]()===_0x5f0e('0x13c'))return _0x5f0e('0x64');else{if(_0x5f0e('0x11b')===_0x5f0e('0x80')){function _0x20e74c(){_0x5ea773[_0x5f0e('0x8d')][_0x5f0e('0x7')]['call'](this),this[_0x5f0e('0x1b')](),this[_0x5f0e('0xdb')]();}}else return VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0xd5')][_0x5f0e('0x27')];}},TextManager[_0x5f0e('0x68')]=VisuMZ['SaveCore'][_0x5f0e('0xfd')][_0x5f0e('0x113')]['VocabLockedSaveSlot'],TextManager[_0x5f0e('0x15')]=VisuMZ['SaveCore'][_0x5f0e('0xfd')]['SaveConfirm'][_0x5f0e('0xb1')],TextManager[_0x5f0e('0xd3')]=VisuMZ['SaveCore']['Settings']['SaveConfirm'][_0x5f0e('0xe6')],TextManager['loadFailure']=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x41')]['VocabLoadFailure'],TextManager[_0x5f0e('0x96')]=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x10b')]['Name'],TextManager[_0x5f0e('0xb8')]=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x72')][_0x5f0e('0x175')],TextManager[_0x5f0e('0xab')]=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')]['AutosaveConfirm'][_0x5f0e('0x34')],TextManager['latestSave']=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x182')][_0x5f0e('0x3e')],ColorManager[_0x5f0e('0x125')]=function(){const _0xdf48f7=_0x5f0e('0x127');this[_0x5f0e('0x157')]=this['_colorCache']||{};if(this[_0x5f0e('0x157')][_0xdf48f7])return this[_0x5f0e('0x157')][_0xdf48f7];const _0x13ca9b=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x182')][_0x5f0e('0xe')];return this[_0x5f0e('0xa5')](_0xdf48f7,_0x13ca9b);},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x22')]=Game_System[_0x5f0e('0x28')][_0x5f0e('0x29')],Game_System[_0x5f0e('0x28')][_0x5f0e('0x29')]=function(){VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x22')][_0x5f0e('0x6e')](this),this[_0x5f0e('0x123')]();},Game_System[_0x5f0e('0x28')][_0x5f0e('0x123')]=function(){this[_0x5f0e('0x17')]={'autosaveEnabled':VisuMZ[_0x5f0e('0x8d')]['Settings'][_0x5f0e('0xd5')][_0x5f0e('0x137')],'saveDescription':'','savePicture':''};},Game_System[_0x5f0e('0x28')][_0x5f0e('0xaf')]=function(){if(!$dataSystem['optAutosave'])return![];if(this['_SaveCoreSettings']===undefined)this[_0x5f0e('0x123')]();if(this['_SaveCoreSettings'][_0x5f0e('0x9d')]===undefined)this[_0x5f0e('0x123')]();return this[_0x5f0e('0x17')][_0x5f0e('0x9d')];},Game_System[_0x5f0e('0x28')][_0x5f0e('0x150')]=function(_0x43aae5){if(!$dataSystem[_0x5f0e('0x32')])return;if(this['_SaveCoreSettings']===undefined)this[_0x5f0e('0x123')]();if(this[_0x5f0e('0x17')][_0x5f0e('0x9d')]===undefined)this[_0x5f0e('0x123')]();this['_SaveCoreSettings'][_0x5f0e('0x9d')]=_0x43aae5;},Game_System['prototype']['getSaveDescription']=function(){if(!$dataSystem[_0x5f0e('0x32')])return![];if(this[_0x5f0e('0x17')]===undefined)this[_0x5f0e('0x123')]();if(this['_SaveCoreSettings']['saveDescription']===undefined)this[_0x5f0e('0x123')]();return this[_0x5f0e('0x17')][_0x5f0e('0xf0')];},Game_System[_0x5f0e('0x28')][_0x5f0e('0x9e')]=function(_0x34de53){if(!$dataSystem[_0x5f0e('0x32')])return![];if(this[_0x5f0e('0x17')]===undefined)this['initSaveCore']();if(this[_0x5f0e('0x17')][_0x5f0e('0xf0')]===undefined)this[_0x5f0e('0x123')]();this[_0x5f0e('0x17')][_0x5f0e('0xf0')]=_0x34de53;},Game_System['prototype'][_0x5f0e('0x181')]=function(){if(!$dataSystem['optAutosave'])return![];if(this['_SaveCoreSettings']===undefined)this[_0x5f0e('0x123')]();if(this[_0x5f0e('0x17')][_0x5f0e('0x73')]===undefined)this[_0x5f0e('0x123')]();return this[_0x5f0e('0x17')]['savePicture'];},Game_System[_0x5f0e('0x28')][_0x5f0e('0x139')]=function(_0x14a169){if(!$dataSystem[_0x5f0e('0x32')])return![];if(this[_0x5f0e('0x17')]===undefined)this[_0x5f0e('0x123')]();if(this[_0x5f0e('0x17')][_0x5f0e('0x73')]===undefined)this[_0x5f0e('0x123')]();this[_0x5f0e('0x17')][_0x5f0e('0x73')]=_0x14a169;},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x5')]=Game_System[_0x5f0e('0x28')][_0x5f0e('0xcf')],Game_System['prototype'][_0x5f0e('0xcf')]=function(){const _0x4bb978=StorageManager[_0x5f0e('0x132')]();switch(_0x4bb978){case'locked':return VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x5')][_0x5f0e('0x6e')](this)||0x1;break;case'single':return 0x0;break;default:return VisuMZ[_0x5f0e('0x8d')]['Game_System_savefileId'][_0x5f0e('0x6e')](this);break;}},Game_Switches['prototype']['isGlobal']=function(_0x1bfa40){return $dataSystem[_0x5f0e('0x186')][_0x1bfa40]&&VisuMZ['GlobalSwitches'][_0x5f0e('0x37')](_0x1bfa40);},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x155')]=Game_Switches[_0x5f0e('0x28')][_0x5f0e('0xd2')],Game_Switches['prototype'][_0x5f0e('0xd2')]=function(_0x5033ec){if(this[_0x5f0e('0x74')](_0x5033ec)){if(_0x5f0e('0x90')!==_0x5f0e('0x11a'))return this[_0x5f0e('0x9f')](_0x5033ec);else{function _0x5df315(){_0x4584cc[_0x5f0e('0x28')][_0x5f0e('0x9c')]['call'](this,_0x5dceeb),this[_0x5f0e('0x188')]['activate']();}}}else return VisuMZ[_0x5f0e('0x8d')]['Game_Switches_value'][_0x5f0e('0x6e')](this,_0x5033ec);},Game_Switches[_0x5f0e('0x28')][_0x5f0e('0x9f')]=function(_0x3bf1c5){return ConfigManager[_0x5f0e('0x170')]=ConfigManager['globalSwitches']||[],!!ConfigManager[_0x5f0e('0x170')][_0x3bf1c5];},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x8')]=Game_Switches[_0x5f0e('0x28')][_0x5f0e('0xea')],Game_Switches[_0x5f0e('0x28')][_0x5f0e('0xea')]=function(_0x309088,_0x5781cd){if(this[_0x5f0e('0x74')](_0x309088))this[_0x5f0e('0x178')](_0x309088,_0x5781cd);VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x8')][_0x5f0e('0x6e')](this,_0x309088,_0x5781cd);},Game_Switches[_0x5f0e('0x28')][_0x5f0e('0x178')]=function(_0x1acc02,_0x348115){_0x1acc02>0x0&&_0x1acc02<$dataSystem[_0x5f0e('0x186')][_0x5f0e('0x160')]&&(ConfigManager[_0x5f0e('0x170')]=ConfigManager['globalSwitches']||[],ConfigManager[_0x5f0e('0x170')][_0x1acc02]=_0x348115,ConfigManager['save']());},Game_Variables[_0x5f0e('0x28')][_0x5f0e('0x74')]=function(_0x418e59){return $dataSystem[_0x5f0e('0x48')][_0x418e59]&&VisuMZ[_0x5f0e('0x13f')][_0x5f0e('0x37')](_0x418e59);},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x154')]=Game_Variables[_0x5f0e('0x28')][_0x5f0e('0xd2')],Game_Variables[_0x5f0e('0x28')][_0x5f0e('0xd2')]=function(_0x16d277){return this[_0x5f0e('0x74')](_0x16d277)?this[_0x5f0e('0x9f')](_0x16d277):VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x154')][_0x5f0e('0x6e')](this,_0x16d277);},Game_Variables[_0x5f0e('0x28')][_0x5f0e('0x9f')]=function(_0x1b9ddc){ConfigManager[_0x5f0e('0x177')]=ConfigManager[_0x5f0e('0x177')]||[];if(ConfigManager[_0x5f0e('0x177')][_0x1b9ddc]===undefined){if(_0x5f0e('0xeb')===_0x5f0e('0x198')){function _0x552c15(){_0x3ef67b[_0x5f0e('0x8d')][_0x5f0e('0x151')][_0x5f0e('0x6e')](this);}}else ConfigManager[_0x5f0e('0x177')][_0x1b9ddc]=0x0;}return ConfigManager[_0x5f0e('0x177')][_0x1b9ddc];},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x180')]=Game_Variables[_0x5f0e('0x28')][_0x5f0e('0xea')],Game_Variables[_0x5f0e('0x28')][_0x5f0e('0xea')]=function(_0x27d0e1,_0x569d1f){if(this[_0x5f0e('0x74')](_0x27d0e1))this[_0x5f0e('0x178')](_0x27d0e1,_0x569d1f);VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x180')][_0x5f0e('0x6e')](this,_0x27d0e1,_0x569d1f);},Game_Variables[_0x5f0e('0x28')]['setGlobalValue']=function(_0x47f32a,_0xd88e9b){if(_0x47f32a>0x0&&_0x47f32a<$dataSystem['variables'][_0x5f0e('0x160')]){ConfigManager[_0x5f0e('0x177')]=ConfigManager[_0x5f0e('0x177')]||[];if(typeof _0xd88e9b===_0x5f0e('0x193'))_0xd88e9b=Math[_0x5f0e('0x10a')](_0xd88e9b);ConfigManager[_0x5f0e('0x177')][_0x47f32a]=_0xd88e9b,ConfigManager[_0x5f0e('0x149')]();}},Game_Party[_0x5f0e('0x28')][_0x5f0e('0x2b')]=function(){return this[_0x5f0e('0xe1')]()[_0x5f0e('0x115')](_0x308594=>_0x308594[_0x5f0e('0x5a')]());},Scene_Base[_0x5f0e('0x28')]['determineAutosaveBypass']=function(_0x26e63c){const _0x1f02ea=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')]['Autosave'];switch(_0x26e63c){case _0x5f0e('0x136'):this[_0x5f0e('0x4a')]=!_0x1f02ea[_0x5f0e('0x1')];break;case _0x5f0e('0x126'):if(!this[_0x5f0e('0x17b')]())return;this[_0x5f0e('0x4a')]=!_0x1f02ea[_0x5f0e('0x11d')];break;case _0x5f0e('0x196'):this['_bypassAutosave']=!_0x1f02ea[_0x5f0e('0x99')];break;case'exitMenu':this[_0x5f0e('0x4a')]=!_0x1f02ea['AfterExitMenu'];break;}},VisuMZ['SaveCore'][_0x5f0e('0xac')]=Scene_Base[_0x5f0e('0x28')][_0x5f0e('0x19e')],Scene_Base[_0x5f0e('0x28')][_0x5f0e('0x19e')]=function(){!this[_0x5f0e('0x4a')]&&VisuMZ[_0x5f0e('0x8d')]['Scene_Base_requestAutosave'][_0x5f0e('0x6e')](this),this['_bypassAutosave']=![];},Scene_Base[_0x5f0e('0x28')][_0x5f0e('0xaf')]=function(){return!DataManager[_0x5f0e('0x84')]()&&!DataManager[_0x5f0e('0x75')]()&&$gameSystem[_0x5f0e('0xaf')]()&&(VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0xd5')]['RequestsRequireSaveEnable']?$gameSystem[_0x5f0e('0x1a1')]():!![]);},Scene_Base[_0x5f0e('0x28')][_0x5f0e('0xb0')]=function(){if(!ConfigManager[_0x5f0e('0xd8')])return;this[_0x5f0e('0x128')]();},Scene_Base['prototype'][_0x5f0e('0x128')]=function(){$gameSystem[_0x5f0e('0x19a')](),this[_0x5f0e('0x58')]=![];const _0x17d5f4=StorageManager[_0x5f0e('0x86')]();[_0x5f0e('0x64'),_0x5f0e('0x13e')][_0x5f0e('0x37')](_0x17d5f4)&&DataManager['saveGame'](0x0)[_0x5f0e('0x12d')](()=>this['onAutosaveSuccess']())[_0x5f0e('0xe4')](()=>this['onAutosaveFailure']());if([_0x5f0e('0x16d'),_0x5f0e('0x13e')][_0x5f0e('0x37')](_0x17d5f4)){const _0x481d7a=$gameSystem[_0x5f0e('0xcf')]();_0x481d7a>0x0&&DataManager[_0x5f0e('0x17c')](_0x481d7a)[_0x5f0e('0x12d')](()=>this[_0x5f0e('0x134')]())['catch'](()=>this[_0x5f0e('0x195')]());}this[_0x5f0e('0x58')]=![];},VisuMZ['SaveCore'][_0x5f0e('0x4e')]=Scene_Base[_0x5f0e('0x28')][_0x5f0e('0x134')],Scene_Base[_0x5f0e('0x28')][_0x5f0e('0x134')]=function(){if(this['_processingAutosave'])return;VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x4e')][_0x5f0e('0x6e')](this),VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0xd5')][_0x5f0e('0x14a')][_0x5f0e('0x6e')](this),this[_0x5f0e('0x7a')](!![]),this[_0x5f0e('0x58')]=!![];},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x184')]=Scene_Base[_0x5f0e('0x28')][_0x5f0e('0x195')],Scene_Base[_0x5f0e('0x28')][_0x5f0e('0x195')]=function(){if(this[_0x5f0e('0x58')])return;VisuMZ['SaveCore']['Scene_Base_onAutosaveFailure']['call'](this),VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0xd5')][_0x5f0e('0xed')][_0x5f0e('0x6e')](this),this[_0x5f0e('0x7a')](![]);},Scene_Base['prototype'][_0x5f0e('0x158')]=function(){if(this[_0x5f0e('0xb4')])return;const _0xffabf5=this[_0x5f0e('0x130')]();this[_0x5f0e('0xb4')]=new Window_Base(_0xffabf5),this[_0x5f0e('0xb4')]['openness']=0x0;},Scene_Base[_0x5f0e('0x28')][_0x5f0e('0x130')]=function(){return VisuMZ['SaveCore'][_0x5f0e('0xfd')][_0x5f0e('0x41')][_0x5f0e('0x106')][_0x5f0e('0x6e')](this);},Scene_Base[_0x5f0e('0x28')][_0x5f0e('0x17d')]=function(){return VisuMZ[_0x5f0e('0x8d')]['Settings'][_0x5f0e('0x41')][_0x5f0e('0x121')];},Scene_Base[_0x5f0e('0x28')][_0x5f0e('0xf3')]=function(_0x3e2f8f,_0x572586){if(!this[_0x5f0e('0x17d')]())return this['closeSaveConfirmationWindow'](_0x3e2f8f);if(!this[_0x5f0e('0xb4')])this[_0x5f0e('0x158')]();const _0x212f69=this[_0x5f0e('0xb4')];this[_0x5f0e('0x62')](_0x212f69),this[_0x5f0e('0x16f')](_0x212f69),_0x212f69[_0x5f0e('0x18c')](),_0x212f69[_0x5f0e('0x79')](),_0x212f69[_0x5f0e('0xc1')][_0x5f0e('0x109')]();let _0x4e675e='';if(_0x572586){if(_0x5f0e('0xe9')!==_0x5f0e('0xe9')){function _0x1e4f6f(){return this['isGlobal'](_0x3e447f)?this[_0x5f0e('0x9f')](_0x190319):_0x3c97e8[_0x5f0e('0x8d')][_0x5f0e('0x155')][_0x5f0e('0x6e')](this,_0x3b698c);}}else _0x4e675e=TextManager[_0x5f0e('0x7e')];}else _0x4e675e=_0x3e2f8f?TextManager[_0x5f0e('0x15')]:TextManager[_0x5f0e('0xd3')];const _0x9d5f95=_0x212f69['textSizeEx'](_0x4e675e)['width'],_0x5807bc=(_0x212f69[_0x5f0e('0x167')]-_0x9d5f95)/0x2;_0x212f69[_0x5f0e('0x14d')](_0x4e675e,_0x5807bc,0x0,_0x9d5f95);const _0x1005b9=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x41')][_0x5f0e('0x166')];setTimeout(this[_0x5f0e('0x9c')][_0x5f0e('0x156')](this,_0x3e2f8f),_0x1005b9);},Scene_Base[_0x5f0e('0x28')][_0x5f0e('0x16')]=function(){this['openSaveConfirmationWindow'](![],!![]);},Scene_Base[_0x5f0e('0x28')][_0x5f0e('0x9c')]=function(_0x24b51f){this[_0x5f0e('0xb4')][_0x5f0e('0x47')]();},Scene_Base[_0x5f0e('0x28')][_0x5f0e('0x3a')]=function(){if(this[_0x5f0e('0x14b')])return;const _0x24fe4f=this[_0x5f0e('0x11c')]();this[_0x5f0e('0x14b')]=new Window_AutosaveConfirm(_0x24fe4f);},Scene_Base['prototype']['autosaveConfirmationWindowRect']=function(){const _0x9d1b6a=this[_0x5f0e('0x53')](),_0x3cf5db=this[_0x5f0e('0x18a')](0x1,![]),_0x27184e=Graphics['width']-_0x9d1b6a,_0x3adb71=Graphics[_0x5f0e('0x88')]-_0x3cf5db;return new Rectangle(_0x27184e,_0x3adb71,_0x9d1b6a,_0x3cf5db);},Scene_Base[_0x5f0e('0x28')][_0x5f0e('0x67')]=function(){return VisuMZ[_0x5f0e('0x8d')]['Settings'][_0x5f0e('0x72')][_0x5f0e('0x121')];},Scene_Base[_0x5f0e('0x28')][_0x5f0e('0x7a')]=function(_0x53ffd0){if(!this['isAutosaveConfirmWindowEnabled']())return this[_0x5f0e('0x174')](_0x53ffd0);if(!this['_autosaveConfirmWindow'])this['createAutosaveConfirmationWindow']();const _0x20f737=this[_0x5f0e('0x14b')];this[_0x5f0e('0x62')](_0x20f737),this[_0x5f0e('0x16f')](_0x20f737),_0x20f737[_0x5f0e('0xf1')](_0x53ffd0),_0x20f737['fadeIn']();const _0x40ed3b=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x41')][_0x5f0e('0x166')];setTimeout(this['closeAutosaveConfirmationWindow'][_0x5f0e('0x156')](this,_0x53ffd0),_0x40ed3b);},Scene_Base['prototype'][_0x5f0e('0x174')]=function(_0x4dad0b){this[_0x5f0e('0x14b')][_0x5f0e('0x11f')]();},Scene_Base[_0x5f0e('0x28')][_0x5f0e('0x147')]=function(){},VisuMZ['SaveCore'][_0x5f0e('0x2d')]=Scene_Title[_0x5f0e('0x28')][_0x5f0e('0x29')],Scene_Title['prototype'][_0x5f0e('0x29')]=function(){VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x2d')][_0x5f0e('0x6e')](this),this[_0x5f0e('0x49')]=![];},VisuMZ['SaveCore']['Scene_Title_terminate']=Scene_Title['prototype']['terminate'],Scene_Title[_0x5f0e('0x28')][_0x5f0e('0x16c')]=function(){VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x9a')]['call'](this);if(this[_0x5f0e('0x49')])$gameSystem[_0x5f0e('0x3b')]();},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x50')]=Scene_Title['prototype'][_0x5f0e('0xdd')],Scene_Title[_0x5f0e('0x28')][_0x5f0e('0xdd')]=function(){StorageManager[_0x5f0e('0x132')]()===_0x5f0e('0x15b')?this[_0x5f0e('0x13b')]():VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x50')][_0x5f0e('0x6e')](this);},Scene_Title[_0x5f0e('0x28')]['commandNewGameSaveCoreLocked']=function(){DataManager[_0x5f0e('0x15a')](),$gameTemp[_0x5f0e('0x5d')]=!![],this['_commandWindow'][_0x5f0e('0x47')](),SceneManager['push'](Scene_Save);},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x151')]=Scene_Title[_0x5f0e('0x28')]['commandContinue'],Scene_Title[_0x5f0e('0x28')][_0x5f0e('0x31')]=function(){if(StorageManager[_0x5f0e('0x132')]()===_0x5f0e('0x13c'))this['commandContinueSaveCoreSingle']();else{if(_0x5f0e('0x1e')!=='ohrRD')VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x151')]['call'](this);else{function _0x3a9d91(){if(_0x2a7531[_0x5f0e('0x186')][_0x33fe8a][_0x5f0e('0x152')](/<GLOBAL>/i))_0x2d6eee[_0x5f0e('0x10c')][_0x5f0e('0x187')](_0xff67a8);}}}},Scene_Title[_0x5f0e('0x28')][_0x5f0e('0x138')]=function(){DataManager[_0x5f0e('0xa6')](0x0)[_0x5f0e('0x12d')](()=>this['onSaveCoreLoadSuccess']())['catch'](()=>this['onSaveCoreLoadFailure']());},Scene_Title[_0x5f0e('0x28')][_0x5f0e('0x19c')]=function(){this[_0x5f0e('0x188')][_0x5f0e('0x47')](),SoundManager[_0x5f0e('0xb6')](),this[_0x5f0e('0x56')](),Scene_Load[_0x5f0e('0x28')][_0x5f0e('0xde')](),SceneManager[_0x5f0e('0x94')](Scene_Map),this[_0x5f0e('0x49')]=!![],VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x113')][_0x5f0e('0xad')][_0x5f0e('0x6e')](this);},Scene_Title[_0x5f0e('0x28')][_0x5f0e('0x3c')]=function(){SoundManager[_0x5f0e('0xfa')](),VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x113')][_0x5f0e('0x38')][_0x5f0e('0x6e')](this),this[_0x5f0e('0x16')]();},Scene_Title[_0x5f0e('0x28')][_0x5f0e('0x9c')]=function(_0x582bd0){Scene_Base[_0x5f0e('0x28')][_0x5f0e('0x9c')]['call'](this,_0x582bd0),this[_0x5f0e('0x188')]['open'](),this[_0x5f0e('0x188')]['activate']();},VisuMZ[_0x5f0e('0x8d')]['Scene_Map_onMapLoaded']=Scene_Map[_0x5f0e('0x28')][_0x5f0e('0x101')],Scene_Map[_0x5f0e('0x28')][_0x5f0e('0x101')]=function(){VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xdf')][_0x5f0e('0x6e')](this);if(SceneManager[_0x5f0e('0x172')](Scene_Menu)){if(_0x5f0e('0x14')!==_0x5f0e('0x143'))this['determineAutosaveBypass']('exitMenu'),this['requestAutosave']();else{function _0x15961c(){_0x1e4ab3=_0x9dfa3a[_0x5f0e('0x7e')];}}}else{if(SceneManager[_0x5f0e('0x172')](Scene_Battle)){if(_0x5f0e('0x1a3')==='aQmcX')this[_0x5f0e('0x71')](_0x5f0e('0x136')),this[_0x5f0e('0x19e')]();else{function _0x174862(){this['_success']=_0x3062fa,this[_0x5f0e('0x6a')]();}}}}},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x117')]=Scene_Map[_0x5f0e('0x28')][_0x5f0e('0xb3')],Scene_Map[_0x5f0e('0x28')]['onTransferEnd']=function(){if(this[_0x5f0e('0x17b')]()){if('ftkmc'===_0x5f0e('0x54'))this[_0x5f0e('0x71')]('transfer');else{function _0x1f9fec(){_0x360882[_0x5f0e('0x18f')](),_0x47a041['SaveCore'][_0x5f0e('0xfd')][_0x5f0e('0x113')][_0x5f0e('0xdc')][_0x5f0e('0x6e')](this),this[_0x5f0e('0xf3')](!![]);}}}VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x117')][_0x5f0e('0x6e')](this);},Scene_Map[_0x5f0e('0x28')][_0x5f0e('0x147')]=function(){const _0x1612ca=$gameSystem[_0x5f0e('0xcf')]();console[_0x5f0e('0xc6')](_0x1612ca);if(StorageManager[_0x5f0e('0x132')]()!=='single'&&_0x1612ca<=0x0)return;this[_0x5f0e('0x10f')]=![],DataManager[_0x5f0e('0x17c')](_0x1612ca)[_0x5f0e('0x12d')](()=>this[_0x5f0e('0x10')]())[_0x5f0e('0xe4')](()=>this[_0x5f0e('0x43')]());},Scene_Map[_0x5f0e('0x28')]['onSaveSuccess']=function(){SoundManager[_0x5f0e('0x18f')](),VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x113')][_0x5f0e('0xdc')][_0x5f0e('0x6e')](this),this['openSaveConfirmationWindow'](!![]);},Scene_Map[_0x5f0e('0x28')][_0x5f0e('0x43')]=function(){SoundManager[_0x5f0e('0xfa')](),VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x113')][_0x5f0e('0x161')][_0x5f0e('0x6e')](this),this[_0x5f0e('0xf3')](![]);},Scene_Map[_0x5f0e('0x28')]['closeSaveConfirmationWindow']=function(_0x10bf5){Scene_Message[_0x5f0e('0x28')][_0x5f0e('0x9c')][_0x5f0e('0x6e')](this,_0x10bf5),this[_0x5f0e('0x10f')]=!![];},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x7f')]=Scene_Menu[_0x5f0e('0x28')]['create'],Scene_Menu[_0x5f0e('0x28')]['create']=function(){VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x7f')][_0x5f0e('0x6e')](this);if(SceneManager[_0x5f0e('0x172')](Scene_Map)){if(_0x5f0e('0x11')!==_0x5f0e('0x11')){function _0x4f8f17(){_0x182e6c[_0x5f0e('0x39')](_0x137bf5,_0x43b8ea);if(_0x5d4588)_0x1dceb2['setSavePicture'](_0x460a66[_0x5f0e('0x57')]);}}else this[_0x5f0e('0x71')](_0x5f0e('0x196')),this[_0x5f0e('0x19e')]();}},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x162')]=Scene_Menu['prototype'][_0x5f0e('0xbd')],Scene_Menu[_0x5f0e('0x28')]['commandSave']=function(){const _0x559756=StorageManager[_0x5f0e('0x132')]();switch(_0x559756){case _0x5f0e('0x15b'):case'single':this[_0x5f0e('0xa3')]();break;default:VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x162')][_0x5f0e('0x6e')](this);break;}},Scene_Menu['prototype'][_0x5f0e('0xa3')]=function(){const _0x4f2cfd=$gameSystem[_0x5f0e('0xcf')]();DataManager[_0x5f0e('0x17c')](_0x4f2cfd)[_0x5f0e('0x12d')](()=>this[_0x5f0e('0x108')]())['catch'](()=>this[_0x5f0e('0xc7')]());},Scene_Menu[_0x5f0e('0x28')][_0x5f0e('0x108')]=function(){SoundManager[_0x5f0e('0x18f')](),VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x113')][_0x5f0e('0xdc')][_0x5f0e('0x6e')](this),this[_0x5f0e('0xf3')](!![]);},Scene_Menu[_0x5f0e('0x28')]['onSaveCoreSaveFailure']=function(){SoundManager[_0x5f0e('0xfa')](),VisuMZ[_0x5f0e('0x8d')]['Settings'][_0x5f0e('0x113')][_0x5f0e('0x161')][_0x5f0e('0x6e')](this),this[_0x5f0e('0xf3')](![]);},Scene_Menu[_0x5f0e('0x28')][_0x5f0e('0x9c')]=function(_0x559b48){Scene_MenuBase[_0x5f0e('0x28')][_0x5f0e('0x9c')][_0x5f0e('0x6e')](this,_0x559b48),this[_0x5f0e('0x188')]['activate']();},Scene_Battle['prototype'][_0x5f0e('0x19e')]=function(){},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x51')]=Scene_Options['prototype'][_0x5f0e('0x111')],Scene_Options['prototype'][_0x5f0e('0x111')]=function(){let _0x3a2a47=VisuMZ['SaveCore']['Scene_Options_maxCommands'][_0x5f0e('0x6e')](this);const _0x10b7ea=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')];if(_0x10b7ea[_0x5f0e('0x10b')][_0x5f0e('0xbe')]&&_0x10b7ea[_0x5f0e('0x10b')][_0x5f0e('0xf7')])_0x3a2a47++;return _0x3a2a47;},Scene_Save[_0x5f0e('0x28')][_0x5f0e('0x10')]=function(){SoundManager['playSave'](),VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x113')][_0x5f0e('0xdc')][_0x5f0e('0x6e')](this),this[_0x5f0e('0x66')][_0x5f0e('0x6a')](),this[_0x5f0e('0xf3')](!![]);},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x19b')]=Scene_Save[_0x5f0e('0x28')]['onSaveFailure'],Scene_Save[_0x5f0e('0x28')]['onSaveFailure']=function(){SoundManager[_0x5f0e('0xfa')](),VisuMZ['SaveCore'][_0x5f0e('0xfd')][_0x5f0e('0x113')][_0x5f0e('0x161')][_0x5f0e('0x6e')](this),this[_0x5f0e('0xf3')](![]);},Scene_Save['prototype'][_0x5f0e('0x9c')]=function(_0x2b9979){Scene_File[_0x5f0e('0x28')][_0x5f0e('0x9c')][_0x5f0e('0x6e')](this,_0x2b9979);if(_0x2b9979){if(_0x5f0e('0x5b')===_0x5f0e('0x17e')){function _0x35fe3d(){_0x3fb50d=_0x32f67c||'left';const _0x1e8a11=this[_0x5f0e('0x120')](_0x256afc);this[_0x5f0e('0xe5')](_0x1e8a11,_0x55d5a1,_0x220dd4,_0x2d51c7,_0x42c714);}}else this[_0x5f0e('0x135')]();}else this[_0x5f0e('0x135')]();},Scene_Save[_0x5f0e('0x28')][_0x5f0e('0x82')]=function(){$gameTemp[_0x5f0e('0x5d')]=![],Scene_File[_0x5f0e('0x28')][_0x5f0e('0x82')][_0x5f0e('0x6e')](this);},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x129')]=Scene_Save[_0x5f0e('0x28')][_0x5f0e('0x133')],Scene_Save[_0x5f0e('0x28')][_0x5f0e('0x133')]=function(){return $gameTemp[_0x5f0e('0x5d')]?TextManager[_0x5f0e('0x68')]:VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x129')][_0x5f0e('0x6e')](this);},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x194')]=Scene_Save[_0x5f0e('0x28')]['executeSave'],Scene_Save[_0x5f0e('0x28')][_0x5f0e('0x4c')]=function(_0x55da4c){if($gameTemp[_0x5f0e('0x5d')]){if('VUJud'==='VUJud')this[_0x5f0e('0xb7')](_0x55da4c);else{function _0x3a84cb(){this['_commandWindow'][_0x5f0e('0x47')](),_0xa3644b[_0x5f0e('0xb6')](),this[_0x5f0e('0x56')](),_0x1a500a[_0x5f0e('0x28')][_0x5f0e('0xde')](),_0x39e93f[_0x5f0e('0x94')](_0x38fc86),this[_0x5f0e('0x49')]=!![],_0x57f1e5['SaveCore'][_0x5f0e('0xfd')][_0x5f0e('0x113')][_0x5f0e('0xad')][_0x5f0e('0x6e')](this);}}}else VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x194')][_0x5f0e('0x6e')](this,_0x55da4c);},Scene_Save[_0x5f0e('0x28')][_0x5f0e('0xb7')]=function(_0x8088fb){$gameTemp[_0x5f0e('0x5d')]=![],SoundManager[_0x5f0e('0xb6')](),$gameSystem[_0x5f0e('0x4b')](_0x8088fb),this[_0x5f0e('0x56')](),SceneManager[_0x5f0e('0x94')](Scene_Map);},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x4f')]=Scene_Load[_0x5f0e('0x28')][_0x5f0e('0x103')],Scene_Load[_0x5f0e('0x28')][_0x5f0e('0x103')]=function(){VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x4f')][_0x5f0e('0x6e')](this),VisuMZ['SaveCore'][_0x5f0e('0xfd')][_0x5f0e('0x113')][_0x5f0e('0xad')][_0x5f0e('0x6e')](this);},Scene_Load[_0x5f0e('0x28')][_0x5f0e('0xfe')]=function(){SoundManager['playBuzzer'](),VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x113')][_0x5f0e('0x38')][_0x5f0e('0x6e')](this),this[_0x5f0e('0x16')]();},Scene_Load['prototype'][_0x5f0e('0x9c')]=function(_0x25ba90){Scene_File[_0x5f0e('0x28')][_0x5f0e('0x9c')][_0x5f0e('0x6e')](this,_0x25ba90),this['activateListWindow']();},ImageManager[_0x5f0e('0x185')]=0x9,ImageManager[_0x5f0e('0x3')]=0x6,Window_Base[_0x5f0e('0x28')][_0x5f0e('0x60')]=function(_0x562e9c,_0x2eb9e9,_0x52c8fd){const _0x18d247=ImageManager[_0x5f0e('0x92')](_0x562e9c),_0x3bdbb3=_0x18d247[_0x5f0e('0x87')]/ImageManager[_0x5f0e('0x185')],_0x58421a=_0x18d247[_0x5f0e('0x88')]/ImageManager[_0x5f0e('0x3')],_0x324241=0x0,_0xb2d2ec=0x0;this[_0x5f0e('0xc1')][_0x5f0e('0x165')](_0x18d247,_0x324241,_0xb2d2ec,_0x3bdbb3,_0x58421a,_0x2eb9e9-_0x3bdbb3/0x2,_0x52c8fd-_0x58421a);},VisuMZ['SaveCore'][_0x5f0e('0x20')]=Window_Options[_0x5f0e('0x28')][_0x5f0e('0x199')],Window_Options['prototype'][_0x5f0e('0x199')]=function(){VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x20')]['call'](this),this[_0x5f0e('0xf4')]();},Window_Options[_0x5f0e('0x28')]['addSaveCoreCommands']=function(){VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x10b')][_0x5f0e('0xbe')]&&this[_0x5f0e('0xec')]();},Window_Options[_0x5f0e('0x28')]['addSaveCoreAutosaveCommand']=function(){const _0x546a18=TextManager[_0x5f0e('0x96')],_0x49cce6=_0x5f0e('0xd8');this[_0x5f0e('0x116')](_0x546a18,_0x49cce6);};function Window_AutosaveConfirm(){this[_0x5f0e('0x29')](...arguments);}Window_AutosaveConfirm[_0x5f0e('0x28')]=Object[_0x5f0e('0x12a')](Window_Base['prototype']),Window_AutosaveConfirm[_0x5f0e('0x28')][_0x5f0e('0x19')]=Window_AutosaveConfirm,Window_AutosaveConfirm[_0x5f0e('0x28')]['initialize']=function(_0x84fcbe){this[_0x5f0e('0x171')]=0x0,Window_Base['prototype'][_0x5f0e('0x29')][_0x5f0e('0x6e')](this,_0x84fcbe),this[_0x5f0e('0x17f')]=0x0,this[_0x5f0e('0x19f')]=0x0;},Window_AutosaveConfirm[_0x5f0e('0x28')][_0x5f0e('0x9b')]=function(){const _0x9fdba0=0x0,_0x32005d=0x0,_0x5930cf=this[_0x5f0e('0x167')],_0x56821d=this[_0x5f0e('0xc8')],_0x124879=ColorManager[_0x5f0e('0xb9')](),_0x17c53e=ColorManager[_0x5f0e('0x2a')](),_0x14d931=_0x5930cf/0x2;this[_0x5f0e('0xc1')]['gradientFillRect'](_0x9fdba0,_0x32005d,_0x14d931,_0x56821d,_0x17c53e,_0x124879),this[_0x5f0e('0xc1')][_0x5f0e('0x42')](_0x9fdba0+_0x14d931,_0x32005d,_0x14d931,_0x56821d,_0x124879,_0x17c53e);},Window_AutosaveConfirm[_0x5f0e('0x28')][_0x5f0e('0xf1')]=function(_0xa1b108){this[_0x5f0e('0xd1')]=_0xa1b108,this[_0x5f0e('0x6a')]();},Window_AutosaveConfirm[_0x5f0e('0x28')][_0x5f0e('0x6a')]=function(){this[_0x5f0e('0xc1')][_0x5f0e('0x109')]();const _0x4ab32e=this['_success']?TextManager[_0x5f0e('0xb8')]:TextManager[_0x5f0e('0xab')],_0x3763a0=this[_0x5f0e('0x8a')](_0x4ab32e)[_0x5f0e('0x87')];this[_0x5f0e('0x87')]=_0x3763a0+($gameSystem[_0x5f0e('0x163')]()+this['itemPadding']())*0x2,this['updatePosition'](),this[_0x5f0e('0xf2')]();const _0x311f7b=(this[_0x5f0e('0x167')]-_0x3763a0)/0x2;this[_0x5f0e('0x9b')](),this[_0x5f0e('0x14d')](_0x4ab32e,_0x311f7b,0x0,_0x3763a0);},Window_AutosaveConfirm[_0x5f0e('0x28')][_0x5f0e('0x2f')]=function(){return VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')]['AutosaveConfirm'][_0x5f0e('0x10d')];},Window_AutosaveConfirm[_0x5f0e('0x28')]['updatePosition']=function(){const _0x256bb8=this['getScreenPosition']();if(_0x256bb8[_0x5f0e('0x152')](/upper/i))this['y']=-0x1*$gameSystem['windowPadding']();else _0x256bb8[_0x5f0e('0x152')](/lower/i)?this['y']=Graphics[_0x5f0e('0x88')]-this[_0x5f0e('0x88')]+$gameSystem[_0x5f0e('0x163')]():this['y']=(Graphics[_0x5f0e('0x88')]-this[_0x5f0e('0x88')])/0x2;if(_0x256bb8['match'](/left/i))this['x']=-0x1*$gameSystem[_0x5f0e('0x163')]();else{if(_0x256bb8['match'](/right/i)){if('DHZOv'===_0x5f0e('0x1a0')){function _0x9ce1be(){const _0x2b679a=_0x2d5fa2[_0x5f0e('0xd9')],_0x13dabc=new _0x9ea3db(_0x2b679a);let _0x5df479='[Year].[Month].[Date]\x20[Hour]:[Minute]:[Second]';_0x5df479=_0x5df479['replace'](/\[YEAR\]/gi,'%1'),_0x5df479=_0x5df479[_0x5f0e('0xa7')](/\[MONTH\]/gi,'%2'),_0x5df479=_0x5df479['replace'](/\[DATE\]/gi,'%3'),_0x5df479=_0x5df479[_0x5f0e('0xa7')](/\[HOUR\]/gi,'%4'),_0x5df479=_0x5df479[_0x5f0e('0xa7')](/\[MINUTE\]/gi,'%5'),_0x5df479=_0x5df479[_0x5f0e('0xa7')](/\[SECOND\]/gi,'%6');let _0x2c8b04=_0x2d0ad5(_0x13dabc[_0x5f0e('0x19d')]())[_0x5f0e('0x17a')]('')[_0x5f0e('0x40')]('​');return _0x5df479[_0x5f0e('0xa2')](_0x2c8b04['padStart'](0x4,'0'),_0x2bb5ff(_0x13dabc['getMonth']())[_0x5f0e('0x65')](0x2,'0'),_0x2973cd(_0x13dabc['getDate']())[_0x5f0e('0x65')](0x2,'0'),_0x41d954(_0x13dabc['getHours']())[_0x5f0e('0x65')](0x2,'0'),_0x5f5aa6(_0x13dabc[_0x5f0e('0xe7')]())['padStart'](0x2,'0'),_0x8cc5a2(_0x13dabc[_0x5f0e('0x197')]())[_0x5f0e('0x65')](0x2,'0'));}}else this['x']=Graphics[_0x5f0e('0x87')]-this[_0x5f0e('0x87')]+$gameSystem['windowPadding']();}else this['x']=(Graphics[_0x5f0e('0x87')]-this[_0x5f0e('0x87')])/0x2;}},Window_AutosaveConfirm[_0x5f0e('0x28')][_0x5f0e('0x12f')]=function(){Window_Base[_0x5f0e('0x28')][_0x5f0e('0x12f')][_0x5f0e('0x6e')](this);if(this[_0x5f0e('0x171')]!==0x0)this[_0x5f0e('0x190')]();},Window_AutosaveConfirm[_0x5f0e('0x28')]['updateFade']=function(){this[_0x5f0e('0x19f')]+=this[_0x5f0e('0x171')];if(this[_0x5f0e('0x19f')]>=0xff||this[_0x5f0e('0x19f')]<=0x0)this[_0x5f0e('0xc5')](0x0);},Window_AutosaveConfirm[_0x5f0e('0x28')][_0x5f0e('0xc5')]=function(_0x491848){this[_0x5f0e('0x171')]=_0x491848;},Window_AutosaveConfirm[_0x5f0e('0x28')][_0x5f0e('0x23')]=function(){this[_0x5f0e('0xc5')](0x10);},Window_AutosaveConfirm[_0x5f0e('0x28')]['fadeOut']=function(){this[_0x5f0e('0xc5')](-0x10);},VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x140')]=Window_SavefileList['prototype'][_0x5f0e('0x131')],Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0x131')]=function(_0x271db9,_0x32239d){if(StorageManager[_0x5f0e('0x86')]()===_0x5f0e('0x16d'))_0x32239d=![];if($gameTemp['_pickLockedSaveSlot'])_0x32239d=![];VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0x140')][_0x5f0e('0x6e')](this,_0x271db9,_0x32239d);},Window_SavefileList[_0x5f0e('0x28')]['numVisibleRows']=function(){const _0x5c0b9d=VisuMZ['SaveCore'][_0x5f0e('0xfd')]['SaveMenu'],_0x318399=this[_0x5f0e('0x7b')]();switch(_0x318399){case _0x5f0e('0xba'):return _0x5c0b9d[_0x5f0e('0x30')];break;case _0x5f0e('0xd4'):return _0x5c0b9d[_0x5f0e('0x189')];break;case _0x5f0e('0x83'):return _0x5c0b9d['LargeRows'];break;default:return _0x5c0b9d[_0x5f0e('0xc2')];break;}},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0x98')]=function(){const _0xeccc89=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')]['SaveMenu'],_0x5b5482=this[_0x5f0e('0x7b')]();switch(_0x5b5482){case _0x5f0e('0xba'):return _0xeccc89[_0x5f0e('0x10e')];break;case'box':return _0xeccc89[_0x5f0e('0xae')];break;case _0x5f0e('0x83'):return _0xeccc89[_0x5f0e('0x6f')];break;default:return _0xeccc89['ListCols'];break;}},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0xcb')]=function(){if(Imported['VisuMZ_1_MessageCore']){if(_0x5f0e('0x6')===_0x5f0e('0xe2')){function _0x499600(){this['setFadeSpeed'](0x10);}}else Window_Selectable[_0x5f0e('0x28')][_0x5f0e('0xcb')]['call'](this);}},Window_SavefileList['prototype'][_0x5f0e('0x18')]=function(_0x4c6993){return Imported[_0x5f0e('0x81')]?Window_Selectable[_0x5f0e('0x28')][_0x5f0e('0x18')][_0x5f0e('0x6e')](this,_0x4c6993):'';},Window_SavefileList[_0x5f0e('0x28')]['actorStyle']=function(){return VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0xee')];},Window_SavefileList['prototype']['menuStyle']=function(){return VisuMZ['SaveCore'][_0x5f0e('0xfd')][_0x5f0e('0x1c')];},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0x16a')]=function(_0x223fc5){const _0x5dc293=Math[_0x5f0e('0x1f')](0x0,this[_0x5f0e('0x15e')](_0x223fc5));this[_0x5f0e('0x148')](_0x5dc293);},Window_SavefileList['prototype'][_0x5f0e('0x85')]=function(_0x2ea551){const _0x169178=this[_0x5f0e('0xcd')](_0x2ea551),_0xdab638=DataManager[_0x5f0e('0x6d')](_0x169178);if(_0xdab638)_0xdab638[_0x5f0e('0xcf')]=_0x169178;this[_0x5f0e('0x95')]=_0x169178;const _0x481fa1=this['itemRect'](_0x2ea551);this[_0x5f0e('0x79')](),this['changePaintOpacity'](this[_0x5f0e('0xa')](_0x169178)),this[_0x5f0e('0x179')](_0xdab638,_0x481fa1);},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0xcc')]=function(_0x3d84da,_0x6c5066,_0x341dad){if(_0x3d84da===0x0)this[_0x5f0e('0xe5')](TextManager[_0x5f0e('0xd8')],_0x6c5066,_0x341dad,0xb4);else{if(_0x5f0e('0x91')!==_0x5f0e('0x91')){function _0x201b79(){return _0x59b3fe['globalVariables']=_0x4c6e4f[_0x5f0e('0x177')]||[],_0xa140a5[_0x5f0e('0x177')][_0x17db0b]===_0x39cfa4&&(_0x3e4238[_0x5f0e('0x177')][_0x442372]=0x0),_0x3fba4c[_0x5f0e('0x177')][_0x256a40];}}else this['drawText'](TextManager[_0x5f0e('0x55')]+'\x20'+_0x3d84da,_0x6c5066,_0x341dad,0xb4);}},Window_SavefileList['prototype'][_0x5f0e('0x52')]=function(_0x21a523,_0x37b0a1,_0x4ef7f4){if(_0x21a523===0x0||DataManager['latestSavefileId']()!==_0x21a523)return;const _0x4ce2fa=TextManager['latestSave'];this[_0x5f0e('0x12b')](ColorManager[_0x5f0e('0x125')]()),this[_0x5f0e('0xe5')](_0x4ce2fa,_0x37b0a1,_0x4ef7f4,0xb4);},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0x11e')]=function(_0x41d0cb,_0x3875ea,_0x9780a,_0x4fb2d3,_0x5dcc32){if(!_0x41d0cb[_0x5f0e('0xe3')])return;const _0x5d4be9=this[_0x5f0e('0x2c')]();switch(_0x5d4be9){case _0x5f0e('0xd'):this[_0x5f0e('0xf5')](_0x41d0cb,_0x3875ea,_0x9780a,_0x4fb2d3,_0x5dcc32);break;case _0x5f0e('0x16b'):this[_0x5f0e('0xb2')](_0x41d0cb,_0x3875ea,_0x9780a,_0x4fb2d3,_0x5dcc32);break;case'svbattler':this[_0x5f0e('0x18e')](_0x41d0cb,_0x3875ea,_0x9780a,_0x4fb2d3,_0x5dcc32);break;default:break;}},Window_SavefileList['prototype'][_0x5f0e('0xf5')]=function(_0x46188e,_0x1204e6,_0x29c65e,_0x586b8b,_0x202c61){const _0x9c29e7=Math[_0x5f0e('0x13d')](_0x46188e[_0x5f0e('0x59')][_0x5f0e('0x160')],$gameParty[_0x5f0e('0xe8')]()),_0x44bebe=Math[_0x5f0e('0x13d')](ImageManager['faceWidth'],Math[_0x5f0e('0x10a')](_0x586b8b/_0x9c29e7));_0x1204e6=_0x1204e6+Math[_0x5f0e('0x142')]((_0x586b8b-_0x9c29e7*_0x44bebe)/0x2);for(const _0x47cd31 of _0x46188e[_0x5f0e('0x59')]){if(_0x5f0e('0x24')===_0x5f0e('0x69')){function _0x39a496(){return!_0x465605[_0x5f0e('0x84')]()&&!_0x29ff10[_0x5f0e('0x75')]()&&_0x57b453[_0x5f0e('0xaf')]()&&(_0x4f0f58[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0xd5')][_0x5f0e('0xc')]?_0x4c2276['isSaveEnabled']():!![]);}}else this[_0x5f0e('0x112')](_0x47cd31[0x0],_0x47cd31[0x1],_0x1204e6,_0x29c65e+0x1,_0x44bebe,_0x202c61-0x2),_0x1204e6+=_0x44bebe;}},ImageManager[_0x5f0e('0xbf')]=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')]['SaveMenu']['SpriteWidth'],ImageManager[_0x5f0e('0xc3')]=VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x182')]['SvBattlerWidth'],Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0xb2')]=function(_0x356d62,_0x3f7ac1,_0xee85c6,_0x30b31f,_0x47aaf9){const _0x4972e5=Math[_0x5f0e('0x13d')](_0x356d62['characters'][_0x5f0e('0x160')],$gameParty['maxBattleMembers']()),_0x34be71=ImageManager[_0x5f0e('0xbf')];_0x3f7ac1=_0x3f7ac1+Math['round']((_0x30b31f-_0x4972e5*_0x34be71)/0x2)+_0x34be71/0x2,_0xee85c6=_0xee85c6+_0x47aaf9-0x8;for(const _0x5436b1 of _0x356d62[_0x5f0e('0xe3')]){this[_0x5f0e('0x118')](_0x5436b1[0x0],_0x5436b1[0x1],_0x3f7ac1,_0xee85c6),_0x3f7ac1+=_0x34be71;}},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0x18e')]=function(_0x4a5529,_0x7ff177,_0x549ac0,_0x2d9ed2,_0x1ff931){if(!_0x4a5529[_0x5f0e('0x6c')])return this[_0x5f0e('0xb2')](_0x4a5529,_0x7ff177,_0x549ac0,_0x2d9ed2,_0x1ff931);const _0x5cb05a=Math[_0x5f0e('0x13d')](_0x4a5529[_0x5f0e('0x6c')]['length'],$gameParty[_0x5f0e('0xe8')]()),_0x2cfb9d=ImageManager[_0x5f0e('0xc3')];_0x7ff177=_0x7ff177+Math[_0x5f0e('0x142')]((_0x2d9ed2-_0x5cb05a*_0x2cfb9d)/0x2)+_0x2cfb9d/0x2,_0x549ac0=_0x549ac0+_0x1ff931-0x8;for(const _0x6835b6 of _0x4a5529[_0x5f0e('0x6c')]){this[_0x5f0e('0x60')](_0x6835b6,_0x7ff177,_0x549ac0),_0x7ff177+=_0x2cfb9d;}},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0xef')]=function(_0x52f181,_0x5c20ba,_0x5aaeb3,_0x42b255,_0x46aaaf,_0x42f1f8){if(_0x52f181==='')return;_0x5c20ba+=0x2,_0x5aaeb3+=0x2,_0x42b255-=0x4,_0x46aaaf-=0x4;const _0x58b1ed=ImageManager[_0x5f0e('0xd0')](_0x52f181),_0x1d674d=_0x58b1ed[_0x5f0e('0x87')],_0x11df8f=_0x58b1ed[_0x5f0e('0x88')],_0x3aaef3=Math[_0x5f0e('0x13d')](_0x42b255/_0x1d674d,_0x46aaaf/_0x11df8f,_0x42f1f8?0x1:0x3e8),_0x1708bf=Math[_0x5f0e('0x5f')](_0x58b1ed[_0x5f0e('0x87')]*_0x3aaef3),_0x58f9c3=Math[_0x5f0e('0x5f')](_0x58b1ed[_0x5f0e('0x88')]*_0x3aaef3);this[_0x5f0e('0x8c')][_0x5f0e('0x165')](_0x58b1ed,0x0,0x0,_0x1d674d,_0x11df8f,_0x5c20ba,_0x5aaeb3,_0x1708bf,_0x58f9c3);},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0x100')]=function(_0x1651c0,_0x89872f,_0x44cdc2,_0x5e080,_0x51524c,_0x76e280){if(_0x1651c0==='')return;_0x89872f+=0x2,_0x44cdc2+=0x2,_0x5e080-=0x4,_0x51524c-=0x4;const _0x37e5bb=ImageManager['loadPicture'](_0x1651c0),_0x314940=_0x37e5bb[_0x5f0e('0x87')],_0x1284bd=_0x37e5bb[_0x5f0e('0x88')],_0x442e66=Math[_0x5f0e('0x13d')](_0x5e080/_0x314940,_0x51524c/_0x1284bd,_0x76e280?0x1:0x3e8),_0x50bb56=Math[_0x5f0e('0x5f')](_0x37e5bb['width']*_0x442e66),_0x357b8b=Math[_0x5f0e('0x5f')](_0x37e5bb[_0x5f0e('0x88')]*_0x442e66);_0x89872f+=(_0x5e080-_0x50bb56)/0x2,_0x44cdc2+=(_0x51524c-_0x357b8b)/0x2,this[_0x5f0e('0x8c')][_0x5f0e('0x165')](_0x37e5bb,0x0,0x0,_0x314940,_0x1284bd,_0x89872f,_0x44cdc2,_0x50bb56,_0x357b8b);},Window_SavefileList['prototype'][_0x5f0e('0x21')]=function(_0xb36d69,_0x1f7d84,_0x272223,_0x125417,_0x3456f9){_0xb36d69['playtime']&&(_0x3456f9=_0x3456f9||_0x5f0e('0x8b'),this[_0x5f0e('0xe5')](_0xb36d69[_0x5f0e('0xa9')],_0x1f7d84,_0x272223,_0x125417,_0x3456f9));},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0x13a')]=function(_0x36c3c9,_0x1a472d,_0x427307,_0xe478a7,_0x5a72bd){if(_0x36c3c9['timestamp']){if(_0x5f0e('0x2e')===_0x5f0e('0x9')){function _0x26ac52(){this[_0x5f0e('0x171')]=0x0,_0x22bb1e[_0x5f0e('0x28')][_0x5f0e('0x29')][_0x5f0e('0x6e')](this,_0x40dbbf),this[_0x5f0e('0x17f')]=0x0,this[_0x5f0e('0x19f')]=0x0;}}else{_0x5a72bd=_0x5a72bd||'left';const _0x3c142f=this[_0x5f0e('0x120')](_0x36c3c9);this['drawText'](_0x3c142f,_0x1a472d,_0x427307,_0xe478a7,_0x5a72bd);}}},Window_SavefileList[_0x5f0e('0x28')]['getTimestamp']=function(_0x1f978b){const _0x25493b=_0x1f978b['timestamp'],_0x40cc40=new Date(_0x25493b);let _0x402857=_0x5f0e('0x102');_0x402857=_0x402857['replace'](/\[YEAR\]/gi,'%1'),_0x402857=_0x402857[_0x5f0e('0xa7')](/\[MONTH\]/gi,'%2'),_0x402857=_0x402857['replace'](/\[DATE\]/gi,'%3'),_0x402857=_0x402857['replace'](/\[HOUR\]/gi,'%4'),_0x402857=_0x402857[_0x5f0e('0xa7')](/\[MINUTE\]/gi,'%5'),_0x402857=_0x402857['replace'](/\[SECOND\]/gi,'%6');let _0xa3766=String(_0x40cc40[_0x5f0e('0x19d')]())[_0x5f0e('0x17a')]('')[_0x5f0e('0x40')]('​');return _0x402857[_0x5f0e('0xa2')](_0xa3766[_0x5f0e('0x65')](0x4,'0'),String(_0x40cc40[_0x5f0e('0x16e')]())[_0x5f0e('0x65')](0x2,'0'),String(_0x40cc40[_0x5f0e('0xf')]())['padStart'](0x2,'0'),String(_0x40cc40[_0x5f0e('0x168')]())['padStart'](0x2,'0'),String(_0x40cc40[_0x5f0e('0xe7')]())['padStart'](0x2,'0'),String(_0x40cc40['getSeconds']())[_0x5f0e('0x65')](0x2,'0'));},Window_SavefileList['prototype']['drawCurrency']=function(_0xc1e209,_0x115b88,_0x580c32,_0xf834a7){if(_0xc1e209[_0x5f0e('0xd7')]===undefined)return;const _0x204d90=_0xc1e209[_0x5f0e('0xd7')],_0x1812c3=TextManager[_0x5f0e('0xfb')];Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0x3f')][_0x5f0e('0x6e')](this,_0x204d90,_0x1812c3,_0x115b88,_0x580c32,_0xf834a7);},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0x78')]=function(_0x364678,_0x2acf28,_0x3dbf90,_0x19e15b,_0x11c7be){if(_0x364678[_0x5f0e('0xa8')]){const _0x1645e9=this['textSizeEx'](_0x364678[_0x5f0e('0xa8')])[_0x5f0e('0x87')];_0x11c7be=_0x11c7be||_0x5f0e('0x8b');if(_0x11c7be===_0x5f0e('0xc4'))_0x2acf28=_0x2acf28+_0x19e15b-_0x1645e9;else _0x11c7be===_0x5f0e('0x97')&&(_0x2acf28=_0x2acf28+(_0x19e15b-_0x1645e9)/0x2);this[_0x5f0e('0x14d')](_0x364678['description'],_0x2acf28,_0x3dbf90,_0x19e15b);}},Window_SavefileList[_0x5f0e('0x28')]['drawContents']=function(_0x11d750,_0x5a9c44){if(_0x11d750){const _0xbc44c2=ImageManager[_0x5f0e('0xd0')](_0x11d750[_0x5f0e('0x5c')]||'');_0xbc44c2[_0x5f0e('0xb5')](this[_0x5f0e('0x110')][_0x5f0e('0x156')](this,_0x11d750,_0x5a9c44));}else this[_0x5f0e('0x15c')](this[_0x5f0e('0x95')],_0x5a9c44);},Window_SavefileList['prototype'][_0x5f0e('0x110')]=function(_0x4fb3be,_0xb23768){const _0x40d3b9=this['menuStyle']();switch(_0x40d3b9){case _0x5f0e('0xba'):this[_0x5f0e('0x144')](_0x4fb3be,_0xb23768);break;case _0x5f0e('0xd4'):this[_0x5f0e('0x141')](_0x4fb3be,_0xb23768);break;case'large':this[_0x5f0e('0xd6')](_0x4fb3be,_0xb23768);break;default:this[_0x5f0e('0x61')](_0x4fb3be,_0xb23768);break;}this['resetFontSettings']();const _0x2722c8=_0x4fb3be[_0x5f0e('0xcf')];this[_0x5f0e('0x15c')](_0x2722c8,_0xb23768);},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0x15c')]=function(_0x147db9,_0x2b0d83){const _0x5de2a0=this[_0x5f0e('0x7b')]();switch(_0x5de2a0){case _0x5f0e('0xba'):this[_0x5f0e('0x104')](_0x147db9,_0x2b0d83);break;case _0x5f0e('0xd4'):this[_0x5f0e('0xbc')](_0x147db9,_0x2b0d83);break;case _0x5f0e('0x83'):this['drawLargeStyleFileData'](_0x147db9,_0x2b0d83);break;default:this[_0x5f0e('0x14f')](_0x147db9,_0x2b0d83);break;}},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0x61')]=function(_0x5b1159,_0x10f5fa){VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x182')][_0x5f0e('0x183')]['call'](this,_0x5b1159,_0x10f5fa);},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0x144')]=function(_0x274069,_0x2dbf35){VisuMZ[_0x5f0e('0x8d')]['Settings'][_0x5f0e('0x182')]['VertContentsJS'][_0x5f0e('0x6e')](this,_0x274069,_0x2dbf35);},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0x141')]=function(_0x5eaf3e,_0x82a94e){VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x182')][_0x5f0e('0x107')][_0x5f0e('0x6e')](this,_0x5eaf3e,_0x82a94e);},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0xd6')]=function(_0x1aa915,_0xfd6de0){VisuMZ['SaveCore']['Settings'][_0x5f0e('0x182')][_0x5f0e('0x145')][_0x5f0e('0x6e')](this,_0x1aa915,_0xfd6de0);},Window_SavefileList['prototype']['drawListStyleFileData']=function(_0xa1b88a,_0x3f7e2d){VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')]['SaveMenu'][_0x5f0e('0x146')][_0x5f0e('0x6e')](this,_0xa1b88a,_0x3f7e2d);},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0x104')]=function(_0x1935d2,_0x565976){VisuMZ[_0x5f0e('0x8d')][_0x5f0e('0xfd')][_0x5f0e('0x182')]['VertFileDataJS'][_0x5f0e('0x6e')](this,_0x1935d2,_0x565976);},Window_SavefileList[_0x5f0e('0x28')][_0x5f0e('0xbc')]=function(_0x2934d8,_0x186bcb){VisuMZ['SaveCore'][_0x5f0e('0xfd')][_0x5f0e('0x182')][_0x5f0e('0xc0')][_0x5f0e('0x6e')](this,_0x2934d8,_0x186bcb);},Window_SavefileList[_0x5f0e('0x28')]['drawLargeStyleFileData']=function(_0x468411,_0x4d9237){VisuMZ[_0x5f0e('0x8d')]['Settings']['SaveMenu']['LargeFileDataJS'][_0x5f0e('0x6e')](this,_0x468411,_0x4d9237);};