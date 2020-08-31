//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.01] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 *
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<x>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<x>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace 'x' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Center:
 *   - Center the window X after changing its width?
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
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
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg Center:eval
 * @text Center Window X?
 * @parent Width
 * @type boolean
 * @on Center
 * @off Don't
 * @desc Center the window X after changing its width?
 * @default true
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
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
 * @param MessageCore
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
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"shift","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"6","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"6","Classes:str":"4","Skills:str":"4","Items:str":"4","Weapons:str":"4","Armors:str":"4","Enemies:str":"2","States:str":"4","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default shift
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type num
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 6
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default 0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 6
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 2
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 4
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
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
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 */
//=============================================================================

const _0x491d=['fontFace','HelpWindow','left','status','TextCodeActions','_wholeMoveDuration','canMove','Center','itemHeight','GBuYS','_MessageCoreSettings','fwKmX','itemRectWithPadding','getMessageWindowWidth','setChoiceListLineHeight','open','clearActorNameAutoColor','_data','addCommand','setTextAlignment','processFontChangeBold','TextMacros','WZdyH','list','Game_Map_updateEvents','drawing','Window_Options_isVolumeSymbol','commandSymbol','oDAZU','preConvertEscapeCharacters','COLORLOCK[1]','BOLD[0]','textCodeResult','drawBackCenteredPicture','choiceCols','Actors','MessageCore','toUpperCase','bzINi','version','width','_messageWindow','commandName','vObOW','intHl','LineBreakSpace','setChoiceListMaxColumns','ActionJS','jceZn','partyMemberName','min','changeValue','<WORDWRAP>','mainFontFace','AutoColorBypassList','setChoiceListMaxRows','applyMoveEasing','RelativePXPY','ChoiceWindowMaxCols','false','setPositionType','NameBoxWindowOffsetX','Window_Help_refresh','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','constructor','shift','registerResetRect','STRUCT','initMessageCore','XXXpG','ITALIC[0]','ITALIC[1]','UYzhB','wGhVv','Window_Options_statusText','isWordWrapEnabled','MessageWindowProperties','TextStr','AQyri','Window_NameBox_refresh','TextColor','contentsBack','HsXNQ','LineHeight','Game_Map_initialize','isTriggered','isRunning','choice','setMessageWindowWidth','updateBackground','WordWrap','sort','normalColor','changeVolume','processDrawCenteredPicture','startX','processCustomWait','Window_Base_processEscapeCharacter','Scene_Options_maxCommands','Window_Base_update','includes','helpWordWrap','registerCommand','messageWidth','textSizeExTextAlignment','iciph','convertBaseEscapeCharacters','Rows','Window_Message_clearFlags','WAIT','isMessageWindowWordWrap','_eventId','isCommandEnabled','mainFontSize','calcWindowHeight','ALL','processAllText','setupEvents','TEXTALIGNMENT[1]','setMessageWindowRows','close','obtainEscapeParam','_indent','colSpacing','_centerMessageWindow','launchMessageCommonEvent','processFontChangeItalic','currentCommand','choiceTextAlign','setFaceImage','_textDelay','TEXTALIGNMENT','isBusy','States','remove','</I>','Type','TXYRk','getChoiceListLineHeight','Window_Options_changeVolume','<LINE\x20BREAK>','_moveEasingType','outlineWidth','messageCoreTextSpeed','TextJS','slice','_moveDuration','makeDeepCopy','convertVariableEscapeCharacters','StretchDimmedBg','isPressed','hrsom','Window_Base_initialize','databaseObjectName','convertTextMacros','convertLockColorsEscapeCharacters','clampPlacementPosition','actorName','returnPreservedFontSettings','addMessageCommonEvent','processPreviousColor','ARRAYJSON','bind','TEXTALIGNMENT[3]','Instant','convertShowChoiceEscapeCodes','updatePlacement','defaultColor','description','IuWsj','processTextAlignmentX','currentExt','wWqfc','fontBold','Classes','Items','index','oaZXh','isHelpWindowWordWrap','ChoiceWindowProperties','postConvertEscapeCharacters','parameters','default','Game_Party_initialize','updateOffsetPosition','prepareWordWrapEscapeCharacters','choiceRows','Name','loadPicture','UlcyE','General','convertTextAlignmentEscapeCharacters','outlineColor','itemPadding','_showFast','blt','addExtraShowChoices','ANY','xGGGS','_messageCommonEvents','_resetRect','setWaitMode','_relativePosition','getChoiceListTextAlign','applyDatabaseAutoColor','processFsTextCode','updateRelativePosition','windowWidth','Scene_Boot_onDatabaseLoaded','LWSgw','right','setColorLock','MaxRows','vvrKi','setWordWrap','processAutoColorWords','processCommonEvent','Game_Interpreter_setupChoices','makeCommandList','MessageWindow','OAIqC','PICTURE','getPreservedFontSettings','indent','Window_NameBox_updatePlacement','OCqeL','_textAlignment','resetRect','gainItem','getMessageWindowRows','processPxTextCode','isVolumeSymbol','Width','match','textCodeCheck','return\x200','isAutoColorAffected','NUM','Settings','paintOpacity','createTextState','OmbPM','convertEscapeCharacters','Window_Base_processAllText','setupChoices','Window_Base_processNewLine','addMessageCoreTextSpeedCommand','outLineColor','type','command101','floor','clearFlags','createContents','WZvUQ','isRTL','COLORLOCK','update','_nameBoxWindow','<%1>','toLowerCase','windowX','replace','SortObjectByKeyLength','processMessageCoreEscapeActions','updateEvents','ibklE','value','callOkHandler','splice','ceil','convertMessageCoreEscapeActions','process_VisuMZ_MessageCore_TextCodes_Action','_moveTargetWidth','isChoiceEnabled','drawBackPicture','FontChangeValue','_moveTargetX','TextCodeReplace','textSizeEx','actor','processCharacter','azoZj','addContinuousShowTextCommands','ConfigManager_applyData','message','Enemies','getChoiceListMaxRows','_moveTargetHeight','event','terminateMessage','processDrawPicture','adjustShowChoiceCancel','process_VisuMZ_MessageCore_TextCodes_Replace','substr','processTextAlignmentChange','CreateAutoColorRegExpLists','contents','boxHeight','XjiyK','clearCommandList','COMMONEVENT','currencyUnit','choiceLineHeight','indexOf','exec','choicePositionType','Window_Base_changeTextColor','ConfigManager_makeData','FontBiggerCap','NameBoxWindowDefaultColor','ChoiceWindowMaxRows','setup','outputHeight','Window_ChoiceList_windowX','Undefined','_texts','citoc','initTextAlignement','addLoadListener','hGTDj','CommonEvent','clamp','drawItem','UBTDX','onChoice','AutoColorRegExp','return\x20\x27','setupNumInput','<I>','adjustShowChoiceDefault','startY','updateMessageCommonEvents','DSpdD','gMLqS','onDatabaseLoaded','Weapons','NameBoxWindowOffsetY','_dimmerSprite','clear','join','true','name','WrapBreak[0]','rtl','EVAL','textSpeed','anchor','Skills','itemLineRect','registerActorNameAutoColorChanges','FastForwardKey','processColorLock','placeCancelButton','FontSmallerCap','<COLORLOCK>','kBjsE','fontSize','convertBackslashCharacters','isColorLocked','faceName','changeOutlineColor','moveTo','ChoiceWindowTextAlign','setRelativePosition','_interpreter','BOLD[1]','resetPositionX','XoWGf','CENTERPICTURE','_autoColorActorNames','addMessageCoreCommands','<B>','Game_System_initialize','Armors','setSpeakerName','initialize','iconIndex','resetFontSettings','AddOption','height','wOHwR','Nhgvb','fontItalic','</CENTER>','nextEventCode','applyData','messageRows','code','unshift','Default','stretchDimmerSprite','ConvertTextAutoColorRegExpFriendly','maxCommands','AutoColor','STR','processPyTextCode','ARRAYFUNC','Window_Message_updatePlacement','WYEKv','exit','VmxTk','zMYov','gHbrZ','_moveTargetY','innerWidth','FePgB','changeTextSpeed','iCsOy','process_VisuMZ_MessageCore_TextMacros','FUNC','</WORDWRAP>','drawTextEx','process_VisuMZ_MessageCore_AutoColor','i[%1]%2','svYZL','Window_Message_isTriggered','SVVEx','onNewPageMessageCore','setupItemChoice','lastGainedObjectQuantity','push','MessageTextDelay','_commonEventId','makeFontBigger','processControlCharacter','wnwmk','yYUTF','textSpeedStatusText','TightWrap','TEXTALIGNMENT[2]','processEscapeCharacter','</RIGHT>','setTextDelay','messageWindowRect','_textColorStack','ConvertParams','EFbcw','SWITCHES','newPage','OFoXf','TEXTALIGNMENT[0]','max','_lastGainedItemData','Window_Options_makeCommandList','messageCoreWindowX','maxFontSizeInLine','trim','Window_Base_processControlCharacter','updateDimensions','<CENTER>','calcMoveEasing','gqFWG','updateMove','_index','pCFAn','tOzlh','isWeapon','resetWordWrap','setHelpWindowWordWrap','VTZML','_list','_cancelButton','isArmor','changePaintOpacity','filter','prepareShowTextFollowups','DNCwO','maxCols','ZIjlx','MessageRows','getConfigValue','AlmLH','ChoiceWindowLineHeight','sUGct','convertFontSettingsEscapeCharacters','scale','TextAlign','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','maxChoiceWidth','AdjustRect','moveBy','_textDelayCount','C[%1]%2PREVCOLOR[0]','_colorLock','onProcessCharacter','_positionType','format','zdizF','maxLines','getChoiceListMaxColumns','Game_Map_setupEvents','refreshDimmerBitmap','</COLORLOCK>','_scene','instantTextSpeed','makeFontSmaller','TEXTALIGNMENT','changeTextColor','start','obtainEscapeString','call','convertMessageCoreEscapeReplacements','isBreakShowTextCommands','auBUH','length','<LEFT>','choices','prototype','ITALIC','<BR>','_wordWrap','parse','easeOut','Game_Party_gainItem','processStoredAutoColorChanges','quantity','TextSpeed','SFNDL','EJXoe','textSizeExWordWrap','boxWidth','wrZAp','Match','outputWidth','processActorNameAutoColorChanges','text','split','AddAutoColor','makeData','setChoiceListTextAlign','addWrapBreakAfterPunctuation','gUONq','ARRAYSTR','substring','Window_ChoiceList_updatePlacement','getTextAlignment','setBackground','<RIGHT>','Window_Message_newPage','textColor','ENABLE','setMessageWindowWordWrap','mWgRp','getLastGainedItemData','processWrapBreak','isContinuePrepareShowTextCommands','resetTextColor','isItem','center','</B>','COLORLOCK[0]','messageWordWrap','ldXas','refresh','map','Window_Message_processEscapeCharacter','addContinuousShowChoices','lineHeight','ARRAYSTRUCT','GMsmc','adjustShowChoiceExtension','CreateAutoColorRegExpListEntries','setLastGainedItemData','activate','Qfqbx','[0]','</LEFT>','isChoiceVisible','Window_Message_terminateMessage','members','CgMsT','HRvre'];(function(_0x55f1fd,_0x491def){const _0x41fbaf=function(_0x253bc8){while(--_0x253bc8){_0x55f1fd['push'](_0x55f1fd['shift']());}};_0x41fbaf(++_0x491def);}(_0x491d,0x1cd));const _0x41fb=function(_0x55f1fd,_0x491def){_0x55f1fd=_0x55f1fd-0x0;let _0x41fbaf=_0x491d[_0x55f1fd];return _0x41fbaf;};var label='MessageCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x41fb('0x3')](function(_0x58b7f9){return _0x58b7f9[_0x41fb('0x72')]&&_0x58b7f9[_0x41fb('0x117')][_0x41fb('0xd3')]('['+label+']');})[0x0];VisuMZ[label][_0x41fb('0x15d')]=VisuMZ[label][_0x41fb('0x15d')]||{},VisuMZ[_0x41fb('0x222')]=function(_0x2d8ae9,_0x45d14f){for(const _0x4eabd9 in _0x45d14f){if(_0x4eabd9[_0x41fb('0x158')](/(.*):(.*)/i)){const _0x1b5ef1=String(RegExp['$1']),_0x4791a7=String(RegExp['$2'])[_0x41fb('0x94')]()[_0x41fb('0x22d')]();let _0xdcd156,_0x33d0fe,_0xc41d36;switch(_0x4791a7){case _0x41fb('0x15c'):_0xdcd156=_0x45d14f[_0x4eabd9]!==''?Number(_0x45d14f[_0x4eabd9]):0x0;break;case'ARRAYNUM':_0x33d0fe=_0x45d14f[_0x4eabd9]!==''?JSON[_0x41fb('0x32')](_0x45d14f[_0x4eabd9]):[],_0xdcd156=_0x33d0fe[_0x41fb('0x5d')](_0x5084e5=>Number(_0x5084e5));break;case _0x41fb('0x1c7'):_0xdcd156=_0x45d14f[_0x4eabd9]!==''?eval(_0x45d14f[_0x4eabd9]):null;break;case'ARRAYEVAL':_0x33d0fe=_0x45d14f[_0x4eabd9]!==''?JSON[_0x41fb('0x32')](_0x45d14f[_0x4eabd9]):[],_0xdcd156=_0x33d0fe[_0x41fb('0x5d')](_0x2b0f29=>eval(_0x2b0f29));break;case'JSON':_0xdcd156=_0x45d14f[_0x4eabd9]!==''?JSON[_0x41fb('0x32')](_0x45d14f[_0x4eabd9]):'';break;case _0x41fb('0x110'):_0x33d0fe=_0x45d14f[_0x4eabd9]!==''?JSON[_0x41fb('0x32')](_0x45d14f[_0x4eabd9]):[],_0xdcd156=_0x33d0fe[_0x41fb('0x5d')](_0x5bd94f=>JSON[_0x41fb('0x32')](_0x5bd94f));break;case _0x41fb('0x208'):_0xdcd156=_0x45d14f[_0x4eabd9]!==''?new Function(JSON['parse'](_0x45d14f[_0x4eabd9])):new Function(_0x41fb('0x15a'));break;case _0x41fb('0x1fb'):_0x33d0fe=_0x45d14f[_0x4eabd9]!==''?JSON[_0x41fb('0x32')](_0x45d14f[_0x4eabd9]):[],_0xdcd156=_0x33d0fe[_0x41fb('0x5d')](_0x29c5a0=>new Function(JSON[_0x41fb('0x32')](_0x29c5a0)));break;case _0x41fb('0x1f9'):_0xdcd156=_0x45d14f[_0x4eabd9]!==''?String(_0x45d14f[_0x4eabd9]):'';break;case _0x41fb('0x47'):_0x33d0fe=_0x45d14f[_0x4eabd9]!==''?JSON[_0x41fb('0x32')](_0x45d14f[_0x4eabd9]):[],_0xdcd156=_0x33d0fe[_0x41fb('0x5d')](_0x2acf38=>String(_0x2acf38));break;case _0x41fb('0xb2'):_0xc41d36=_0x45d14f[_0x4eabd9]!==''?JSON[_0x41fb('0x32')](_0x45d14f[_0x4eabd9]):{},_0x2d8ae9[_0x1b5ef1]={},VisuMZ[_0x41fb('0x222')](_0x2d8ae9[_0x1b5ef1],_0xc41d36);continue;case _0x41fb('0x61'):_0x33d0fe=_0x45d14f[_0x4eabd9]!==''?JSON[_0x41fb('0x32')](_0x45d14f[_0x4eabd9]):[],_0xdcd156=_0x33d0fe[_0x41fb('0x5d')](_0x3c61b8=>VisuMZ[_0x41fb('0x222')]({},JSON[_0x41fb('0x32')](_0x3c61b8)));break;default:continue;}_0x2d8ae9[_0x1b5ef1]=_0xdcd156;}}return _0x2d8ae9;},(_0x446854=>{const _0x3d1771=_0x446854[_0x41fb('0x1c4')];for(const _0x40da73 of dependencies){if('jceZn'!==_0x41fb('0x9f')){function _0x19227b(){_0x98a011[_0x41fb('0x159')]=new _0x275523('\x5c['+_0x39745d[_0x41fb('0x3d')]+'\x5c]','gi'),_0x4ae3c7[_0x41fb('0xbc')]!==''&&_0x4000af[_0x41fb('0xbc')]!==_0x41fb('0x1a9')?_0x223275[_0x41fb('0x8f')]=new _0x2269ec(_0x41fb('0x1b5')+_0x13e861[_0x41fb('0xbc')]['replace'](/\\/g,'')+'\x27'):_0x37cedc[_0x41fb('0x8f')]=_0x5a36d9[_0x41fb('0xff')];}}else{if(!Imported[_0x40da73]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x41fb('0x19')](_0x3d1771,_0x40da73)),SceneManager[_0x41fb('0x1fe')]();break;}}}const _0x106691=_0x446854[_0x41fb('0x117')];if(_0x106691[_0x41fb('0x158')](/\[Version[ ](.*?)\]/i)){const _0x1b3d18=Number(RegExp['$1']);_0x1b3d18!==VisuMZ[label][_0x41fb('0x96')]&&(alert(_0x41fb('0xae')[_0x41fb('0x19')](_0x3d1771,_0x1b3d18)),SceneManager[_0x41fb('0x1fe')]());}if(_0x106691[_0x41fb('0x158')](/\[Tier[ ](\d+)\]/i)){const _0x576447=Number(RegExp['$1']);if(_0x576447<tier){if(_0x41fb('0x7a')===_0x41fb('0x62')){function _0x371991(){this[_0x41fb('0x197')][_0x41fb('0x1d3')]+=_0x1b81fb[_0x41fb('0x93')][_0x41fb('0x15d')]['General']['FontChangeValue'],this[_0x41fb('0x197')][_0x41fb('0x1d3')]=_0x153040['min'](this[_0x41fb('0x197')][_0x41fb('0x1d3')],_0x16d5ff[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x12d')][_0x41fb('0x1a3')]);}}else alert(_0x41fb('0x10')[_0x41fb('0x19')](_0x3d1771,_0x576447,tier)),SceneManager[_0x41fb('0x1fe')]();}else{if(_0x41fb('0x1fd')!==_0x41fb('0x235'))tier=Math[_0x41fb('0x228')](_0x576447,tier);else{function _0x5a9fc0(){_0x50bb4e[_0x41fb('0x93')]['Window_Base_update'][_0x41fb('0x27')](this),this[_0x41fb('0x233')]();}}}}VisuMZ[_0x41fb('0x222')](VisuMZ[label]['Settings'],_0x446854[_0x41fb('0x124')]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x41fb('0x1c4')],_0x41fb('0x122'),_0x2d23df=>{VisuMZ[_0x41fb('0x222')](_0x2d23df,_0x2d23df);const _0xad117a=_0x2d23df[_0x41fb('0xc2')]||$gameSystem['getChoiceListLineHeight']()||0x1,_0x5a3f80=_0x2d23df[_0x41fb('0x143')]||$gameSystem[_0x41fb('0x18d')]()||0x1,_0x12d983=_0x2d23df['MaxCols']||$gameSystem['getChoiceListMaxColumns']()||0x1,_0x145722=_0x2d23df[_0x41fb('0xf')][_0x41fb('0x172')]()||'default';$gameSystem[_0x41fb('0x7d')](_0xad117a),$gameSystem[_0x41fb('0xa6')](_0x5a3f80),$gameSystem[_0x41fb('0x9d')](_0x12d983),$gameSystem['setChoiceListTextAlign'](_0x145722);}),PluginManager[_0x41fb('0xd5')](pluginData[_0x41fb('0x1c4')],_0x41fb('0xbb'),_0xf35d84=>{VisuMZ['ConvertParams'](_0xf35d84,_0xf35d84);const _0x4cc27b=_0xf35d84[_0x41fb('0xda')]||$gameSystem[_0x41fb('0x154')]()||0x1,_0x40235f=_0xf35d84[_0x41fb('0x157')]||$gameSystem['getMessageWindowWidth']()||0x1;$gameTemp[_0x41fb('0xeb')]=_0xf35d84[_0x41fb('0x76')]||![];const _0x4af42d=_0xf35d84[_0x41fb('0xc9')][_0x41fb('0x172')]();$gameSystem[_0x41fb('0xe6')](_0x4cc27b),$gameSystem[_0x41fb('0xc7')](_0x40235f),[_0x41fb('0x1c3'),_0x41fb('0xaa')][_0x41fb('0xd3')](_0x4af42d)&&$gameSystem[_0x41fb('0x50')](eval(_0x4af42d));}),VisuMZ['MessageCore']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x41fb('0x2e')]['onDatabaseLoaded'],Scene_Boot[_0x41fb('0x2e')][_0x41fb('0x1bd')]=function(){VisuMZ[_0x41fb('0x93')][_0x41fb('0x13f')][_0x41fb('0x27')](this),this[_0x41fb('0x17e')](),this[_0x41fb('0x193')](),this[_0x41fb('0x207')](),this[_0x41fb('0x20b')]();},VisuMZ['MessageCore'][_0x41fb('0x175')]=function(_0x31e274){const _0x4ba30f=VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x31e274];_0x4ba30f[_0x41fb('0xca')]((_0x5ba034,_0x3d5a30)=>{if(!_0x5ba034||!_0x3d5a30)return-0x1;return _0x3d5a30[_0x41fb('0x3d')][_0x41fb('0x2b')]-_0x5ba034[_0x41fb('0x3d')][_0x41fb('0x2b')];});},Scene_Boot[_0x41fb('0x2e')][_0x41fb('0x17e')]=function(){VisuMZ[_0x41fb('0x93')][_0x41fb('0x175')](_0x41fb('0x73'));for(const _0x2d19e7 of VisuMZ[_0x41fb('0x93')]['Settings'][_0x41fb('0x73')]){if(_0x41fb('0x78')!==_0x41fb('0x1a')){_0x2d19e7[_0x41fb('0x3d')]=_0x2d19e7[_0x41fb('0x3d')][_0x41fb('0x94')](),_0x2d19e7[_0x41fb('0x159')]=new RegExp(''+_0x2d19e7[_0x41fb('0x3d')],'gi'),_0x2d19e7[_0x41fb('0x8f')]=''+_0x2d19e7['Match'];if(_0x2d19e7['Type']==='')_0x2d19e7[_0x41fb('0x8f')]+=_0x41fb('0x68');}else{function _0x5eebb0(){this[_0x41fb('0x137')]=_0x2a217d['makeDeepCopy'](_0x390536);}}}},Scene_Boot[_0x41fb('0x2e')][_0x41fb('0x193')]=function(){VisuMZ[_0x41fb('0x93')][_0x41fb('0x175')](_0x41fb('0x184'));for(const _0x504e28 of VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x184')]){if(_0x41fb('0x223')!==_0x41fb('0x140')){_0x504e28[_0x41fb('0x159')]=new RegExp(''+_0x504e28[_0x41fb('0x3d')]+_0x504e28[_0x41fb('0xf7')],'gi');if(_0x504e28['TextStr']!==''&&_0x504e28[_0x41fb('0xbc')]!==_0x41fb('0x1a9')){if(_0x41fb('0x118')===_0x41fb('0x85')){function _0x4e6664(){for(const _0x427acd of _0x2d80ed[_0x41fb('0x93')]['Settings']['TextMacros']){_0x427acd[_0x41fb('0x159')]=new _0x509d38('\x5c['+_0x427acd['Match']+'\x5c]','gi'),_0x427acd[_0x41fb('0xbc')]!==''&&_0x427acd[_0x41fb('0xbc')]!==_0x41fb('0x1a9')?_0x427acd['textCodeResult']=new _0xaa13b9(_0x41fb('0x1b5')+_0x427acd[_0x41fb('0xbc')][_0x41fb('0x174')](/\\/g,'')+'\x27'):_0x427acd[_0x41fb('0x8f')]=_0x427acd['TextJS'];}}}else _0x504e28[_0x41fb('0x8f')]=new Function(_0x41fb('0x1b5')+_0x504e28[_0x41fb('0xbc')][_0x41fb('0x174')](/\\/g,'')+'\x27');}else _0x504e28[_0x41fb('0x8f')]=_0x504e28[_0x41fb('0xff')];}else{function _0x2cb284(){this[_0x41fb('0x229')]={'type':0x0,'id':0x0,'quantity':0x0};}}}},Scene_Boot[_0x41fb('0x2e')][_0x41fb('0x207')]=function(){for(const _0x4b1145 of VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x84')]){_0x4b1145[_0x41fb('0x159')]=new RegExp('\x5c['+_0x4b1145[_0x41fb('0x3d')]+'\x5c]','gi');if(_0x4b1145[_0x41fb('0xbc')]!==''&&_0x4b1145['TextStr']!=='Undefined')_0x4b1145[_0x41fb('0x8f')]=new Function(_0x41fb('0x1b5')+_0x4b1145[_0x41fb('0xbc')][_0x41fb('0x174')](/\\/g,'')+'\x27');else{if(_0x41fb('0x38')===_0x41fb('0x38'))_0x4b1145[_0x41fb('0x8f')]=_0x4b1145[_0x41fb('0xff')];else{function _0x3d002b(){return 0x4;}}}}},Scene_Boot[_0x41fb('0x2e')][_0x41fb('0x20b')]=function(){const _0x20b1a6=VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x1f8')];VisuMZ[_0x41fb('0x93')][_0x41fb('0x42')]($dataClasses,_0x20b1a6['Classes']),VisuMZ[_0x41fb('0x93')][_0x41fb('0x42')]($dataSkills,_0x20b1a6[_0x41fb('0x1ca')]),VisuMZ[_0x41fb('0x93')][_0x41fb('0x42')]($dataItems,_0x20b1a6['Items']),VisuMZ[_0x41fb('0x93')][_0x41fb('0x42')]($dataWeapons,_0x20b1a6[_0x41fb('0x1be')]),VisuMZ[_0x41fb('0x93')][_0x41fb('0x42')]($dataArmors,_0x20b1a6[_0x41fb('0x1e4')]),VisuMZ[_0x41fb('0x93')]['AddAutoColor']($dataEnemies,_0x20b1a6['Enemies']),VisuMZ['MessageCore']['AddAutoColor']($dataStates,_0x20b1a6[_0x41fb('0xf4')]),VisuMZ['MessageCore']['CreateAutoColorRegExpLists']();},VisuMZ[_0x41fb('0x93')][_0x41fb('0xa5')]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x41fb('0x1e2'),_0x41fb('0x58'),_0x41fb('0x1b7'),_0x41fb('0xf6'),_0x41fb('0x2c'),_0x41fb('0x69'),_0x41fb('0x230'),_0x41fb('0x1ee'),_0x41fb('0x4c'),_0x41fb('0x21e'),_0x41fb('0x1d1'),_0x41fb('0x1f'),_0x41fb('0xa3'),_0x41fb('0x209'),_0x41fb('0x30'),_0x41fb('0xfb'),_0x41fb('0x14c'),'CENTERPICTURE',_0x41fb('0x19b'),'WAIT','SHOW','HIDE',_0x41fb('0x4f'),'DISABLE','SWITCH',_0x41fb('0x224'),_0x41fb('0xe2'),_0x41fb('0x134')],VisuMZ[_0x41fb('0x93')][_0x41fb('0x42')]=function(_0x372dae,_0x4d3e1b){if(_0x4d3e1b<=0x0)return;const _0xe18a67=VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x1f8')][_0x41fb('0xbf')+_0x4d3e1b],_0x48beed=JsonEx[_0x41fb('0x102')](_0x372dae);for(const _0x3d0399 of _0x48beed){if(_0x41fb('0xc')===_0x41fb('0xc')){if(!_0x3d0399)continue;let _0x1ec837=_0x3d0399[_0x41fb('0x1c4')][_0x41fb('0x22d')]();if(VisuMZ[_0x41fb('0x93')][_0x41fb('0xa5')][_0x41fb('0xd3')](_0x1ec837[_0x41fb('0x94')]()))continue;_0x1ec837=_0x1ec837[_0x41fb('0x174')](/\\I\[(\d+)\]/gi,''),_0x1ec837=_0x1ec837['replace'](/\x1bI\[(\d+)\]/gi,'');if(_0x1ec837[_0x41fb('0x2b')]<=0x0)continue;if(_0x1ec837['match'](/-----/i))continue;_0xe18a67[_0x41fb('0x213')](_0x1ec837);}else{function _0x56a900(){_0x436fae=_0x52347f[_0x41fb('0x174')](_0x25cd5e[0x0],_0x1c8093[0x1]);}}}},VisuMZ['MessageCore'][_0x41fb('0x196')]=function(){VisuMZ[_0x41fb('0x93')][_0x41fb('0x1b4')]=[];for(let _0x5b9823=0x1;_0x5b9823<=0x1f;_0x5b9823++){const _0xf1f191='TextColor%1'[_0x41fb('0x19')](_0x5b9823),_0x11f268=VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x1f8')][_0xf1f191];_0x11f268[_0x41fb('0xca')]((_0x2b9ee1,_0x189194)=>{if(_0x41fb('0x150')!==_0x41fb('0xb7')){if(!_0x2b9ee1||!_0x189194)return-0x1;return _0x189194['length']-_0x2b9ee1[_0x41fb('0x2b')];}else{function _0x55a4e1(){return _0x1f574e=_0x3cb86d[_0x41fb('0x174')](/<B>/gi,_0x41fb('0x1dc')),_0x5e2b7b=_0x137e4f[_0x41fb('0x174')](/<\/B>/gi,_0x41fb('0x8e')),_0x369226=_0x182801[_0x41fb('0x174')](/<I>/gi,_0x41fb('0xb6')),_0x4ad24d=_0x33fa86[_0x41fb('0x174')](/<\/I>/gi,_0x41fb('0xb5')),_0x47d9e3;}}}),this[_0x41fb('0x64')](_0x11f268,_0x5b9823);}},VisuMZ[_0x41fb('0x93')]['CreateAutoColorRegExpListEntries']=function(_0x1a5770,_0x596638){for(const _0x1a5d93 of _0x1a5770){if(_0x41fb('0x199')!=='XjiyK'){function _0x2ac91c(){return _0x34db44[_0x41fb('0x93')][_0x41fb('0x1a8')][_0x41fb('0x27')](this);}}else{if(_0x1a5d93['length']<=0x0)continue;let _0x29fc7e=VisuMZ[_0x41fb('0x93')]['ConvertTextAutoColorRegExpFriendly'](_0x1a5d93);if(_0x1a5d93[_0x41fb('0x158')](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g)){if(_0x41fb('0x9b')!=='WhsMH')var _0x1641cf=new RegExp(_0x29fc7e,'i');else{function _0x198c95(){if(this[_0x41fb('0x79')]===_0x1c03f4)this[_0x41fb('0xb3')]();if(this[_0x41fb('0x79')][_0x41fb('0x1f1')]===_0x3d7fe5)this['initMessageCore']();return this[_0x41fb('0x79')][_0x41fb('0x1f1')];}}}else var _0x1641cf=new RegExp('\x5cb'+_0x29fc7e+'\x5cb','g');VisuMZ[_0x41fb('0x93')][_0x41fb('0x1b4')][_0x41fb('0x213')]([_0x1641cf,'C[%1]%2PREVCOLOR[0]'[_0x41fb('0x19')](_0x596638,_0x1a5d93)]);}}},VisuMZ[_0x41fb('0x93')]['ConvertTextAutoColorRegExpFriendly']=function(_0x262406){return _0x262406=_0x262406[_0x41fb('0x174')](/(\W)/gi,(_0x274b81,_0x1a8958)=>'\x5c%1'[_0x41fb('0x19')](_0x1a8958)),_0x262406;},ConfigManager[_0x41fb('0x1c8')]=VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x37')][_0x41fb('0x1f4')],VisuMZ[_0x41fb('0x93')][_0x41fb('0x1a2')]=ConfigManager[_0x41fb('0x43')],ConfigManager[_0x41fb('0x43')]=function(){const _0x546f7a=VisuMZ['MessageCore']['ConfigManager_makeData'][_0x41fb('0x27')](this);return _0x546f7a[_0x41fb('0x1c8')]=this[_0x41fb('0x1c8')],_0x546f7a;},VisuMZ[_0x41fb('0x93')][_0x41fb('0x18a')]=ConfigManager[_0x41fb('0x1f0')],ConfigManager[_0x41fb('0x1f0')]=function(_0x55e82a){VisuMZ[_0x41fb('0x93')]['ConfigManager_applyData'][_0x41fb('0x27')](this,_0x55e82a);if(_0x41fb('0x1c8')in _0x55e82a)this[_0x41fb('0x1c8')]=Number(_0x55e82a[_0x41fb('0x1c8')])[_0x41fb('0x1b0')](0x1,0xb);else{if('citoc'===_0x41fb('0x1ab'))this[_0x41fb('0x1c8')]=VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x37')][_0x41fb('0x1f4')];else{function _0x29cc89(){if(this[_0x41fb('0x1d5')]())return;_0x4245ab=_0x316347[_0x41fb('0x174')](/\,/g,''),this[_0x41fb('0x221')]=this['_textColorStack']||[],this['_textColorStack'][_0x41fb('0x1f3')](this[_0x41fb('0x197')][_0x41fb('0x4e')]),_0x56af74[_0x41fb('0x93')][_0x41fb('0x1a1')][_0x41fb('0x27')](this,_0x8a9b06);}}}},TextManager['messageCoreTextSpeed']=VisuMZ[_0x41fb('0x93')]['Settings']['TextSpeed'][_0x41fb('0x12a')],TextManager['instantTextSpeed']=VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')]['TextSpeed'][_0x41fb('0x113')],VisuMZ[_0x41fb('0x93')][_0x41fb('0x1e3')]=Game_System[_0x41fb('0x2e')][_0x41fb('0x1e6')],Game_System[_0x41fb('0x2e')]['initialize']=function(){VisuMZ[_0x41fb('0x93')][_0x41fb('0x1e3')][_0x41fb('0x27')](this),this[_0x41fb('0xb3')]();},Game_System['prototype'][_0x41fb('0xb3')]=function(){const _0x71f098=VisuMZ['MessageCore'][_0x41fb('0x15d')][_0x41fb('0x12d')],_0x327a32=VisuMZ[_0x41fb('0x93')]['Settings'][_0x41fb('0xc9')];this[_0x41fb('0x79')]={'messageRows':_0x71f098[_0x41fb('0x8')],'messageWidth':_0x71f098['MessageWidth'],'messageWordWrap':_0x327a32[_0x41fb('0x14a')],'helpWordWrap':_0x327a32[_0x41fb('0x70')],'choiceLineHeight':_0x71f098[_0x41fb('0xb')],'choiceRows':_0x71f098[_0x41fb('0x1a5')],'choiceCols':_0x71f098[_0x41fb('0xa9')],'choiceTextAlign':_0x71f098[_0x41fb('0x1d9')]};},Game_System[_0x41fb('0x2e')][_0x41fb('0x154')]=function(){if(this[_0x41fb('0x79')]===undefined)this['initMessageCore']();if(this[_0x41fb('0x79')][_0x41fb('0x1f1')]===undefined)this[_0x41fb('0xb3')]();return this[_0x41fb('0x79')]['messageRows'];},Game_System['prototype']['setMessageWindowRows']=function(_0x3f7d89){if(this[_0x41fb('0x79')]===undefined)this[_0x41fb('0xb3')]();if(this[_0x41fb('0x79')][_0x41fb('0x1f1')]===undefined)this['initMessageCore']();this[_0x41fb('0x79')][_0x41fb('0x1f1')]=_0x3f7d89||0x1;},Game_System[_0x41fb('0x2e')][_0x41fb('0x7c')]=function(){if(this[_0x41fb('0x79')]===undefined)this[_0x41fb('0xb3')]();if(this[_0x41fb('0x79')]['messageWidth']===undefined)this[_0x41fb('0xb3')]();return this['_MessageCoreSettings'][_0x41fb('0xd6')];},Game_System[_0x41fb('0x2e')][_0x41fb('0xc7')]=function(_0x6c3c5a){if(this[_0x41fb('0x79')]===undefined)this[_0x41fb('0xb3')]();if(this[_0x41fb('0x79')][_0x41fb('0xd6')]===undefined)this['initMessageCore']();this[_0x41fb('0x79')][_0x41fb('0xd6')]=_0x6c3c5a||0x1;},Game_System['prototype'][_0x41fb('0xdd')]=function(){if(this[_0x41fb('0x79')]===undefined)this['initMessageCore']();if(this[_0x41fb('0x79')][_0x41fb('0x5a')]===undefined)this[_0x41fb('0xb3')]();return this[_0x41fb('0x79')][_0x41fb('0x5a')];},Game_System[_0x41fb('0x2e')][_0x41fb('0x50')]=function(_0x39559b){if(this[_0x41fb('0x79')]===undefined)this[_0x41fb('0xb3')]();if(this[_0x41fb('0x79')][_0x41fb('0x5a')]===undefined)this[_0x41fb('0xb3')]();this[_0x41fb('0x79')][_0x41fb('0x5a')]=_0x39559b;},Game_System[_0x41fb('0x2e')][_0x41fb('0x121')]=function(){if(this[_0x41fb('0x79')]===undefined)this[_0x41fb('0xb3')]();if(this[_0x41fb('0x79')][_0x41fb('0xd4')]===undefined)this[_0x41fb('0xb3')]();return this['_MessageCoreSettings'][_0x41fb('0xd4')];},Game_System['prototype'][_0x41fb('0x239')]=function(_0x5eecbb){if(this[_0x41fb('0x79')]===undefined)this[_0x41fb('0xb3')]();if(this[_0x41fb('0x79')][_0x41fb('0xd4')]===undefined)this[_0x41fb('0xb3')]();this[_0x41fb('0x79')]['helpWordWrap']=_0x5eecbb;},Game_System[_0x41fb('0x2e')][_0x41fb('0xf9')]=function(){if(this['_MessageCoreSettings']===undefined)this[_0x41fb('0xb3')]();if(this[_0x41fb('0x79')][_0x41fb('0x19d')]===undefined)this[_0x41fb('0xb3')]();return this[_0x41fb('0x79')]['choiceLineHeight'];},Game_System[_0x41fb('0x2e')][_0x41fb('0x7d')]=function(_0x17582b){if(this[_0x41fb('0x79')]===undefined)this[_0x41fb('0xb3')]();if(this[_0x41fb('0x79')]['choiceLineHeight']===undefined)this[_0x41fb('0xb3')]();this['_MessageCoreSettings'][_0x41fb('0x19d')]=_0x17582b||0x1;},Game_System[_0x41fb('0x2e')][_0x41fb('0x18d')]=function(){if(this[_0x41fb('0x79')]===undefined)this[_0x41fb('0xb3')]();if(this[_0x41fb('0x79')][_0x41fb('0x129')]===undefined)this[_0x41fb('0xb3')]();return this[_0x41fb('0x79')][_0x41fb('0x129')];},Game_System[_0x41fb('0x2e')][_0x41fb('0xa6')]=function(_0x43bf9d){if(this[_0x41fb('0x79')]===undefined)this['initMessageCore']();if(this[_0x41fb('0x79')][_0x41fb('0x129')]===undefined)this[_0x41fb('0xb3')]();this[_0x41fb('0x79')][_0x41fb('0x129')]=_0x43bf9d||0x1;},Game_System[_0x41fb('0x2e')]['getChoiceListMaxColumns']=function(){if(this['_MessageCoreSettings']===undefined)this[_0x41fb('0xb3')]();if(this[_0x41fb('0x79')][_0x41fb('0x91')]===undefined)this[_0x41fb('0xb3')]();return this[_0x41fb('0x79')][_0x41fb('0x91')];},Game_System[_0x41fb('0x2e')]['setChoiceListMaxColumns']=function(_0x215787){if(this[_0x41fb('0x79')]===undefined)this[_0x41fb('0xb3')]();if(this['_MessageCoreSettings']['choiceCols']===undefined)this[_0x41fb('0xb3')]();this['_MessageCoreSettings'][_0x41fb('0x91')]=_0x215787||0x1;},Game_System[_0x41fb('0x2e')]['getChoiceListTextAlign']=function(){if(this[_0x41fb('0x79')]===undefined)this[_0x41fb('0xb3')]();if(this[_0x41fb('0x79')][_0x41fb('0xef')]===undefined)this[_0x41fb('0xb3')]();return this[_0x41fb('0x79')]['choiceTextAlign'];},Game_System[_0x41fb('0x2e')][_0x41fb('0x44')]=function(_0x1fb117){if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x41fb('0x79')][_0x41fb('0xef')]===undefined)this['initMessageCore']();this[_0x41fb('0x79')][_0x41fb('0xef')]=_0x1fb117[_0x41fb('0x172')]();},VisuMZ['MessageCore']['Game_Party_initialize']=Game_Party[_0x41fb('0x2e')][_0x41fb('0x1e6')],Game_Party[_0x41fb('0x2e')]['initialize']=function(){VisuMZ[_0x41fb('0x93')][_0x41fb('0x126')][_0x41fb('0x27')](this),this[_0x41fb('0xb3')]();},Game_Party[_0x41fb('0x2e')][_0x41fb('0xb3')]=function(){this['_lastGainedItemData']={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x41fb('0x2e')][_0x41fb('0x52')]=function(){if(this['_lastGainedItemData']===undefined)this[_0x41fb('0xb3')]();return this['_lastGainedItemData'];},Game_Party[_0x41fb('0x2e')][_0x41fb('0x65')]=function(_0x42795b,_0x44617f){if(this[_0x41fb('0x229')]===undefined)this[_0x41fb('0xb3')]();if(!_0x42795b)return;if(DataManager[_0x41fb('0x56')](_0x42795b)){if(_0x41fb('0x160')==='zpqWX'){function _0x1581be(){_0x263775[_0x41fb('0x1b3')](this[_0x41fb('0x11a')]()),this['_messageWindow'][_0x41fb('0x190')](),this[_0x41fb('0xe7')]();}}else this[_0x41fb('0x229')][_0x41fb('0x167')]=0x0;}else{if(DataManager[_0x41fb('0x237')](_0x42795b)){if(_0x41fb('0x46')!==_0x41fb('0x20f'))this[_0x41fb('0x229')][_0x41fb('0x167')]=0x1;else{function _0x6efa38(){for(const _0x10cfde of _0x4f7645[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x184')]){_0x2fff4b[_0x41fb('0x158')](_0x10cfde[_0x41fb('0x159')])&&(_0x46d58e=_0x5e6885[_0x41fb('0x174')](_0x10cfde[_0x41fb('0x159')],_0x10cfde[_0x41fb('0x8f')][_0x41fb('0x111')](this)),_0x5b49ac=this[_0x41fb('0x103')](_0xff86d3));}return _0xc628ca;}}}else DataManager[_0x41fb('0x1')](_0x42795b)&&(this[_0x41fb('0x229')][_0x41fb('0x167')]=0x2);}this['_lastGainedItemData']['id']=_0x42795b['id'],this['_lastGainedItemData'][_0x41fb('0x36')]=_0x44617f;},VisuMZ[_0x41fb('0x93')][_0x41fb('0x34')]=Game_Party[_0x41fb('0x2e')][_0x41fb('0x153')],Game_Party['prototype'][_0x41fb('0x153')]=function(_0x128c69,_0x216b9b,_0x17ad0a){VisuMZ[_0x41fb('0x93')][_0x41fb('0x34')][_0x41fb('0x27')](this,_0x128c69,_0x216b9b,_0x17ad0a);if(_0x216b9b>0x0){if('YYvMW'!==_0x41fb('0x1eb'))this[_0x41fb('0x65')](_0x128c69,_0x216b9b);else{function _0x24d54a(){if(this[_0x41fb('0x79')]===_0x27a359)this[_0x41fb('0xb3')]();if(this['_MessageCoreSettings'][_0x41fb('0xd6')]===_0x33cb0c)this['initMessageCore']();return this[_0x41fb('0x79')][_0x41fb('0xd6')];}}}},VisuMZ['MessageCore']['Game_Map_initialize']=Game_Map[_0x41fb('0x2e')][_0x41fb('0x1e6')],Game_Map['prototype'][_0x41fb('0x1e6')]=function(){VisuMZ['MessageCore'][_0x41fb('0xc3')]['call'](this),this[_0x41fb('0x136')]=[];},VisuMZ['MessageCore'][_0x41fb('0x1d')]=Game_Map['prototype'][_0x41fb('0xe4')],Game_Map[_0x41fb('0x2e')][_0x41fb('0xe4')]=function(){VisuMZ[_0x41fb('0x93')][_0x41fb('0x1d')][_0x41fb('0x27')](this),this[_0x41fb('0x136')]=[];},VisuMZ[_0x41fb('0x93')][_0x41fb('0x87')]=Game_Map[_0x41fb('0x2e')][_0x41fb('0x177')],Game_Map[_0x41fb('0x2e')][_0x41fb('0x177')]=function(){VisuMZ[_0x41fb('0x93')][_0x41fb('0x87')][_0x41fb('0x27')](this),this[_0x41fb('0x1ba')]();},Game_Map[_0x41fb('0x2e')][_0x41fb('0x10e')]=function(_0x65a4f9){this[_0x41fb('0x136')]=this[_0x41fb('0x136')]||[];const _0x36dca6=this[_0x41fb('0x1db')][_0x41fb('0xde')],_0x1a8ee1=new Game_MessageCommonEvent(_0x65a4f9,_0x36dca6);this[_0x41fb('0x136')][_0x41fb('0x213')](_0x1a8ee1);},Game_Map[_0x41fb('0x2e')][_0x41fb('0x1ba')]=function(){this['_messageCommonEvents']=this[_0x41fb('0x136')]||[];for(const _0x6e9b3d of this[_0x41fb('0x136')]){if('bHnGq'!==_0x41fb('0x16c')){if(!_0x6e9b3d[_0x41fb('0x1db')])this[_0x41fb('0x136')][_0x41fb('0xf5')](_0x6e9b3d);else{if('hGTDj'===_0x41fb('0x1ae'))_0x6e9b3d[_0x41fb('0x16f')]();else{function _0x3b17c9(){this['_moveTargetX']=this['x']+_0x4446e5,this[_0x41fb('0x202')]=this['y']+_0x40efd5,this[_0x41fb('0x17f')]=this[_0x41fb('0x97')]+(_0x22c1ac||0x0),this['_moveTargetHeight']=this[_0x41fb('0x1ea')]+(_0x1f0d02||0x0),this[_0x41fb('0x101')]=_0x59b480||0x1;if(this[_0x41fb('0x101')]<=0x0)this[_0x41fb('0x101')]=0x1;this['_wholeMoveDuration']=this[_0x41fb('0x101')],this[_0x41fb('0xfc')]=_0x22055d||0x0;}}}}else{function _0x3f3ffe(){const _0x46771c=_0xc752fa[_0x41fb('0x2d')]();let _0x487a56=0x0;for(const _0x76d534 of _0x46771c){if(this[_0x41fb('0x6a')](_0x76d534)){const _0x57406c=_0x76d534,_0x4f1102=this[_0x41fb('0x180')](_0x76d534);this[_0x41fb('0x81')](_0x57406c,_0x41fb('0xc6'),_0x4f1102,_0x487a56);}_0x487a56++;}}}}},Game_Interpreter['prototype'][_0x41fb('0x168')]=function(_0x2f68b2){if($gameMessage[_0x41fb('0xf3')]())return![];return this['prepareShowTextCommand'](_0x2f68b2),this['addContinuousShowTextCommands'](_0x2f68b2),this[_0x41fb('0x4')](_0x2f68b2),this[_0x41fb('0x138')](_0x41fb('0x18b')),!![];},Game_Interpreter['prototype']['prepareShowTextCommand']=function(_0x25fdd3){$gameMessage[_0x41fb('0xf0')](_0x25fdd3[0x0],_0x25fdd3[0x1]),$gameMessage[_0x41fb('0x4b')](_0x25fdd3[0x2]),$gameMessage['setPositionType'](_0x25fdd3[0x3]),$gameMessage['setSpeakerName'](_0x25fdd3[0x4]);},Game_Interpreter['prototype'][_0x41fb('0x189')]=function(_0x57a8b9){while(this[_0x41fb('0x54')]()){this[_0x41fb('0x234')]++;this[_0x41fb('0xee')]()[_0x41fb('0x1f2')]===0x191&&$gameMessage['add'](this[_0x41fb('0xee')]()[_0x41fb('0x124')][0x0]);if(this[_0x41fb('0x29')]())break;}},Game_Interpreter[_0x41fb('0x2e')][_0x41fb('0x54')]=function(){if(this[_0x41fb('0x1ef')]()===0x65&&$gameSystem[_0x41fb('0x154')]()>0x4)return!![];else{if(_0x41fb('0x11b')!==_0x41fb('0x11b')){function _0x42074e(){return _0xdaf9a0=this['convertTextMacros'](_0x40585f),_0x3172a6=this[_0x41fb('0x1d4')](_0x1fa4b5),_0x2d9eff=this['convertVariableEscapeCharacters'](_0x45eede),_0x55edae=this['preConvertEscapeCharacters'](_0x1c4f39),_0x277659=this[_0x41fb('0x114')](_0x39462a),_0x40a46d=this[_0x41fb('0xd')](_0x5c01b0),_0x189f11=this[_0x41fb('0x12e')](_0x1ff69c),_0x6e3522=this[_0x41fb('0x10a')](_0x200c40),_0x418746=this[_0x41fb('0xd9')](_0x172d31),_0x193fbf=this[_0x41fb('0x17d')](_0x547c98),_0x39e61c=this[_0x41fb('0x28')](_0x123b85),_0x105eea=this['postConvertEscapeCharacters'](_0x3195e0),_0x461fc4=this[_0x41fb('0x103')](_0x47b6e1),_0x38a234=this['processAutoColorWords'](_0x2e949a),_0x412682=this[_0x41fb('0x128')](_0x69c119),_0xd4c18e;}}else return this[_0x41fb('0x1ef')]()===0x191;}},Game_Interpreter['prototype'][_0x41fb('0x29')]=function(){return $gameMessage[_0x41fb('0x1aa')][_0x41fb('0x2b')]>=$gameSystem[_0x41fb('0x154')]()&&this[_0x41fb('0x1ef')]()!==0x191;},Game_Interpreter['prototype'][_0x41fb('0x4')]=function(_0x2f8ddb){switch(this['nextEventCode']()){case 0x66:this[_0x41fb('0x234')]++,this[_0x41fb('0x163')](this['currentCommand']()[_0x41fb('0x124')]);break;case 0x67:this[_0x41fb('0x234')]++,this[_0x41fb('0x1b6')](this[_0x41fb('0xee')]()[_0x41fb('0x124')]);break;case 0x68:this[_0x41fb('0x234')]++,this[_0x41fb('0x211')](this['currentCommand']()[_0x41fb('0x124')]);break;}},VisuMZ[_0x41fb('0x93')][_0x41fb('0x148')]=Game_Interpreter[_0x41fb('0x2e')][_0x41fb('0x163')],Game_Interpreter[_0x41fb('0x2e')][_0x41fb('0x163')]=function(_0xde94a1){_0xde94a1=this[_0x41fb('0x5f')](),VisuMZ[_0x41fb('0x93')][_0x41fb('0x148')][_0x41fb('0x27')](this,_0xde94a1);},Game_Interpreter[_0x41fb('0x2e')]['addContinuousShowChoices']=function(){const _0x2dcf80=this[_0x41fb('0x234')],_0x46d220=[];let _0x27fcf4=0x0;this[_0x41fb('0x234')]++;while(this[_0x41fb('0x234')]<this['_list']['length']){if(this[_0x41fb('0xee')]()[_0x41fb('0x14e')]===this[_0x41fb('0xe9')]){if('hUORx'!==_0x41fb('0x204')){if(this[_0x41fb('0xee')]()[_0x41fb('0x1f2')]===0x194&&this['nextEventCode']()!==0x66)break;else{if(this[_0x41fb('0xee')]()[_0x41fb('0x1f2')]===0x66)this[_0x41fb('0x63')](_0x27fcf4,this[_0x41fb('0xee')](),_0x2dcf80),this['_index']-=0x2;else this[_0x41fb('0xee')]()[_0x41fb('0x1f2')]===0x192&&(this[_0x41fb('0xee')]()[_0x41fb('0x124')][0x0]=_0x27fcf4,_0x27fcf4++);}}else{function _0x5d4a37(){return _0x1a7ee1['index']+=_0x450d93[0x0]['length'],_0x595297(_0x69b987[0x0][_0x41fb('0x100')](0x1,_0x5e1d92[0x0][_0x41fb('0x2b')]-0x1));}}}this[_0x41fb('0x234')]++;}return this[_0x41fb('0x234')]=_0x2dcf80,this[_0x41fb('0xee')]()[_0x41fb('0x124')];},Game_Interpreter['prototype']['adjustShowChoiceExtension']=function(_0x5d988c,_0x53c824,_0x4b9d34){this[_0x41fb('0x1b8')](_0x5d988c,_0x53c824,_0x4b9d34),this[_0x41fb('0x192')](_0x5d988c,_0x53c824,_0x4b9d34),this[_0x41fb('0x133')](_0x53c824,_0x4b9d34);},Game_Interpreter[_0x41fb('0x2e')][_0x41fb('0x1b8')]=function(_0x405e8b,_0x1c2c5d,_0xafc17f){if(_0x1c2c5d[_0x41fb('0x124')][0x2]<0x0)return;const _0x2db90c=_0x1c2c5d[_0x41fb('0x124')][0x2]+_0x405e8b;this[_0x41fb('0x23b')][_0xafc17f][_0x41fb('0x124')][0x2]=_0x2db90c;},Game_Interpreter['prototype'][_0x41fb('0x192')]=function(_0x1e2c58,_0x406a24,_0x411cb0){if(_0x406a24[_0x41fb('0x124')][0x1]>=0x0){var _0x3e7684=_0x406a24[_0x41fb('0x124')][0x1]+_0x1e2c58;this[_0x41fb('0x23b')][_0x411cb0][_0x41fb('0x124')][0x1]=_0x3e7684;}else _0x406a24[_0x41fb('0x124')][0x1]===-0x2&&(this[_0x41fb('0x23b')][_0x411cb0][_0x41fb('0x124')][0x1]=_0x406a24[_0x41fb('0x124')][0x1]);},Game_Interpreter[_0x41fb('0x2e')][_0x41fb('0x133')]=function(_0x492fce,_0xfdde62){for(const _0x3bd64b of _0x492fce[_0x41fb('0x124')][0x0]){this['_list'][_0xfdde62][_0x41fb('0x124')][0x0][_0x41fb('0x213')](_0x3bd64b);}this['_list'][_0x41fb('0x17b')](this[_0x41fb('0x234')]-0x1,0x2);};function Game_MessageCommonEvent(){this[_0x41fb('0x1e6')](...arguments);}Game_MessageCommonEvent[_0x41fb('0x2e')][_0x41fb('0x1e6')]=function(_0x3c0b39,_0x522bf8){this[_0x41fb('0x215')]=_0x3c0b39,this[_0x41fb('0xde')]=_0x522bf8||0x0,this['refresh']();},Game_MessageCommonEvent['prototype'][_0x41fb('0x18f')]=function(){return $dataCommonEvents[this[_0x41fb('0x215')]];},Game_MessageCommonEvent[_0x41fb('0x2e')][_0x41fb('0x86')]=function(){return this[_0x41fb('0x18f')]()['list'];},Game_MessageCommonEvent[_0x41fb('0x2e')][_0x41fb('0x5c')]=function(){this[_0x41fb('0x1db')]=new Game_Interpreter(),this[_0x41fb('0x1db')][_0x41fb('0x1a6')](this[_0x41fb('0x86')](),this[_0x41fb('0xde')]);},Game_MessageCommonEvent[_0x41fb('0x2e')][_0x41fb('0x16f')]=function(){this[_0x41fb('0x1db')]&&(this[_0x41fb('0x1db')][_0x41fb('0xc5')]()?this[_0x41fb('0x1db')][_0x41fb('0x16f')]():this[_0x41fb('0x1c1')]());},Game_MessageCommonEvent[_0x41fb('0x2e')]['clear']=function(){this['_interpreter']=null;},Scene_Message[_0x41fb('0x2e')][_0x41fb('0x220')]=function(){const _0x4ebe33=Math[_0x41fb('0xa1')](Graphics[_0x41fb('0x97')],$gameSystem[_0x41fb('0x7c')]()),_0x5cf40a=$gameSystem[_0x41fb('0x154')](),_0x30945c=this['calcWindowHeight'](_0x5cf40a,![]),_0x1efdb3=(Graphics[_0x41fb('0x3b')]-_0x4ebe33)/0x2,_0x566683=0x0;return new Rectangle(_0x1efdb3,_0x566683,_0x4ebe33,_0x30945c);},VisuMZ[_0x41fb('0x93')]['Scene_Options_maxCommands']=Scene_Options[_0x41fb('0x2e')][_0x41fb('0x1f7')],Scene_Options[_0x41fb('0x2e')][_0x41fb('0x1f7')]=function(){let _0x576650=VisuMZ[_0x41fb('0x93')][_0x41fb('0xd1')]['call'](this);const _0x16b1ff=VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')];if(_0x16b1ff[_0x41fb('0x37')][_0x41fb('0x1e9')]&&_0x16b1ff[_0x41fb('0x37')][_0x41fb('0x12')])_0x576650++;return _0x576650;},VisuMZ[_0x41fb('0x93')][_0x41fb('0x107')]=Window_Base[_0x41fb('0x2e')]['initialize'],Window_Base[_0x41fb('0x2e')]['initialize']=function(_0x5bd130){this[_0x41fb('0xb3')](_0x5bd130),VisuMZ[_0x41fb('0x93')][_0x41fb('0x107')][_0x41fb('0x27')](this,_0x5bd130);},Window_Base[_0x41fb('0x2e')][_0x41fb('0xb3')]=function(_0x2e9d2f){this[_0x41fb('0x1ac')](),this[_0x41fb('0x238')](),this[_0x41fb('0xb1')](_0x2e9d2f);},Window_Base[_0x41fb('0x2e')][_0x41fb('0x1ac')]=function(){this[_0x41fb('0x82')]('default');},Window_Base['prototype']['setTextAlignment']=function(_0x1e18ce){this[_0x41fb('0x151')]=_0x1e18ce;},Window_Base[_0x41fb('0x2e')][_0x41fb('0x4a')]=function(){return this[_0x41fb('0x151')];},VisuMZ['MessageCore'][_0x41fb('0x162')]=Window_Base['prototype']['processAllText'],Window_Base[_0x41fb('0x2e')][_0x41fb('0xe3')]=function(_0xf47487){VisuMZ[_0x41fb('0x93')][_0x41fb('0x162')]['call'](this,_0xf47487);if(_0xf47487['drawing'])this['setTextAlignment'](_0x41fb('0x125'));},Window_Base[_0x41fb('0x2e')]['resetWordWrap']=function(){this[_0x41fb('0x145')](![]);},Window_Base[_0x41fb('0x2e')][_0x41fb('0xba')]=function(){return this[_0x41fb('0x31')];},Window_Base[_0x41fb('0x2e')]['setWordWrap']=function(_0x27c53b){return this[_0x41fb('0x31')]=_0x27c53b,'';},Window_Base[_0x41fb('0x2e')]['registerResetRect']=function(_0x1e1fbb){this[_0x41fb('0x137')]=JsonEx[_0x41fb('0x102')](_0x1e1fbb);},Window_Base[_0x41fb('0x2e')][_0x41fb('0x1e8')]=function(){this['contents']['fontFace']=$gameSystem[_0x41fb('0xa4')](),this[_0x41fb('0x197')][_0x41fb('0x1d3')]=$gameSystem[_0x41fb('0xe0')](),this[_0x41fb('0x197')][_0x41fb('0x11c')]=![],this[_0x41fb('0x197')][_0x41fb('0x1ed')]=![],this[_0x41fb('0x55')]();},Window_Base[_0x41fb('0x2e')][_0x41fb('0x55')]=function(){this[_0x41fb('0x24')](ColorManager['normalColor']()),this[_0x41fb('0x1d7')](ColorManager[_0x41fb('0x12f')]()),this[_0x41fb('0x197')][_0x41fb('0xfd')]=0x3,this['setColorLock'](![]);},Window_Base[_0x41fb('0x2e')][_0x41fb('0x142')]=function(_0x2375c1){this[_0x41fb('0x16')]=_0x2375c1;},Window_Base[_0x41fb('0x2e')][_0x41fb('0x1d5')]=function(){return this[_0x41fb('0x16')];},Window_Base[_0x41fb('0x2e')][_0x41fb('0x15b')]=function(){return![];},Window_Base[_0x41fb('0x2e')][_0x41fb('0x14d')]=function(){const _0xcbd3a8=[_0x41fb('0x6f'),_0x41fb('0x1d3'),'fontBold',_0x41fb('0x1ed'),_0x41fb('0x4e'),_0x41fb('0x166'),_0x41fb('0xfd'),_0x41fb('0x15e')];let _0x545aa6={};for(const _0x471ec9 of _0xcbd3a8){_0x545aa6[_0x471ec9]=this[_0x41fb('0x197')][_0x471ec9];}return _0x545aa6;},Window_Base[_0x41fb('0x2e')][_0x41fb('0x10d')]=function(_0x4e69f5){for(const _0x2ac90f in _0x4e69f5){if(_0x41fb('0x135')!==_0x41fb('0x135')){function _0x527181(){if(!_0x361045||!_0x65c1ac)return-0x1;return _0x4fae58[_0x41fb('0x3d')][_0x41fb('0x2b')]-_0x1f03e7[_0x41fb('0x3d')]['length'];}}else this[_0x41fb('0x197')][_0x2ac90f]=_0x4e69f5[_0x2ac90f];}},VisuMZ['MessageCore']['Window_Base_update']=Window_Base[_0x41fb('0x2e')]['update'],Window_Base[_0x41fb('0x2e')][_0x41fb('0x16f')]=function(){VisuMZ[_0x41fb('0x93')][_0x41fb('0xd2')][_0x41fb('0x27')](this),this['updateMove']();},Window_Base[_0x41fb('0x2e')][_0x41fb('0x75')]=function(){return![];},Window_Base['prototype'][_0x41fb('0x233')]=function(){if(this[_0x41fb('0x101')]>0x0){if('grBDz'!==_0x41fb('0x5'))this[_0x41fb('0x75')]()&&(this['x']=this['applyMoveEasing'](this['x'],this[_0x41fb('0x183')]),this['y']=this[_0x41fb('0xa7')](this['y'],this[_0x41fb('0x202')]),this[_0x41fb('0x97')]=this[_0x41fb('0xa7')](this[_0x41fb('0x97')],this[_0x41fb('0x17f')]),this[_0x41fb('0x1ea')]=this['applyMoveEasing'](this[_0x41fb('0x1ea')],this[_0x41fb('0x18e')]),this[_0x41fb('0x10b')]()),this[_0x41fb('0x101')]--;else{function _0x4b9933(){_0x2e3d3d[_0x41fb('0x93')][_0x41fb('0xd0')][_0x41fb('0x27')](this,_0x1db9ed,_0x10200b);}}}},Window_Base[_0x41fb('0x2e')][_0x41fb('0x10b')]=function(){this[_0x41fb('0x97')]=Math[_0x41fb('0xa1')](this[_0x41fb('0x97')],Graphics[_0x41fb('0x97')]),this['height']=Math[_0x41fb('0xa1')](this[_0x41fb('0x1ea')],Graphics[_0x41fb('0x1ea')]);const _0x2c895e=-(Math[_0x41fb('0x169')](Graphics['width']-Graphics[_0x41fb('0x3b')])/0x2),_0x38dce8=_0x2c895e+Graphics[_0x41fb('0x97')]-this['width'],_0x1436ea=-(Math[_0x41fb('0x169')](Graphics[_0x41fb('0x1ea')]-Graphics[_0x41fb('0x198')])/0x2),_0x1e1ee2=_0x1436ea+Graphics[_0x41fb('0x1ea')]-this[_0x41fb('0x1ea')];this['x']=this['x'][_0x41fb('0x1b0')](_0x2c895e,_0x38dce8),this['y']=this['y'][_0x41fb('0x1b0')](_0x1436ea,_0x1e1ee2);},Window_Base[_0x41fb('0x2e')][_0x41fb('0xa7')]=function(_0x28d4f5,_0x1d9375){const _0x4d8683=this[_0x41fb('0x101')],_0x557feb=this[_0x41fb('0x74')],_0x44c05d=this[_0x41fb('0x231')]((_0x557feb-_0x4d8683)/_0x557feb),_0x17ee7b=this[_0x41fb('0x231')]((_0x557feb-_0x4d8683+0x1)/_0x557feb),_0x4b03a2=(_0x28d4f5-_0x1d9375*_0x44c05d)/(0x1-_0x44c05d);return _0x4b03a2+(_0x1d9375-_0x4b03a2)*_0x17ee7b;},Window_Base[_0x41fb('0x2e')][_0x41fb('0x231')]=function(_0x8ae50c){const _0x1b180f=0x2;switch(this[_0x41fb('0xfc')]){case 0x0:return _0x8ae50c;case 0x1:return this['easeIn'](_0x8ae50c,_0x1b180f);case 0x2:return this[_0x41fb('0x33')](_0x8ae50c,_0x1b180f);case 0x3:return this['easeInOut'](_0x8ae50c,_0x1b180f);default:if(Imported['VisuMZ_0_CoreEngine']){if(_0x41fb('0xd8')===_0x41fb('0x12c')){function _0x4070d1(){const _0x37d79a=this[_0x41fb('0x15f')](_0x347104,0x0,0x0,0x0),_0x4486ae=this[_0x41fb('0x14d')]();return _0x37d79a['drawing']=![],this[_0x41fb('0x145')](![]),this[_0x41fb('0xe3')](_0x37d79a),this[_0x41fb('0x145')](!![]),this['returnPreservedFontSettings'](_0x4486ae),{'width':_0x37d79a[_0x41fb('0x3e')],'height':_0x37d79a['outputHeight']};}}else return VisuMZ[_0x41fb('0xa7')](_0x8ae50c,this[_0x41fb('0xfc')]);}else{if(_0x41fb('0xf8')!==_0x41fb('0x23a'))return _0x8ae50c;else{function _0x1ee44e(){const _0x167518=_0x2e6ee7[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x1f8')];let _0x1cd95a=0x0;if(_0x17e704===_0x18fa69)_0x1cd95a=_0x167518[_0x41fb('0x92')];if(_0x42873f===_0x5d710e)_0x1cd95a=_0x167518[_0x41fb('0x11d')];if(_0x320ba7===_0x6fb065)_0x1cd95a=_0x167518[_0x41fb('0x1ca')];if(_0x4a68bb===_0x259d5e)_0x1cd95a=_0x167518['Items'];if(_0x3fc3c3===_0x33919c)_0x1cd95a=_0x167518[_0x41fb('0x1be')];if(_0x10efd7===_0x280207)_0x1cd95a=_0x167518[_0x41fb('0x1e4')];if(_0x4ed63c===_0x133490)_0x1cd95a=_0x167518[_0x41fb('0x18c')];if(_0x291817===_0xfe5e85)_0x1cd95a=_0x167518['States'];return _0x1cd95a>0x0&&(_0x3c83f4=_0x41fb('0x15')[_0x41fb('0x19')](_0x1cd95a,_0x44f81e)),_0x5787a8;}}}}},Window_Base[_0x41fb('0x2e')][_0x41fb('0x1d8')]=function(_0xd83e50,_0x5aa56e,_0x141f83,_0x3c35e2,_0xd4452f,_0x3d3700){this['_moveTargetX']=_0xd83e50,this[_0x41fb('0x202')]=_0x5aa56e,this[_0x41fb('0x17f')]=_0x141f83||this[_0x41fb('0x97')],this[_0x41fb('0x18e')]=_0x3c35e2||this[_0x41fb('0x1ea')],this[_0x41fb('0x101')]=_0xd4452f||0x1;if(this['_moveDuration']<=0x0)this[_0x41fb('0x101')]=0x1;this['_wholeMoveDuration']=this[_0x41fb('0x101')],this[_0x41fb('0xfc')]=_0x3d3700||0x0;},Window_Base[_0x41fb('0x2e')][_0x41fb('0x13')]=function(_0x57a418,_0x1ecafa,_0x2c6058,_0x2d7144,_0x518646,_0x239277){this[_0x41fb('0x183')]=this['x']+_0x57a418,this[_0x41fb('0x202')]=this['y']+_0x1ecafa,this['_moveTargetWidth']=this[_0x41fb('0x97')]+(_0x2c6058||0x0),this['_moveTargetHeight']=this['height']+(_0x2d7144||0x0),this[_0x41fb('0x101')]=_0x518646||0x1;if(this[_0x41fb('0x101')]<=0x0)this[_0x41fb('0x101')]=0x1;this['_wholeMoveDuration']=this[_0x41fb('0x101')],this[_0x41fb('0xfc')]=_0x239277||0x0;},Window_Base['prototype']['resetRect']=function(_0x54fa17,_0x21d97c){this[_0x41fb('0x1d8')](this['_resetRect']['x'],this[_0x41fb('0x137')]['y'],this[_0x41fb('0x137')][_0x41fb('0x97')],this['_resetRect'][_0x41fb('0x1ea')],_0x54fa17,_0x21d97c);},VisuMZ[_0x41fb('0x93')][_0x41fb('0x1a1')]=Window_Base[_0x41fb('0x2e')][_0x41fb('0x24')],Window_Base[_0x41fb('0x2e')][_0x41fb('0x24')]=function(_0x5016c8){if(this[_0x41fb('0x1d5')]())return;_0x5016c8=_0x5016c8[_0x41fb('0x174')](/\,/g,''),this[_0x41fb('0x221')]=this['_textColorStack']||[],this[_0x41fb('0x221')]['unshift'](this['contents'][_0x41fb('0x4e')]),VisuMZ[_0x41fb('0x93')][_0x41fb('0x1a1')][_0x41fb('0x27')](this,_0x5016c8);},Window_Base[_0x41fb('0x2e')]['processPreviousColor']=function(_0x5639dc){this['obtainEscapeParam'](_0x5639dc);if(this['isColorLocked']())return;_0x5639dc[_0x41fb('0x88')]&&(this[_0x41fb('0x221')]=this[_0x41fb('0x221')]||[],this[_0x41fb('0x197')]['textColor']=this[_0x41fb('0x221')][_0x41fb('0xb0')]()||ColorManager[_0x41fb('0xcb')]());},Window_Base[_0x41fb('0x2e')][_0x41fb('0x161')]=function(_0x50d832){return _0x50d832=this[_0x41fb('0x109')](_0x50d832),_0x50d832=this[_0x41fb('0x1d4')](_0x50d832),_0x50d832=this['convertVariableEscapeCharacters'](_0x50d832),_0x50d832=this[_0x41fb('0x8c')](_0x50d832),_0x50d832=this[_0x41fb('0x114')](_0x50d832),_0x50d832=this[_0x41fb('0xd')](_0x50d832),_0x50d832=this[_0x41fb('0x12e')](_0x50d832),_0x50d832=this['convertLockColorsEscapeCharacters'](_0x50d832),_0x50d832=this[_0x41fb('0xd9')](_0x50d832),_0x50d832=this[_0x41fb('0x17d')](_0x50d832),_0x50d832=this[_0x41fb('0x28')](_0x50d832),_0x50d832=this[_0x41fb('0x123')](_0x50d832),_0x50d832=this[_0x41fb('0x103')](_0x50d832),_0x50d832=this[_0x41fb('0x146')](_0x50d832),_0x50d832=this['prepareWordWrapEscapeCharacters'](_0x50d832),_0x50d832;},Window_Base[_0x41fb('0x2e')][_0x41fb('0x109')]=function(_0x5316bb){for(const _0x4643c8 of VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x84')]){_0x5316bb['match'](_0x4643c8[_0x41fb('0x159')])&&(_0x5316bb=_0x5316bb[_0x41fb('0x174')](_0x4643c8[_0x41fb('0x159')],_0x4643c8['textCodeResult'][_0x41fb('0x111')](this)));}return _0x5316bb;},Window_Base[_0x41fb('0x2e')]['convertBackslashCharacters']=function(_0x143428){return _0x143428=_0x143428[_0x41fb('0x174')](/\\/g,''),_0x143428=_0x143428[_0x41fb('0x174')](/\x1b\x1b/g,'\x5c'),_0x143428;},Window_Base['prototype']['convertVariableEscapeCharacters']=function(_0x158e58){for(;;){if('qztou'!=='OEXAq'){if(_0x158e58[_0x41fb('0x158')](/\\V\[(\d+)\]/gi)){if('SnDmr'!=='SnDmr'){function _0x57176a(){this[_0x41fb('0x139')]=0x0,_0x475609[_0x41fb('0x93')][_0x41fb('0xbe')][_0x41fb('0x27')](this);}}else _0x158e58=_0x158e58[_0x41fb('0x174')](/\\V\[(\d+)\]/gi,(_0x1e648c,_0x40d841)=>this['convertBackslashCharacters'](String($gameVariables[_0x41fb('0x179')](parseInt(_0x40d841)))));}else{if(_0x158e58[_0x41fb('0x158')](/\x1bV\[(\d+)\]/gi))_0x158e58=_0x158e58[_0x41fb('0x174')](/\x1bV\[(\d+)\]/gi,(_0x21faec,_0x293789)=>this[_0x41fb('0x1d4')](String($gameVariables['value'](parseInt(_0x293789)))));else break;}}else{function _0x3ff8ea(){return _0x2aa12d[_0x41fb('0xf9')]();}}}return _0x158e58;},Window_Base[_0x41fb('0x2e')][_0x41fb('0x8c')]=function(_0x2377ac){return this[_0x41fb('0x1cc')](),_0x2377ac;},Window_Base[_0x41fb('0x2e')][_0x41fb('0x123')]=function(_0x491225){return _0x491225;},Window_Base[_0x41fb('0x2e')][_0x41fb('0x114')]=function(_0xd7ecbf){return _0xd7ecbf=_0xd7ecbf['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/i,''),_0xd7ecbf=_0xd7ecbf[_0x41fb('0x174')](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0xd7ecbf=_0xd7ecbf['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i,''),_0xd7ecbf;},Window_Base[_0x41fb('0x2e')][_0x41fb('0xd')]=function(_0x534620){return _0x534620=_0x534620[_0x41fb('0x174')](/<B>/gi,'BOLD[1]'),_0x534620=_0x534620[_0x41fb('0x174')](/<\/B>/gi,_0x41fb('0x8e')),_0x534620=_0x534620[_0x41fb('0x174')](/<I>/gi,_0x41fb('0xb6')),_0x534620=_0x534620[_0x41fb('0x174')](/<\/I>/gi,_0x41fb('0xb5')),_0x534620;},Window_Base[_0x41fb('0x2e')][_0x41fb('0x12e')]=function(_0x3a8955){return _0x3a8955=_0x3a8955[_0x41fb('0x174')](/<LEFT>/gi,_0x41fb('0xe5')),_0x3a8955=_0x3a8955[_0x41fb('0x174')](/<\/LEFT>/gi,'TEXTALIGNMENT[0]'),_0x3a8955=_0x3a8955[_0x41fb('0x174')](/<CENTER>/gi,_0x41fb('0x21c')),_0x3a8955=_0x3a8955[_0x41fb('0x174')](/<\/CENTER>/gi,_0x41fb('0x227')),_0x3a8955=_0x3a8955[_0x41fb('0x174')](/<RIGHT>/gi,_0x41fb('0x112')),_0x3a8955=_0x3a8955[_0x41fb('0x174')](/<\/RIGHT>/gi,'TEXTALIGNMENT[0]'),_0x3a8955;},Window_Base['prototype'][_0x41fb('0x10a')]=function(_0x3033ed){return _0x3033ed=_0x3033ed['replace'](/<COLORLOCK>/gi,_0x41fb('0x8d')),_0x3033ed=_0x3033ed['replace'](/<\/COLORLOCK>/gi,_0x41fb('0x59')),_0x3033ed;},Window_Base[_0x41fb('0x2e')][_0x41fb('0xd9')]=function(_0x1bcc0a){return _0x1bcc0a=_0x1bcc0a[_0x41fb('0x174')](/\x1bN\[(\d+)\]/gi,(_0x1d414c,_0x2a48e0)=>this[_0x41fb('0x10c')](parseInt(_0x2a48e0))),_0x1bcc0a=_0x1bcc0a[_0x41fb('0x174')](/\x1bP\[(\d+)\]/gi,(_0x1a4502,_0xaea6e7)=>this[_0x41fb('0xa0')](parseInt(_0xaea6e7))),_0x1bcc0a=_0x1bcc0a['replace'](/\x1bG/gi,TextManager[_0x41fb('0x19c')]),_0x1bcc0a;},Window_Base['prototype'][_0x41fb('0x17d')]=function(_0x3be299){for(const _0x3298e5 of VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x73')]){if('saPqC'==='Olcon'){function _0x29ada3(){_0x5af397[_0x41fb('0x222')](_0x4d0a48,_0x3c9761);const _0x3bf54e=_0x3b2616['Rows']||_0x29c4f2[_0x41fb('0x154')]()||0x1,_0x3a379e=_0x4fcac3[_0x41fb('0x157')]||_0x1ffe3b[_0x41fb('0x7c')]()||0x1;_0x58fbf5[_0x41fb('0xeb')]=_0x2f82ff[_0x41fb('0x76')]||![];const _0x375480=_0x2eabea[_0x41fb('0xc9')][_0x41fb('0x172')]();_0x7324c[_0x41fb('0xe6')](_0x3bf54e),_0x10d0bd[_0x41fb('0xc7')](_0x3a379e),[_0x41fb('0x1c3'),'false'][_0x41fb('0xd3')](_0x375480)&&_0x35212b['setMessageWindowWordWrap'](_0x12b2db(_0x375480));}}else _0x3be299[_0x41fb('0x158')](_0x3298e5[_0x41fb('0x159')])&&(_0x3be299=_0x3be299[_0x41fb('0x174')](_0x3298e5[_0x41fb('0x159')],_0x3298e5[_0x41fb('0x8f')]),_0x3be299=this[_0x41fb('0x103')](_0x3be299));}return _0x3be299;},Window_Base['prototype'][_0x41fb('0x28')]=function(_0x1db43f){for(const _0x2e97ba of VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x184')]){if(_0x1db43f[_0x41fb('0x158')](_0x2e97ba['textCodeCheck'])){if(_0x41fb('0x9a')!==_0x41fb('0x9a')){function _0x5b602d(){if(!_0x5d1dd0[_0x41fb('0x179')](_0x50509f))return![];}}else _0x1db43f=_0x1db43f[_0x41fb('0x174')](_0x2e97ba['textCodeCheck'],_0x2e97ba[_0x41fb('0x8f')][_0x41fb('0x111')](this)),_0x1db43f=this[_0x41fb('0x103')](_0x1db43f);}}return _0x1db43f;},Window_Base[_0x41fb('0x2e')][_0x41fb('0x10c')]=function(_0x5aeb16){const _0x3a8ff3=_0x5aeb16>=0x1?$gameActors[_0x41fb('0x186')](_0x5aeb16):null,_0x1275c0=_0x3a8ff3?_0x3a8ff3['name']():'',_0x168081=VisuMZ['MessageCore'][_0x41fb('0x15d')][_0x41fb('0x1f8')][_0x41fb('0x92')];return this['isAutoColorAffected']()&&_0x168081!==0x0?_0x41fb('0x15')[_0x41fb('0x19')](_0x168081,_0x1275c0):_0x1275c0;},Window_Base[_0x41fb('0x2e')][_0x41fb('0xa0')]=function(_0x2f5610){const _0x4c3013=_0x2f5610>=0x1?$gameParty[_0x41fb('0x6c')]()[_0x2f5610-0x1]:null,_0x4cfa07=_0x4c3013?_0x4c3013['name']():'',_0x10a9c5=VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x1f8')][_0x41fb('0x92')];return this['isAutoColorAffected']()&&_0x10a9c5!==0x0?_0x41fb('0x15')[_0x41fb('0x19')](_0x10a9c5,_0x4cfa07):_0x4cfa07;},Window_Base[_0x41fb('0x2e')]['processAutoColorWords']=function(_0x221bd5){return this[_0x41fb('0x15b')]()&&(_0x221bd5=this['processStoredAutoColorChanges'](_0x221bd5),_0x221bd5=this[_0x41fb('0x3f')](_0x221bd5)),_0x221bd5;},Window_Base['prototype'][_0x41fb('0x35')]=function(_0x27c107){for(autoColor of VisuMZ[_0x41fb('0x93')][_0x41fb('0x1b4')]){_0x27c107=_0x27c107[_0x41fb('0x174')](autoColor[0x0],autoColor[0x1]);}return _0x27c107;},Window_Base['prototype'][_0x41fb('0x7f')]=function(){this[_0x41fb('0x1e0')]=[];},Window_Base['prototype'][_0x41fb('0x1cc')]=function(){this[_0x41fb('0x7f')]();const _0x61ba91=VisuMZ['MessageCore'][_0x41fb('0x15d')][_0x41fb('0x1f8')],_0x3c6943=_0x61ba91['Actors'];if(_0x3c6943<=0x0)return;for(const _0x553cf5 of $gameActors[_0x41fb('0x80')]){if(_0x41fb('0x206')===_0x41fb('0x106')){function _0x372640(){_0x476e20[_0x41fb('0x93')][_0x41fb('0x1e3')]['call'](this),this['initMessageCore']();}}else{if(!_0x553cf5)continue;const _0x50958b=_0x553cf5['name']();if(_0x50958b[_0x41fb('0x22d')]()['length']<=0x0)continue;if(_0x50958b[_0x41fb('0x158')](/-----/i))continue;let _0x59da06=VisuMZ[_0x41fb('0x93')][_0x41fb('0x1f6')](_0x50958b);const _0x4aecca=new RegExp('\x5cb'+_0x59da06+'\x5cb','g'),_0x5cf6da=_0x41fb('0x15')[_0x41fb('0x19')](_0x3c6943,_0x50958b);this[_0x41fb('0x1e0')]['push']([_0x4aecca,_0x5cf6da]);}}},Window_Base[_0x41fb('0x2e')][_0x41fb('0x3f')]=function(_0x11258e){this[_0x41fb('0x1e0')]===undefined&&this[_0x41fb('0x1cc')]();for(autoColor of this[_0x41fb('0x1e0')]){if(_0x41fb('0x14b')===_0x41fb('0x1bb')){function _0x31f859(){const _0x1465b2=_0x52911a[_0x41fb('0x32')]('['+_0x3c3c09['$1'][_0x41fb('0x158')](/\d+/g)+']');for(const _0x40cd1d of _0x1465b2){if(!_0x44a4ee[_0x41fb('0x179')](_0x40cd1d))return![];}return!![];}}else _0x11258e=_0x11258e[_0x41fb('0x174')](autoColor[0x0],autoColor[0x1]);}return _0x11258e;},Window_Base['prototype'][_0x41fb('0x108')]=function(_0x10bd5d,_0x2a30d9,_0x10f6ee){if(!_0x10bd5d)return'';const _0x1fd511=_0x10bd5d[_0x2a30d9];let _0x35182a='';if(_0x1fd511&&_0x10f6ee&&_0x1fd511[_0x41fb('0x1e7')]){const _0x37e6c0=_0x41fb('0x20c');_0x35182a=_0x37e6c0[_0x41fb('0x19')](_0x1fd511['iconIndex'],_0x1fd511[_0x41fb('0x1c4')]);}else{if(_0x1fd511){if(_0x41fb('0x3c')!==_0x41fb('0x3c')){function _0x24f30e(){_0x255ca7-=_0x38491b;}}else _0x35182a=_0x1fd511[_0x41fb('0x1c4')];}else _0x35182a='';}if(this[_0x41fb('0x15b')]()){if(_0x41fb('0x120')===_0x41fb('0x120'))_0x35182a=this[_0x41fb('0x13b')](_0x35182a,_0x10bd5d);else{function _0x56408a(){return![];}}}return _0x35182a;},Window_Base[_0x41fb('0x2e')]['lastGainedObjectName']=function(_0x4dda30){const _0x519caf=$gameParty[_0x41fb('0x52')]();if(_0x519caf['id']<0x0)return'';let _0x4abf77=null;if(_0x519caf['type']===0x0)_0x4abf77=$dataItems[_0x519caf['id']];if(_0x519caf[_0x41fb('0x167')]===0x1)_0x4abf77=$dataWeapons[_0x519caf['id']];if(_0x519caf[_0x41fb('0x167')]===0x2)_0x4abf77=$dataArmors[_0x519caf['id']];if(!_0x4abf77)return'';return _0x4dda30?_0x41fb('0x20c')[_0x41fb('0x19')](_0x4abf77[_0x41fb('0x1e7')],_0x4abf77['name']):_0x4abf77[_0x41fb('0x1c4')];},Window_Base[_0x41fb('0x2e')][_0x41fb('0x212')]=function(){const _0x10f045=$gameParty[_0x41fb('0x52')]();if(_0x10f045['id']<=0x0)return'';return _0x10f045[_0x41fb('0x36')];},Window_Base['prototype'][_0x41fb('0x13b')]=function(_0x288540,_0x42e851){const _0x1d4460=VisuMZ[_0x41fb('0x93')]['Settings']['AutoColor'];let _0x70aa9c=0x0;if(_0x42e851===$dataActors)_0x70aa9c=_0x1d4460['Actors'];if(_0x42e851===$dataClasses)_0x70aa9c=_0x1d4460[_0x41fb('0x11d')];if(_0x42e851===$dataSkills)_0x70aa9c=_0x1d4460[_0x41fb('0x1ca')];if(_0x42e851===$dataItems)_0x70aa9c=_0x1d4460[_0x41fb('0x11e')];if(_0x42e851===$dataWeapons)_0x70aa9c=_0x1d4460[_0x41fb('0x1be')];if(_0x42e851===$dataArmors)_0x70aa9c=_0x1d4460[_0x41fb('0x1e4')];if(_0x42e851===$dataEnemies)_0x70aa9c=_0x1d4460[_0x41fb('0x18c')];if(_0x42e851===$dataStates)_0x70aa9c=_0x1d4460['States'];return _0x70aa9c>0x0&&(_0x288540=_0x41fb('0x15')[_0x41fb('0x19')](_0x70aa9c,_0x288540)),_0x288540;},Window_Base[_0x41fb('0x2e')][_0x41fb('0x128')]=function(_0x42d65d){_0x42d65d=_0x42d65d[_0x41fb('0x174')](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x57f49a,_0x3f6452)=>this[_0x41fb('0x145')](!![])),_0x42d65d=_0x42d65d[_0x41fb('0x174')](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x3f98ad,_0x577c)=>this[_0x41fb('0x145')](![])),_0x42d65d=_0x42d65d[_0x41fb('0x174')](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x1dd669,_0x16fdf3)=>this[_0x41fb('0x145')](![]));if(!this[_0x41fb('0xba')]())return _0x42d65d;if(_0x42d65d[_0x41fb('0x2b')]<=0x0)return _0x42d65d;if(VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')]['WordWrap'][_0x41fb('0x9c')]){if(_0x41fb('0xa')!==_0x41fb('0x8b'))_0x42d65d=_0x42d65d[_0x41fb('0x174')](/[\n\r]+/g,'\x20'),_0x42d65d=_0x42d65d[_0x41fb('0x174')](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a');else{function _0x33e5ab(){return this[_0x41fb('0x22b')]();}}}else _0x42d65d=_0x42d65d[_0x41fb('0x174')](/[\n\r]+/g,''),_0x42d65d=_0x42d65d[_0x41fb('0x174')](/<(?:BR|LINEBREAK)>/gi,'\x0a');return _0x42d65d=this['addWrapBreakAfterPunctuation'](_0x42d65d),_0x42d65d=_0x42d65d[_0x41fb('0x41')]('\x20')[_0x41fb('0x1c2')]('WrapBreak[0]'),_0x42d65d=_0x42d65d[_0x41fb('0x174')](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x42d65d=_0x42d65d[_0x41fb('0x174')](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x42d65d;},Window_Base[_0x41fb('0x2e')][_0x41fb('0x45')]=function(_0x4f12a2){return _0x4f12a2;},VisuMZ['MessageCore'][_0x41fb('0x164')]=Window_Base['prototype']['processNewLine'],Window_Base[_0x41fb('0x2e')]['processNewLine']=function(_0x1779e1){VisuMZ[_0x41fb('0x93')][_0x41fb('0x164')][_0x41fb('0x27')](this,_0x1779e1),this[_0x41fb('0x119')](_0x1779e1);},VisuMZ['MessageCore'][_0x41fb('0x22e')]=Window_Base[_0x41fb('0x2e')][_0x41fb('0x217')],Window_Base[_0x41fb('0x2e')]['processControlCharacter']=function(_0x1cfc7,_0x5824f7){VisuMZ[_0x41fb('0x93')][_0x41fb('0x22e')]['call'](this,_0x1cfc7,_0x5824f7);if(_0x5824f7===_0x41fb('0x1c5')){if(_0x41fb('0x67')!==_0x41fb('0x178'))this[_0x41fb('0x53')](_0x1cfc7);else{function _0x45167c(){_0x3b3176=_0x271935;}}}},Window_Base[_0x41fb('0x2e')][_0x41fb('0x26')]=function(_0x10c9a4){var _0x37ceb2=/^\<(.*?)\>/[_0x41fb('0x19f')](_0x10c9a4['text'][_0x41fb('0x100')](_0x10c9a4[_0x41fb('0x11f')]));return _0x37ceb2?(_0x10c9a4['index']+=_0x37ceb2[0x0][_0x41fb('0x2b')],String(_0x37ceb2[0x0][_0x41fb('0x100')](0x1,_0x37ceb2[0x0][_0x41fb('0x2b')]-0x1))):'';},VisuMZ['MessageCore'][_0x41fb('0xd0')]=Window_Base[_0x41fb('0x2e')][_0x41fb('0x21d')],Window_Base[_0x41fb('0x2e')][_0x41fb('0x21d')]=function(_0x517f6a,_0x2e8606){switch(_0x517f6a){case'C':_0x2e8606['drawing']?VisuMZ['MessageCore'][_0x41fb('0xd0')][_0x41fb('0x27')](this,_0x517f6a,_0x2e8606):this[_0x41fb('0xe8')](_0x2e8606);break;case'I':case'{':case'}':VisuMZ[_0x41fb('0x93')][_0x41fb('0xd0')]['call'](this,_0x517f6a,_0x2e8606);break;case'FS':this[_0x41fb('0x13c')](_0x2e8606);break;case'PX':this[_0x41fb('0x155')](_0x2e8606);break;case'PY':this[_0x41fb('0x1fa')](_0x2e8606);break;case'BOLD':this[_0x41fb('0x83')](this[_0x41fb('0xe8')](_0x2e8606));break;case _0x41fb('0x1df'):this[_0x41fb('0xcd')](_0x2e8606);break;case _0x41fb('0x16e'):this[_0x41fb('0x1ce')](_0x2e8606);break;case _0x41fb('0x19b'):this[_0x41fb('0x147')](_0x2e8606);break;case _0x41fb('0x2f'):this[_0x41fb('0xed')](this[_0x41fb('0xe8')](_0x2e8606));break;case _0x41fb('0x14c'):this['processDrawPicture'](_0x2e8606);break;case'PREVCOLOR':this[_0x41fb('0x10f')](_0x2e8606);break;case _0x41fb('0x23'):this[_0x41fb('0x195')](_0x2e8606);break;case _0x41fb('0xdc'):this[_0x41fb('0xcf')](_0x2e8606);break;case'WRAPBREAK':this[_0x41fb('0x53')](_0x2e8606);break;default:this[_0x41fb('0x176')](_0x517f6a,_0x2e8606);}},Window_Base[_0x41fb('0x2e')]['processMessageCoreEscapeActions']=function(_0x320616,_0x4698a7){for(const _0x2cc98e of VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x73')]){if(_0x2cc98e[_0x41fb('0x3d')]===_0x320616){if(_0x2cc98e[_0x41fb('0xf7')]==='')this[_0x41fb('0xe8')](_0x4698a7);_0x2cc98e[_0x41fb('0x9e')][_0x41fb('0x27')](this,_0x4698a7);if(this['constructor']===Window_Message){const _0x1e6f38=_0x2cc98e[_0x41fb('0x1af')]||0x0;if(_0x1e6f38>0x0)this[_0x41fb('0xec')](_0x1e6f38);}}}},Window_Base[_0x41fb('0x2e')][_0x41fb('0x216')]=function(){this['contents'][_0x41fb('0x1d3')]+=VisuMZ['MessageCore']['Settings']['General'][_0x41fb('0x182')],this[_0x41fb('0x197')][_0x41fb('0x1d3')]=Math[_0x41fb('0xa1')](this[_0x41fb('0x197')][_0x41fb('0x1d3')],VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')]['General'][_0x41fb('0x1a3')]);},Window_Base['prototype']['makeFontSmaller']=function(){this[_0x41fb('0x197')][_0x41fb('0x1d3')]-=VisuMZ[_0x41fb('0x93')]['Settings'][_0x41fb('0x12d')][_0x41fb('0x182')],this[_0x41fb('0x197')][_0x41fb('0x1d3')]=Math[_0x41fb('0x228')](this[_0x41fb('0x197')][_0x41fb('0x1d3')],VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x12d')][_0x41fb('0x1d0')]);},Window_Base[_0x41fb('0x2e')][_0x41fb('0x13c')]=function(_0x81d0fb){const _0x5b22b8=this[_0x41fb('0xe8')](_0x81d0fb);this[_0x41fb('0x197')][_0x41fb('0x1d3')]=_0x5b22b8[_0x41fb('0x1b0')](VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x12d')][_0x41fb('0x1d0')],VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x12d')][_0x41fb('0x1a3')]);},Window_Base[_0x41fb('0x2e')][_0x41fb('0x22c')]=function(_0x47927f){let _0x18019e=this[_0x41fb('0x197')][_0x41fb('0x1d3')];const _0x1093c1=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x451806=_0x1093c1[_0x41fb('0x19f')](_0x47927f);if(!_0x451806){if(_0x41fb('0x7')!==_0x41fb('0x232'))break;else{function _0x5029b1(){this['contents'][_0x41fb('0x1d3')]=_0x24c49f(_0x433824[0x3])[_0x41fb('0x1b0')](_0x59bf5b[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x12d')][_0x41fb('0x1d0')],_0x13e8fd[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x12d')][_0x41fb('0x1a3')]);}}}const _0x2d02a2=String(_0x451806[0x1])[_0x41fb('0x94')]();if(_0x2d02a2==='{')this[_0x41fb('0x216')]();else{if(_0x2d02a2==='}'){if('wnOKW'!=='wnOKW'){function _0x3213f8(){this[_0x41fb('0x1db')]=new _0x2d7eb7(),this[_0x41fb('0x1db')][_0x41fb('0x1a6')](this[_0x41fb('0x86')](),this['_eventId']);}}else this[_0x41fb('0x22')]();}else _0x2d02a2==='FS'&&(this[_0x41fb('0x197')]['fontSize']=parseInt(_0x451806[0x3])[_0x41fb('0x1b0')](VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')]['General']['FontSmallerCap'],VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x12d')][_0x41fb('0x1a3')]));}this[_0x41fb('0x197')][_0x41fb('0x1d3')]>_0x18019e&&(_0x18019e=this['contents'][_0x41fb('0x1d3')]);}return _0x18019e;},Window_Base['prototype'][_0x41fb('0x155')]=function(_0x4a7b56){_0x4a7b56['x']=this[_0x41fb('0xe8')](_0x4a7b56),VisuMZ['MessageCore'][_0x41fb('0x15d')][_0x41fb('0x12d')][_0x41fb('0xa8')]&&(_0x4a7b56['x']+=_0x4a7b56[_0x41fb('0xce')]);},Window_Base[_0x41fb('0x2e')][_0x41fb('0x1fa')]=function(_0x1e1194){_0x1e1194['y']=this[_0x41fb('0xe8')](_0x1e1194),VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x12d')][_0x41fb('0xa8')]&&(_0x1e1194['y']+=_0x1e1194[_0x41fb('0x1b9')]);},Window_Base[_0x41fb('0x2e')][_0x41fb('0x83')]=function(_0x5488d9){this[_0x41fb('0x197')][_0x41fb('0x11c')]=!!_0x5488d9;},Window_Base[_0x41fb('0x2e')]['processFontChangeItalic']=function(_0x2bc06e){this[_0x41fb('0x197')][_0x41fb('0x1ed')]=!!_0x2bc06e;},Window_Base[_0x41fb('0x2e')][_0x41fb('0x195')]=function(_0x203a8c){const _0x3f48bf=this[_0x41fb('0xe8')](_0x203a8c);if(!_0x203a8c[_0x41fb('0x88')])return;switch(_0x3f48bf){case 0x0:this[_0x41fb('0x82')]('default');return;case 0x1:this[_0x41fb('0x82')](_0x41fb('0x71'));break;case 0x2:this['setTextAlignment'](_0x41fb('0x57'));break;case 0x3:this[_0x41fb('0x82')](_0x41fb('0x141'));break;}this[_0x41fb('0x119')](_0x203a8c);},Window_Base[_0x41fb('0x2e')][_0x41fb('0x119')]=function(_0x21a076){if(!_0x21a076[_0x41fb('0x88')])return;if(_0x21a076[_0x41fb('0x1c6')])return;if(this[_0x41fb('0x4a')]()===_0x41fb('0x125'))return;let _0x1a9091=_0x21a076[_0x41fb('0x40')][_0x41fb('0x19e')](_0x41fb('0xf2'),_0x21a076[_0x41fb('0x11f')]+0x1),_0x41894a=_0x21a076[_0x41fb('0x40')][_0x41fb('0x19e')]('\x0a',_0x21a076[_0x41fb('0x11f')]+0x1);if(_0x1a9091<0x0)_0x1a9091=_0x21a076[_0x41fb('0x40')][_0x41fb('0x2b')]+0x1;if(_0x41894a>0x0)_0x1a9091=Math[_0x41fb('0xa1')](_0x1a9091,_0x41894a);const _0x1de654=_0x21a076[_0x41fb('0x40')][_0x41fb('0x48')](_0x21a076[_0x41fb('0x11f')],_0x1a9091),_0x28a82c=this[_0x41fb('0xd7')](_0x1de654)[_0x41fb('0x97')],_0x151d40=_0x21a076[_0x41fb('0x97')]||this[_0x41fb('0x203')],_0x1c2d59=this['constructor']===Window_Message&&$gameMessage[_0x41fb('0x1d6')]()!=='';switch(this['getTextAlignment']()){case _0x41fb('0x71'):_0x21a076['x']=_0x21a076['startX'];break;case _0x41fb('0x57'):_0x21a076['x']=_0x21a076['startX'],_0x21a076['x']+=Math[_0x41fb('0x169')]((_0x151d40-_0x28a82c)/0x2);_0x1c2d59&&(_0x21a076['x']-=_0x21a076[_0x41fb('0xce')]/0x2);break;case'right':_0x21a076['x']=_0x151d40-_0x28a82c+_0x21a076[_0x41fb('0xce')];if(_0x1c2d59){if(_0x41fb('0x20d')===_0x41fb('0x144')){function _0x5069c4(){_0x19b3cb(_0x41fb('0x10')[_0x41fb('0x19')](_0x2d875a,_0x230258,_0x32d50c)),_0x2db589[_0x41fb('0x1fe')]();}}else _0x21a076['x']-=_0x21a076[_0x41fb('0xce')];}break;}},Window_Base[_0x41fb('0x2e')][_0x41fb('0xd7')]=function(_0x112e77){_0x112e77=_0x112e77[_0x41fb('0x174')](/\x1b!/g,''),_0x112e77=_0x112e77[_0x41fb('0x174')](/\x1b\|/g,''),_0x112e77=_0x112e77[_0x41fb('0x174')](/\x1b\./g,'');const _0xe6db5a=this['createTextState'](_0x112e77,0x0,0x0,0x0),_0x16f807=this[_0x41fb('0x14d')]();return _0xe6db5a[_0x41fb('0x88')]=![],this[_0x41fb('0xe3')](_0xe6db5a),this[_0x41fb('0x10d')](_0x16f807),{'width':_0xe6db5a[_0x41fb('0x3e')],'height':_0xe6db5a[_0x41fb('0x1a7')]};},Window_Base[_0x41fb('0x2e')][_0x41fb('0x53')]=function(_0x16047f){const _0x3244d0=(_0x16047f['rtl']?-0x1:0x1)*this['textWidth']('\x20');_0x16047f['x']+=_0x3244d0;if(this[_0x41fb('0xe8')](_0x16047f)>0x0)_0x16047f['x']+=_0x3244d0;if(_0x16047f[_0x41fb('0x1c6')])return;let _0x5b29f4=_0x16047f[_0x41fb('0x40')][_0x41fb('0x19e')](_0x41fb('0x1c5'),_0x16047f['index']+0x1);_0x5b29f4=Math[_0x41fb('0xa1')](_0x5b29f4,_0x16047f[_0x41fb('0x40')][_0x41fb('0x19e')]('',_0x16047f[_0x41fb('0x11f')]+0x1));let _0x40b9db=_0x16047f[_0x41fb('0x40')]['indexOf']('\x0a',_0x16047f[_0x41fb('0x11f')]+0x1);if(_0x5b29f4<0x0)_0x5b29f4=_0x16047f[_0x41fb('0x40')][_0x41fb('0x2b')]+0x1;if(_0x40b9db>0x0)_0x5b29f4=Math[_0x41fb('0xa1')](_0x5b29f4,_0x40b9db);const _0x2674b4=_0x16047f[_0x41fb('0x40')][_0x41fb('0x48')](_0x16047f[_0x41fb('0x11f')],_0x5b29f4),_0x925d8f=this[_0x41fb('0x3a')](_0x2674b4)['width'];let _0x2ca527=_0x16047f[_0x41fb('0x97')]||this['innerWidth'];if(this[_0x41fb('0xaf')]===Window_Message){const _0x581730=$gameMessage[_0x41fb('0x1d6')]()===''?0x0:ImageManager['faceWidth']+0x14;_0x2ca527-=_0x581730,VisuMZ['MessageCore'][_0x41fb('0x15d')][_0x41fb('0xc9')][_0x41fb('0x21b')]&&(_0x2ca527-=_0x581730);}_0x16047f['x']+_0x925d8f>_0x16047f[_0x41fb('0xce')]+_0x2ca527&&(_0x16047f['text']=_0x16047f[_0x41fb('0x40')][_0x41fb('0x100')](0x0,_0x16047f[_0x41fb('0x11f')])+'\x0a'+_0x16047f[_0x41fb('0x40')][_0x41fb('0x194')](_0x16047f[_0x41fb('0x11f')]));},Window_Base[_0x41fb('0x2e')]['textSizeExWordWrap']=function(_0x28c6f3){const _0x8dcbf8=this[_0x41fb('0x15f')](_0x28c6f3,0x0,0x0,0x0),_0x537793=this[_0x41fb('0x14d')]();return _0x8dcbf8[_0x41fb('0x88')]=![],this[_0x41fb('0x145')](![]),this[_0x41fb('0xe3')](_0x8dcbf8),this[_0x41fb('0x145')](!![]),this[_0x41fb('0x10d')](_0x537793),{'width':_0x8dcbf8[_0x41fb('0x3e')],'height':_0x8dcbf8[_0x41fb('0x1a7')]};},Window_Base[_0x41fb('0x2e')][_0x41fb('0x147')]=function(_0x130cb4){return this[_0x41fb('0xe8')](_0x130cb4);},Window_Base[_0x41fb('0x2e')][_0x41fb('0x191')]=function(_0x460137){const _0x216eda=this['obtainEscapeString'](_0x460137)[_0x41fb('0x41')](',');if(!_0x460137[_0x41fb('0x88')])return;const _0x27f873=_0x216eda[0x0][_0x41fb('0x22d')](),_0x187e29=_0x216eda[0x1]||0x0,_0x3a20c0=_0x216eda[0x2]||0x0,_0x503966=ImageManager[_0x41fb('0x12b')](_0x27f873),_0x489344=this[_0x41fb('0x197')][_0x41fb('0x15e')];_0x503966[_0x41fb('0x1ad')](this[_0x41fb('0x181')][_0x41fb('0x111')](this,_0x503966,_0x460137['x'],_0x460137['y'],_0x187e29,_0x3a20c0,_0x489344));},Window_Base[_0x41fb('0x2e')][_0x41fb('0x181')]=function(_0x5abb6a,_0xd8e3c1,_0xea8a07,_0x271213,_0x20ef22,_0x53de66){_0x271213=_0x271213||_0x5abb6a['width'],_0x20ef22=_0x20ef22||_0x5abb6a[_0x41fb('0x1ea')],this['contentsBack']['paintOpacity']=_0x53de66,this[_0x41fb('0xc0')][_0x41fb('0x132')](_0x5abb6a,0x0,0x0,_0x5abb6a[_0x41fb('0x97')],_0x5abb6a[_0x41fb('0x1ea')],_0xd8e3c1,_0xea8a07,_0x271213,_0x20ef22),this[_0x41fb('0xc0')][_0x41fb('0x15e')]=0xff;},Window_Base[_0x41fb('0x2e')][_0x41fb('0xcd')]=function(_0x5ab04a){const _0x5af298=this[_0x41fb('0x26')](_0x5ab04a)[_0x41fb('0x41')](',');if(!_0x5ab04a['drawing'])return;const _0x41bfc8=_0x5af298[0x0][_0x41fb('0x22d')](),_0x23a75e=ImageManager[_0x41fb('0x12b')](_0x41bfc8),_0x143d30=JsonEx[_0x41fb('0x102')](_0x5ab04a),_0x36bb23=this[_0x41fb('0x197')][_0x41fb('0x15e')];_0x23a75e[_0x41fb('0x1ad')](this[_0x41fb('0x90')][_0x41fb('0x111')](this,_0x23a75e,_0x143d30,_0x36bb23));},Window_Base[_0x41fb('0x2e')]['drawBackCenteredPicture']=function(_0x37e493,_0x3d965b,_0x6d7106){const _0x44a455=_0x3d965b[_0x41fb('0x97')]||this['innerWidth'],_0x43b50d=this['_index']!==undefined?this[_0x41fb('0x77')]():this['innerHeight'],_0xa661e=_0x44a455/_0x37e493[_0x41fb('0x97')],_0x3340b6=_0x43b50d/_0x37e493[_0x41fb('0x1ea')],_0x4e58e1=Math[_0x41fb('0xa1')](_0xa661e,_0x3340b6,0x1),_0x3036d5=this[_0x41fb('0x234')]!==undefined?(this[_0x41fb('0x7b')](0x0)[_0x41fb('0x1ea')]-this[_0x41fb('0x60')]())/0x2:0x0,_0x527764=_0x37e493[_0x41fb('0x97')]*_0x4e58e1,_0x13c7b6=_0x37e493[_0x41fb('0x1ea')]*_0x4e58e1,_0x32a7fc=Math[_0x41fb('0x169')]((_0x44a455-_0x527764)/0x2)+_0x3d965b[_0x41fb('0xce')],_0x53b08a=Math[_0x41fb('0x169')]((_0x43b50d-_0x13c7b6)/0x2)+_0x3d965b[_0x41fb('0x1b9')]-_0x3036d5*0x2;this[_0x41fb('0xc0')]['paintOpacity']=_0x6d7106,this[_0x41fb('0xc0')][_0x41fb('0x132')](_0x37e493,0x0,0x0,_0x37e493[_0x41fb('0x97')],_0x37e493[_0x41fb('0x1ea')],_0x32a7fc,_0x53b08a,_0x527764,_0x13c7b6),this[_0x41fb('0xc0')][_0x41fb('0x15e')]=0xff;},Window_Base[_0x41fb('0x2e')][_0x41fb('0x1ce')]=function(_0x29e1ff){const _0x28194e=this[_0x41fb('0xe8')](_0x29e1ff);if(_0x29e1ff[_0x41fb('0x88')])this['setColorLock'](_0x28194e>0x0);},Window_Base[_0x41fb('0x2e')][_0x41fb('0xcf')]=function(_0x30f663){const _0xd7c74f=this[_0x41fb('0xe8')](_0x30f663);if(this[_0x41fb('0xaf')]===Window_Message&&_0x30f663['drawing']){if(_0x41fb('0x1ec')===_0x41fb('0x201')){function _0x3aea89(){if(!_0x592dc1[_0x41fb('0x179')](_0x47693e))return![];}}else this['startWait'](_0xd7c74f);}},Window_Help[_0x41fb('0x2e')][_0x41fb('0x238')]=function(){this[_0x41fb('0x145')]($gameSystem[_0x41fb('0x121')]());},Window_Help[_0x41fb('0x2e')][_0x41fb('0x15b')]=function(){return!![];},VisuMZ[_0x41fb('0x93')][_0x41fb('0xad')]=Window_Help[_0x41fb('0x2e')][_0x41fb('0x5c')],Window_Help[_0x41fb('0x2e')][_0x41fb('0x5c')]=function(){this['clearActorNameAutoColor'](),VisuMZ[_0x41fb('0x93')][_0x41fb('0xad')]['call'](this),this[_0x41fb('0x238')]();},VisuMZ['MessageCore'][_0x41fb('0x22a')]=Window_Options[_0x41fb('0x2e')][_0x41fb('0x149')],Window_Options[_0x41fb('0x2e')][_0x41fb('0x149')]=function(){VisuMZ[_0x41fb('0x93')][_0x41fb('0x22a')][_0x41fb('0x27')](this),this[_0x41fb('0x1e1')]();},Window_Options[_0x41fb('0x2e')][_0x41fb('0x1e1')]=function(){if(VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x37')][_0x41fb('0x1e9')]){if(_0x41fb('0x1ff')!==_0x41fb('0x51'))this[_0x41fb('0x165')]();else{function _0x4dfd33(){return _0x46d051[this[_0x41fb('0x215')]];}}}},Window_Options['prototype'][_0x41fb('0x165')]=function(){const _0x4550ab=TextManager[_0x41fb('0xfe')],_0x17c7b0=_0x41fb('0x1c8');this[_0x41fb('0x81')](_0x4550ab,_0x17c7b0);},VisuMZ['MessageCore'][_0x41fb('0xb9')]=Window_Options[_0x41fb('0x2e')]['statusText'],Window_Options[_0x41fb('0x2e')]['statusText']=function(_0x1079a){const _0x342107=this[_0x41fb('0x8a')](_0x1079a);if(_0x342107==='textSpeed')return this[_0x41fb('0x21a')]();return VisuMZ[_0x41fb('0x93')][_0x41fb('0xb9')][_0x41fb('0x27')](this,_0x1079a);},VisuMZ[_0x41fb('0x93')][_0x41fb('0x89')]=Window_Options[_0x41fb('0x2e')][_0x41fb('0x156')],Window_Options[_0x41fb('0x2e')][_0x41fb('0x156')]=function(_0x2fd5a5){if(_0x2fd5a5===_0x41fb('0x1c8'))return!![];return VisuMZ[_0x41fb('0x93')][_0x41fb('0x89')][_0x41fb('0x27')](this,_0x2fd5a5);},Window_Options[_0x41fb('0x2e')][_0x41fb('0x21a')]=function(){const _0xfd25db=this[_0x41fb('0x9')](_0x41fb('0x1c8'));return _0xfd25db>0xa?TextManager[_0x41fb('0x21')]:_0xfd25db;},VisuMZ[_0x41fb('0x93')][_0x41fb('0xfa')]=Window_Options[_0x41fb('0x2e')][_0x41fb('0xcc')],Window_Options['prototype'][_0x41fb('0xcc')]=function(_0x2ea11e,_0x116776,_0x5a47a3){if(_0x2ea11e===_0x41fb('0x1c8'))return this['changeTextSpeed'](_0x2ea11e,_0x116776,_0x5a47a3);VisuMZ['MessageCore']['Window_Options_changeVolume'][_0x41fb('0x27')](this,_0x2ea11e,_0x116776,_0x5a47a3);},Window_Options[_0x41fb('0x2e')][_0x41fb('0x205')]=function(_0x5bd660,_0x48ffe0,_0x501035){const _0xd2ad75=this[_0x41fb('0x9')](_0x5bd660),_0x1c01ef=0x1,_0x18ff6e=_0xd2ad75+(_0x48ffe0?_0x1c01ef:-_0x1c01ef);if(_0x18ff6e>0xb&&_0x501035)this[_0x41fb('0xa2')](_0x5bd660,0x1);else{if(_0x41fb('0x219')!==_0x41fb('0x219')){function _0x5d65e7(){return(_0x25150b[_0x41fb('0x3b')]-this[_0x41fb('0x13e')]())/0x2;}}else this['changeValue'](_0x5bd660,_0x18ff6e[_0x41fb('0x1b0')](0x1,0xb));}},Window_Message[_0x41fb('0x2e')][_0x41fb('0x1e')]=function(){Window_Base[_0x41fb('0x2e')][_0x41fb('0x1e')]['call'](this),VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x12d')][_0x41fb('0x104')]&&this[_0x41fb('0x1f5')]();},Window_Message[_0x41fb('0x2e')][_0x41fb('0x1f5')]=function(){this['_dimmerSprite']['x']=Math['round'](this[_0x41fb('0x97')]/0x2),this[_0x41fb('0x1c0')][_0x41fb('0x1c9')]['x']=0.5,this[_0x41fb('0x1c0')][_0x41fb('0xe')]['x']=Graphics[_0x41fb('0x97')];},VisuMZ[_0x41fb('0x93')]['Window_Message_clearFlags']=Window_Message[_0x41fb('0x2e')]['clearFlags'],Window_Message[_0x41fb('0x2e')][_0x41fb('0x16a')]=function(){VisuMZ[_0x41fb('0x93')][_0x41fb('0xdb')]['call'](this),this[_0x41fb('0x7f')](),this[_0x41fb('0x238')](),this[_0x41fb('0x142')](![]),this[_0x41fb('0x82')](_0x41fb('0x125')),this[_0x41fb('0x21f')](VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x12d')][_0x41fb('0x214')]);},Window_Message[_0x41fb('0x2e')]['resetWordWrap']=function(){this['setWordWrap']($gameSystem[_0x41fb('0xdd')]());},Window_Message['prototype'][_0x41fb('0x15b')]=function(){return!![];},Window_Message['prototype']['setTextDelay']=function(_0x101711){const _0x339839=0xb-ConfigManager[_0x41fb('0x1c8')];_0x101711=Math['round'](_0x101711*_0x339839),this[_0x41fb('0x14')]=_0x101711,this[_0x41fb('0xf1')]=_0x101711;},VisuMZ[_0x41fb('0x93')]['Window_Message_isTriggered']=Window_Message[_0x41fb('0x2e')][_0x41fb('0xc4')],Window_Message[_0x41fb('0x2e')][_0x41fb('0xc4')]=function(){return VisuMZ[_0x41fb('0x93')][_0x41fb('0x20e')][_0x41fb('0x27')](this)||Input[_0x41fb('0x105')](VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x12d')][_0x41fb('0x1cd')]);},VisuMZ[_0x41fb('0x93')][_0x41fb('0x1fc')]=Window_Message[_0x41fb('0x2e')][_0x41fb('0x115')],Window_Message[_0x41fb('0x2e')][_0x41fb('0x115')]=function(){VisuMZ['MessageCore'][_0x41fb('0x1fc')][_0x41fb('0x27')](this),this[_0x41fb('0x10b')]();},VisuMZ[_0x41fb('0x93')]['Window_Message_newPage']=Window_Message[_0x41fb('0x2e')][_0x41fb('0x225')],Window_Message['prototype'][_0x41fb('0x225')]=function(_0x45b209){this[_0x41fb('0x210')](_0x45b209),VisuMZ['MessageCore'][_0x41fb('0x4d')][_0x41fb('0x27')](this,_0x45b209),this['createContents']();},Window_Message[_0x41fb('0x2e')][_0x41fb('0x210')]=function(_0xb4d9bd){this[_0x41fb('0x22f')]();},VisuMZ[_0x41fb('0x93')][_0x41fb('0x6b')]=Window_Message['prototype']['terminateMessage'],Window_Message['prototype']['terminateMessage']=function(){VisuMZ[_0x41fb('0x93')][_0x41fb('0x6b')][_0x41fb('0x27')](this),this[_0x41fb('0x16a')]();},Window_Message['prototype'][_0x41fb('0x22f')]=function(){this[_0x41fb('0x97')]=$gameSystem[_0x41fb('0x7c')](),this[_0x41fb('0x97')]=Math[_0x41fb('0xa1')](Graphics[_0x41fb('0x97')],this[_0x41fb('0x97')]);const _0x12d98b=$gameSystem[_0x41fb('0x154')]();this['height']=SceneManager[_0x41fb('0x20')][_0x41fb('0xe1')](_0x12d98b,![]),this[_0x41fb('0x1ea')]=Math[_0x41fb('0xa1')](Graphics[_0x41fb('0x1ea')],this[_0x41fb('0x1ea')]);if($gameTemp[_0x41fb('0xeb')])this[_0x41fb('0x1dd')]();},Window_Message[_0x41fb('0x2e')][_0x41fb('0x1dd')]=function(){this['x']=(Graphics[_0x41fb('0x3b')]-this[_0x41fb('0x97')])/0x2,$gameTemp[_0x41fb('0xeb')]=undefined,this[_0x41fb('0x10b')]();},Window_Message['prototype'][_0x41fb('0x233')]=function(){const _0x32a1a2={'x':this['x'],'y':this['y']};Window_Base[_0x41fb('0x2e')][_0x41fb('0x233')]['call'](this),this['updateNameBoxMove'](_0x32a1a2);},Window_Message[_0x41fb('0x2e')][_0x41fb('0x75')]=function(){return!![];},Window_Message[_0x41fb('0x2e')]['updateNameBoxMove']=function(_0x1d1664){this['_nameBoxWindow']&&(this[_0x41fb('0x170')]['x']+=this['x']-_0x1d1664['x'],this[_0x41fb('0x170')]['y']+=this['y']-_0x1d1664['y']);},Window_Message['prototype'][_0x41fb('0x152')]=function(_0x454ebb,_0x39a178){this[_0x41fb('0x1d8')](this[_0x41fb('0x137')]['x'],this[_0x41fb('0x18')]*(Graphics[_0x41fb('0x198')]-this[_0x41fb('0x1ea')])/0x2,this[_0x41fb('0x137')]['width'],this['_resetRect'][_0x41fb('0x1ea')],_0x454ebb,_0x39a178);},Window_Message['prototype'][_0x41fb('0x147')]=function(_0x281545){const _0x181d46=Window_Base['prototype'][_0x41fb('0x147')][_0x41fb('0x27')](this,_0x281545);this['launchMessageCommonEvent'](_0x181d46);},Window_Message['prototype']['launchMessageCommonEvent']=function(_0x3603d0){if($gameParty['inBattle']()){}else $gameMap[_0x41fb('0x10e')](_0x3603d0);},Window_Message[_0x41fb('0x2e')]['processCharacter']=function(_0x327691){this[_0x41fb('0x14')]--;if(this[_0x41fb('0x14')]<=0x0){if('KylUR'!==_0x41fb('0x2a'))this[_0x41fb('0x17')](_0x327691),Window_Base[_0x41fb('0x2e')][_0x41fb('0x187')][_0x41fb('0x27')](this,_0x327691);else{function _0x2b497d(){const _0x572e68=this[_0x41fb('0x98')],_0x21b26b=_0x572e68?_0x572e68['y']:0x0,_0x2507c7=_0x572e68?_0x572e68['height']:0x0,_0x4ad718=_0x4ef60a['boxHeight']/0x2;return _0x21b26b<_0x4ad718&&_0x21b26b+_0x2507c7>_0x4ad718?0x4:_0x3530ee[_0x41fb('0x18d')]();}}}},Window_Message[_0x41fb('0x2e')][_0x41fb('0x17')]=function(_0x43abe0){this[_0x41fb('0x14')]=this[_0x41fb('0xf1')];if(this[_0x41fb('0xf1')]<=0x0)this[_0x41fb('0x131')]=!![];},VisuMZ[_0x41fb('0x93')][_0x41fb('0x5e')]=Window_Message[_0x41fb('0x2e')]['processEscapeCharacter'],Window_Message[_0x41fb('0x2e')][_0x41fb('0x21d')]=function(_0x1cd832,_0x56341f){if(!_0x56341f[_0x41fb('0x88')]){if(_0x41fb('0xc1')===_0x41fb('0xc1'))Window_Base[_0x41fb('0x2e')][_0x41fb('0x21d')][_0x41fb('0x27')](this,_0x1cd832,_0x56341f);else{function _0x150a6a(){return _0x152c3f=_0x359afd[_0x41fb('0x174')](/\x1bN\[(\d+)\]/gi,(_0x5286a,_0x28c734)=>this[_0x41fb('0x10c')](_0x526a98(_0x28c734))),_0x2efc29=_0xafd292[_0x41fb('0x174')](/\x1bP\[(\d+)\]/gi,(_0x1a619e,_0x43ee8c)=>this[_0x41fb('0xa0')](_0x5280d7(_0x43ee8c))),_0x488f2a=_0x1a9251[_0x41fb('0x174')](/\x1bG/gi,_0x569f7f[_0x41fb('0x19c')]),_0x457a43;}}}else{if(_0x41fb('0xb4')!==_0x41fb('0x1b2'))VisuMZ[_0x41fb('0x93')][_0x41fb('0x5e')][_0x41fb('0x27')](this,_0x1cd832,_0x56341f);else{function _0x183719(){_0x38477b['x']+=_0x277edf[_0x41fb('0xce')];}}}},Window_NameBox[_0x41fb('0x2e')][_0x41fb('0x15b')]=function(){return![];},Window_NameBox[_0x41fb('0x2e')][_0x41fb('0x55')]=function(){Window_Base[_0x41fb('0x2e')]['resetTextColor']['call'](this),this[_0x41fb('0x24')](this[_0x41fb('0x116')]());},Window_NameBox[_0x41fb('0x2e')][_0x41fb('0x116')]=function(){const _0x21d9ac=VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x12d')][_0x41fb('0x1a4')];return ColorManager['textColor'](_0x21d9ac);},VisuMZ[_0x41fb('0x93')][_0x41fb('0x14f')]=Window_NameBox[_0x41fb('0x2e')][_0x41fb('0x115')],Window_NameBox[_0x41fb('0x2e')][_0x41fb('0x115')]=function(){VisuMZ[_0x41fb('0x93')][_0x41fb('0x14f')][_0x41fb('0x27')](this),this[_0x41fb('0x13d')](),this[_0x41fb('0x127')](),this[_0x41fb('0x10b')]();},Window_NameBox[_0x41fb('0x2e')][_0x41fb('0x8c')]=function(_0x3e872d){return _0x3e872d=_0x3e872d[_0x41fb('0x174')](/<LEFT>/gi,this[_0x41fb('0x1da')][_0x41fb('0x111')](this,0x0)),_0x3e872d=_0x3e872d[_0x41fb('0x174')](/<CENTER>/gi,this[_0x41fb('0x1da')][_0x41fb('0x111')](this,0x5)),_0x3e872d=_0x3e872d[_0x41fb('0x174')](/<RIGHT>/gi,this[_0x41fb('0x1da')][_0x41fb('0x111')](this,0xa)),_0x3e872d=_0x3e872d[_0x41fb('0x174')](/<POSITION:[ ](\d+)>/gi,(_0xa2cca9,_0x18100f)=>this[_0x41fb('0x1da')](parseInt(_0x18100f))),_0x3e872d=_0x3e872d[_0x41fb('0x174')](/<\/LEFT>/gi,''),_0x3e872d=_0x3e872d[_0x41fb('0x174')](/<\/CENTER>/gi,''),_0x3e872d=_0x3e872d['replace'](/<\/RIGHT>/gi,''),Window_Base[_0x41fb('0x2e')]['preConvertEscapeCharacters'][_0x41fb('0x27')](this,_0x3e872d);},Window_NameBox[_0x41fb('0x2e')]['setRelativePosition']=function(_0x2cdf8c){return this[_0x41fb('0x139')]=_0x2cdf8c,'';},Window_NameBox[_0x41fb('0x2e')]['updateRelativePosition']=function(){if($gameMessage[_0x41fb('0x16d')]())return;this[_0x41fb('0x139')]=this[_0x41fb('0x139')]||0x0;const _0x16ff66=this[_0x41fb('0x98')],_0x4b581f=Math[_0x41fb('0x169')](_0x16ff66[_0x41fb('0x97')]*this[_0x41fb('0x139')]/0xa);this['x']=_0x16ff66['x']+_0x4b581f-Math[_0x41fb('0x169')](this[_0x41fb('0x97')]/0x2),this['x']=this['x'][_0x41fb('0x1b0')](_0x16ff66['x'],_0x16ff66['x']+_0x16ff66[_0x41fb('0x97')]-this[_0x41fb('0x97')]);},Window_NameBox[_0x41fb('0x2e')][_0x41fb('0x127')]=function(){if($gameMessage[_0x41fb('0x16d')]())return;this[_0x41fb('0x139')]=this[_0x41fb('0x139')]||0x0;const _0x24bd68=VisuMZ['MessageCore'][_0x41fb('0x15d')][_0x41fb('0x12d')][_0x41fb('0xac')],_0x2d1f30=VisuMZ[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x12d')][_0x41fb('0x1bf')],_0x8b7eae=(0x5-this[_0x41fb('0x139')])/0x5;this['x']+=Math[_0x41fb('0x169')](_0x24bd68*_0x8b7eae),this['y']+=_0x2d1f30;},VisuMZ[_0x41fb('0x93')][_0x41fb('0xbe')]=Window_NameBox['prototype'][_0x41fb('0x5c')],Window_NameBox[_0x41fb('0x2e')]['refresh']=function(){this[_0x41fb('0x139')]=0x0,VisuMZ[_0x41fb('0x93')][_0x41fb('0xbe')]['call'](this);},Window_ChoiceList[_0x41fb('0x2e')][_0x41fb('0xba')]=function(){return![];},Window_ChoiceList[_0x41fb('0x2e')][_0x41fb('0x15b')]=function(){return!![];},Window_ChoiceList[_0x41fb('0x2e')]['lineHeight']=function(){return $gameSystem['getChoiceListLineHeight']();},Window_ChoiceList[_0x41fb('0x2e')]['maxCols']=function(){return $gameSystem[_0x41fb('0x1c')]();},Window_ChoiceList[_0x41fb('0x2e')][_0x41fb('0x25')]=function(){this[_0x41fb('0xc8')](),this[_0x41fb('0x5c')](),this['selectDefault'](),this[_0x41fb('0x7e')](),this[_0x41fb('0x66')]();},Window_ChoiceList[_0x41fb('0x2e')]['refresh']=function(){this[_0x41fb('0x19a')](),this[_0x41fb('0x149')](),this[_0x41fb('0x98')]&&(this[_0x41fb('0x115')](),this[_0x41fb('0x1cf')]()),this[_0x41fb('0x16b')](),Window_Selectable[_0x41fb('0x2e')]['refresh'][_0x41fb('0x27')](this);},Window_ChoiceList[_0x41fb('0x2e')]['makeCommandList']=function(){const _0x57414c=$gameMessage[_0x41fb('0x2d')]();let _0x2ecb54=0x0;for(const _0x2c4744 of _0x57414c){if(this[_0x41fb('0x6a')](_0x2c4744)){const _0x86e48b=_0x2c4744,_0x288d6d=this[_0x41fb('0x180')](_0x2c4744);this[_0x41fb('0x81')](_0x86e48b,_0x41fb('0xc6'),_0x288d6d,_0x2ecb54);}_0x2ecb54++;}},Window_ChoiceList[_0x41fb('0x2e')][_0x41fb('0x6a')]=function(_0x40f1e5){if(_0x40f1e5[_0x41fb('0x158')](/<HIDE>/i))return![];if(_0x40f1e5[_0x41fb('0x158')](/<SHOW>/i))return!![];if(_0x40f1e5[_0x41fb('0x158')](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3b54b2=JSON['parse']('['+RegExp['$1'][_0x41fb('0x158')](/\d+/g)+']');for(const _0x3def6c of _0x3b54b2){if(!$gameSwitches[_0x41fb('0x179')](_0x3def6c))return![];}return!![];}if(_0x40f1e5['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x15500a=JSON[_0x41fb('0x32')]('['+RegExp['$1'][_0x41fb('0x158')](/\d+/g)+']');for(const _0x355046 of _0x15500a){if(!$gameSwitches[_0x41fb('0x179')](_0x355046))return![];}return!![];}if(_0x40f1e5[_0x41fb('0x158')](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x41fb('0x95')===_0x41fb('0x226')){function _0x317a96(){return _0x5be075;}}else{const _0x478e42=JSON[_0x41fb('0x32')]('['+RegExp['$1'][_0x41fb('0x158')](/\d+/g)+']');for(const _0x5c3387 of _0x478e42){if($gameSwitches[_0x41fb('0x179')](_0x5c3387))return!![];}return![];}}if(_0x40f1e5[_0x41fb('0x158')](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5c206c=JSON[_0x41fb('0x32')]('['+RegExp['$1'][_0x41fb('0x158')](/\d+/g)+']');for(const _0x4e158e of _0x5c206c){if(!$gameSwitches[_0x41fb('0x179')](_0x4e158e))return!![];}return![];}if(_0x40f1e5[_0x41fb('0x158')](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4de0a7=JSON[_0x41fb('0x32')]('['+RegExp['$1'][_0x41fb('0x158')](/\d+/g)+']');for(const _0x1fe6b4 of _0x4de0a7){if(_0x41fb('0xbd')!==_0x41fb('0x39')){if(!$gameSwitches[_0x41fb('0x179')](_0x1fe6b4))return!![];}else{function _0x457c2f(){_0x266324=_0x2cf0f9[_0x41fb('0x174')](/[\n\r]+/g,''),_0x4d648d=_0x1a306e[_0x41fb('0x174')](/<(?:BR|LINEBREAK)>/gi,'\x0a');}}}return![];}if(_0x40f1e5[_0x41fb('0x158')](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2157e4=JSON['parse']('['+RegExp['$1'][_0x41fb('0x158')](/\d+/g)+']');for(const _0x3ab39a of _0x2157e4){if($gameSwitches['value'](_0x3ab39a))return![];}return!![];}return!![];},Window_ChoiceList[_0x41fb('0x2e')][_0x41fb('0x180')]=function(_0x318497){if(_0x318497[_0x41fb('0x158')](/<DISABLE>/i))return![];if(_0x318497['match'](/<ENABLE>/i))return!![];if(_0x318497['match'](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x300ab7=JSON[_0x41fb('0x32')]('['+RegExp['$1'][_0x41fb('0x158')](/\d+/g)+']');for(const _0x56f531 of _0x300ab7){if(!$gameSwitches[_0x41fb('0x179')](_0x56f531))return![];}return!![];}if(_0x318497['match'](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xaaae4=JSON[_0x41fb('0x32')]('['+RegExp['$1'][_0x41fb('0x158')](/\d+/g)+']');for(const _0x2768a1 of _0xaaae4){if(!$gameSwitches[_0x41fb('0x179')](_0x2768a1))return![];}return!![];}if(_0x318497[_0x41fb('0x158')](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x912b45=JSON['parse']('['+RegExp['$1'][_0x41fb('0x158')](/\d+/g)+']');for(const _0x1b8194 of _0x912b45){if($gameSwitches[_0x41fb('0x179')](_0x1b8194))return!![];}return![];}if(_0x318497[_0x41fb('0x158')](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('HRvre'!==_0x41fb('0x6e')){function _0x1b88e1(){if(!_0x23f723[_0x41fb('0x179')](_0x46820c))return![];}}else{const _0x3c2721=JSON[_0x41fb('0x32')]('['+RegExp['$1'][_0x41fb('0x158')](/\d+/g)+']');for(const _0x134b15 of _0x3c2721){if(_0x41fb('0x1de')!==_0x41fb('0x236')){if(!$gameSwitches['value'](_0x134b15))return!![];}else{function _0x48a8a1(){this[_0x41fb('0x16')]=_0x1714c2;}}}return![];}}if(_0x318497[_0x41fb('0x158')](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x41fb('0x6d')==='dUidR'){function _0x5e5d89(){_0x2fc076[_0x41fb('0x93')][_0x41fb('0x14f')][_0x41fb('0x27')](this),this[_0x41fb('0x13d')](),this[_0x41fb('0x127')](),this[_0x41fb('0x10b')]();}}else{const _0x520091=JSON[_0x41fb('0x32')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x28a7dd of _0x520091){if(!$gameSwitches[_0x41fb('0x179')](_0x28a7dd))return!![];}return![];}}if(_0x318497[_0x41fb('0x158')](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2f8053=JSON['parse']('['+RegExp['$1'][_0x41fb('0x158')](/\d+/g)+']');for(const _0x1a056d of _0x2f8053){if($gameSwitches[_0x41fb('0x179')](_0x1a056d))return![];}return!![];}return!![];},VisuMZ[_0x41fb('0x93')][_0x41fb('0x49')]=Window_ChoiceList[_0x41fb('0x2e')][_0x41fb('0x115')],Window_ChoiceList['prototype'][_0x41fb('0x115')]=function(){VisuMZ[_0x41fb('0x93')][_0x41fb('0x49')][_0x41fb('0x27')](this),this['clampPlacementPosition']();},Window_ChoiceList[_0x41fb('0x2e')][_0x41fb('0x1cf')]=function(){if(!this['_cancelButton'])return;const _0x42c7dc=0x8,_0x24ae21=this[_0x41fb('0x0')],_0x3802c1=this['x']+this[_0x41fb('0x97')],_0x56140d=Math[_0x41fb('0x169')]((Graphics[_0x41fb('0x97')]-Graphics[_0x41fb('0x3b')])/0x2);_0x3802c1>=Graphics[_0x41fb('0x3b')]+_0x56140d-_0x24ae21[_0x41fb('0x97')]+_0x42c7dc?_0x24ae21['x']=-_0x24ae21[_0x41fb('0x97')]-_0x42c7dc:_0x24ae21['x']=this['width']+_0x42c7dc,_0x24ae21['y']=this['height']/0x2-_0x24ae21[_0x41fb('0x1ea')]/0x2;},VisuMZ['MessageCore'][_0x41fb('0x1a8')]=Window_ChoiceList[_0x41fb('0x2e')][_0x41fb('0x173')],Window_ChoiceList[_0x41fb('0x2e')][_0x41fb('0x173')]=function(){return this[_0x41fb('0x98')]?this[_0x41fb('0x22b')]():VisuMZ[_0x41fb('0x93')][_0x41fb('0x1a8')][_0x41fb('0x27')](this);},Window_ChoiceList[_0x41fb('0x2e')][_0x41fb('0x22b')]=function(){const _0x158836=$gameMessage[_0x41fb('0x1a0')]();if(_0x158836===0x1){if(_0x41fb('0xb8')===_0x41fb('0x188')){function _0x2f2f7f(){return _0x41fb('0x15')[_0x41fb('0x19')](_0x403e6b,_0x19250f);}}else return(Graphics['boxWidth']-this[_0x41fb('0x13e')]())/0x2;}else{if(_0x158836===0x2){if(_0x41fb('0x5b')!==_0x41fb('0x1d2'))return this[_0x41fb('0x98')]['x']+this[_0x41fb('0x98')][_0x41fb('0x97')]-this[_0x41fb('0x13e')]();else{function _0x21e326(){_0x213026[_0x41fb('0x93')][_0x41fb('0x175')]('TextCodeReplace');for(const _0x4ed436 of _0x1d2ab1[_0x41fb('0x93')][_0x41fb('0x15d')][_0x41fb('0x184')]){_0x4ed436[_0x41fb('0x159')]=new _0x25ff9f(''+_0x4ed436[_0x41fb('0x3d')]+_0x4ed436[_0x41fb('0xf7')],'gi'),_0x4ed436[_0x41fb('0xbc')]!==''&&_0x4ed436['TextStr']!==_0x41fb('0x1a9')?_0x4ed436[_0x41fb('0x8f')]=new _0x1aad21(_0x41fb('0x1b5')+_0x4ed436[_0x41fb('0xbc')][_0x41fb('0x174')](/\\/g,'')+'\x27'):_0x4ed436['textCodeResult']=_0x4ed436[_0x41fb('0xff')];}}}}else{if(_0x41fb('0x218')===_0x41fb('0x218'))return this[_0x41fb('0x98')]['x'];else{function _0x9ed717(){_0x3e1a75['setFaceImage'](_0x171ee2[0x0],_0x4273a0[0x1]),_0xe5493d['setBackground'](_0x2f0d8d[0x2]),_0x3bde94[_0x41fb('0xab')](_0x4d41ec[0x3]),_0x37a1b4[_0x41fb('0x1e5')](_0x300595[0x4]);}}}}},Window_ChoiceList[_0x41fb('0x2e')][_0x41fb('0x13e')]=function(){const _0x41555e=(this[_0x41fb('0x11')]()+this[_0x41fb('0xea')]())*this['maxCols']()+this['padding']*0x2;return Math[_0x41fb('0xa1')](_0x41555e,Graphics[_0x41fb('0x97')]);},Window_ChoiceList[_0x41fb('0x2e')]['numVisibleRows']=function(){const _0x23b923=Math[_0x41fb('0x17c')]($gameMessage[_0x41fb('0x2d')]()[_0x41fb('0x2b')]/this[_0x41fb('0x6')]());return Math[_0x41fb('0xa1')](_0x23b923,this['maxLines']());},Window_ChoiceList[_0x41fb('0x2e')][_0x41fb('0x1b')]=function(){const _0x5caddd=this[_0x41fb('0x98')],_0x306e38=_0x5caddd?_0x5caddd['y']:0x0,_0x37ea31=_0x5caddd?_0x5caddd[_0x41fb('0x1ea')]:0x0,_0xd9f439=Graphics[_0x41fb('0x198')]/0x2;return _0x306e38<_0xd9f439&&_0x306e38+_0x37ea31>_0xd9f439?0x4:$gameSystem[_0x41fb('0x18d')]();},Window_ChoiceList[_0x41fb('0x2e')][_0x41fb('0x11')]=function(){let _0x4993e0=0x60;for(const _0x51fdaa of this['_list']){const _0x399445=_0x51fdaa[_0x41fb('0x1c4')],_0x5f0b91=this[_0x41fb('0x185')](_0x399445)[_0x41fb('0x97')],_0x37cbb9=Math[_0x41fb('0x17c')](_0x5f0b91)+this[_0x41fb('0x130')]()*0x2;if(_0x4993e0<_0x37cbb9){if(_0x41fb('0x1bc')!==_0x41fb('0x200'))_0x4993e0=_0x37cbb9;else{function _0x40c47f(){this[_0x41fb('0x101')]>0x0&&(this[_0x41fb('0x75')]()&&(this['x']=this['applyMoveEasing'](this['x'],this[_0x41fb('0x183')]),this['y']=this[_0x41fb('0xa7')](this['y'],this[_0x41fb('0x202')]),this['width']=this[_0x41fb('0xa7')](this[_0x41fb('0x97')],this[_0x41fb('0x17f')]),this[_0x41fb('0x1ea')]=this[_0x41fb('0xa7')](this[_0x41fb('0x1ea')],this[_0x41fb('0x18e')]),this[_0x41fb('0x10b')]()),this[_0x41fb('0x101')]--);}}}}return _0x4993e0;},Window_ChoiceList[_0x41fb('0x2e')][_0x41fb('0x1b1')]=function(_0x496c18){const _0x373f35=this[_0x41fb('0x1cb')](_0x496c18),_0x103fcb=$gameSystem[_0x41fb('0x13a')]()!==_0x41fb('0x125')?_0x41fb('0x171')[_0x41fb('0x19')]($gameSystem[_0x41fb('0x13a')]()):'',_0x4567aa=_0x103fcb+this[_0x41fb('0x99')](_0x496c18);this[_0x41fb('0x2')](this[_0x41fb('0xdf')](_0x496c18)),this[_0x41fb('0x20a')](_0x4567aa,_0x373f35['x'],_0x373f35['y'],_0x373f35['width']);},Window_ChoiceList[_0x41fb('0x2e')][_0x41fb('0x17a')]=function(){$gameMessage[_0x41fb('0x1b3')](this[_0x41fb('0x11a')]()),this[_0x41fb('0x98')][_0x41fb('0x190')](),this['close']();};