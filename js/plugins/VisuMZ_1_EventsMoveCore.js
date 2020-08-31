//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.01] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 *
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 *
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 *
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
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
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s).
 *
 *   Region ID(s)
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's self switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's self variable.
 * - Replace 'y' with a number value to set the self variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remotely run.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x927c=['updatePattern','Passability','RemovePreserve','Game_CharacterBase_characterIndex','hasEventIcon','initEventsMoveCoreSettings','moveForward','processMoveRouteJumpTo','updateWaitMode','DashModifier','PageId','metCPC','down','indexOf','KXsEn','VxDFU','LEFT','updateEventsMoveCoreTagChanges','_moveSynch','updateOpacity','reverseDir','hErNs','setOpacity','Game_CharacterBase_update','switches','HyPLk','iKEvm','ikWwV','Game_Player_checkEventTriggerThere','ARRAYSTRUCT','LGwoo','Game_Character_setMoveRoute','_eventCache','clearPose','update','checkSmartEventCollision','IFLHP','Game_Player_increaseSteps','NOTE','deltaXFrom','contents','itemPadding','locate','Game_Character_processMoveCommand','drawTextEx','wpTzy','PreloadedMaps','createSpawnedEventWithData','parent','setupEventsMoveCoreEffects','apply','RIGHT','charAt','duikO','setupCopyEvent','_target','frontX','useCarryPoseForIcons','filename','isNormalPriority','processMoveSynchMirrorHorz','command108','moveDiagonally','activationProximityDistance','Map%1-Event%2','gicVx','turnLeft90','oHLCg','Lqmpm','FALSE','OffsetX','none','hasCPCs','advancedFunc','anchor','checkAdvancedSwitchVariablePresent','Vehicle','JxGRb','hasMoveOnlyRegions','LEFT\x20TO\x20RIGHT','XIGaj','Game_Event_checkEventTriggerAuto','getMapSpawnedEventData','EventTemplates','getSelfTarget','VisuMZ_Setup_Preload_Map','eventLabelsVisible','BufferY','randomInt','EventLocationCreate','YfJNP','prepareSpawnedEventAtXY','Game_SelfSwitches_setValue','BalloonOffsetX','OCRnG','moveAwayFromPoint','KhPqo','DLdnT','Step2MapId','ADDITIVE','SwitchId','create','LOWER\x20LEFT','Game_Player_isDashing','sbalx','characterIndexVS8','screenY','Icon','activationProximityType','setValue','updateEventIconSprite','reverse\x20mimic','registerCommand','absDistance','SWEAT','ARRAYNUM','setBackgroundType','_characterName','start','deltaY','TgHue','Walk','processMoveRouteHugWall','processMoveSynchReverseMimic','Game_CharacterBase_isDashing','frontY','some','isTargetEventValidForLabelWindow','NOSld','_needsRefresh','createIconSprite','USER-DEFINED\x205','list','approach','Game_Variables_setValue','SELF\x20VARIABLE\x20%1','MUSIC','isAdvancedSwitch','eventsXyNt','Game_CharacterBase_moveStraight','createShadow','DefaultShadow','SelfSwitchABCD','MorphEventRemove','Settings','startCallEvent','deleteEventLocation','isTurnInPlace','initMembers','GNJbY','characterIndex','resetFontSettings','GetMoveSynchTarget','HURT','Game_Event_initialize','ROUTE_SCRIPT','away','WalkAllow','roundYWithDirection','createCharacterShadow','Uhcek','isPosing','asNgI','SPIN\x20CW','Game_Event_updateParallel','SelfSwitchID','processMoveCommandEventsMoveCore','rlrcs','requestAnimation','despawnAtXY','PostSpawnJS','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setEventLabelsVisible','_MapSpawnedEventData','includes','Player','PreMorphJS','forceMoveRoute','pNABr','Game_CharacterBase_direction','_advancedSwitchVariable','Region%1','CustomPageConditions','Game_CharacterBase_setDirection','EventForbid','_pattern','SCREEN','abs','sCOHI','Game_Interpreter_updateWaitMode','frruh','removeTemporaryMapSpawnedEvents','column','tTQaA','hasDragonbones','Sprite_Balloon_setup','sgWQm','reserveCommonEvent','parameters','meetActivationProximityConditions','clamp','qGLdN','initialize','isEventClickTriggered','fKFiH','getLastPluginCommandInterpreter','Game_Troop_meetsConditionsCPC','FlCGg','IconBlendMode','updateSelfMovement','key','turnTowardCharacter','isOnRope','checkEventTriggerAuto','meetActivationRegionConditions','isAdvancedVariable','_forceDashing','addChild','_comments','clearPageSettings','isPlaytest','setMoveRoute','VTYWB','Game_Map_setup','width','EventID','DpEUx','correctFacingDirection','setMovementSuccess','Game_Event_updateSelfMovement','AsDiW','isShadowVisible','WzFpX','trim','_characterSprites','regionList','_shadowSprite','checkEventTriggerEventsMoveCore','pZtZM','isAirship','_callEventData','characterPatternY','timer','clearEventCache','vert\x20mirror','moveTowardCharacter','updateMoveSynch','_event','boxWidth','getEventIconData','zSdXS','blendMode','SLEEP','_encounterEffectDuration','requestRefresh','pattern','isRegionDockable','turnAwayFromCharacter','MapId','Step1MapId','lineHeight','mxssL','backY','front','concat','_inputTime','isValid','_counter','nUZTq','SPIN\x20ACW','_interpreter','initEventsMoveCore','determineEventOverload','dEBgg','filter','setupPageSettings','SpawnEventAtXY','AdvancedVariables','updatePeriodicRefresh','KvxgD','_needsPeriodicRefresh','LFhTj','Collision','Region','updatePosition','AllAllow','clearDestination','SpawnEventDespawnRegions','VehicleDock','updateShadowChanges','_isObjectCharacter','refreshIfNeeded','NluFQ','Game_SelfSwitches_value','isTriggerIn','min','processMoveRouteMoveRepeat','Game_Map_event','FSKsu','LOWER\x20RIGHT','startMapCommonEventOnTouch','_text','ShowShadows','SlowerSpeed','forceDashing','mIqkZ','dashSpeedModifier','VS8','isAutoBufferIcon','OAiOp','floor','meetsSwitchCondition','MdWgP','isMoveOnlyRegionPassable','VisuMZ_1_MessageCore','OperateValues','_commonEventId','Game_Switches_value','SpawnEventDespawnEventID','setEventIconDataKey','_saveEventLocation','processMoveRouteStepToPlayer','isMoving','innerWidth','Game_Map_refresh','ScZwk','isAirshipPassable','Game_Variables_value','IconSet','FNHgL','aDYEx','advancedValue','IkGem','processMoveRouteSetIndex','Sprite_Character_initMembers','direction','_eventIconSprite','kdeHz','tztBK','Step1EventId','Game_CommonEvent_isActive','roundX','jump','_waitMode','terrainTag','textSizeEx','processMoveRouteAnimation','match','MoveAllSynchTargets','increaseSteps','isLandOk','Letter','isDiagonalDirection','setupEventsMoveCoreNotetags','firstSpawnedEventID','PreloadMaps','opacitySpeed','setImage','Game_CharacterBase_moveDiagonally','Game_Event_meetsConditions','getPosingCharacterPattern','uOmcs','getPreservedMorphEventData','lastSpawnedEventID','isEventRunning','createLabelWindowForTarget','setFrame','_type','tfjat','createContents','checkEventTriggerThere','eXcNH','TemplateName','Game_Vehicle_isLandOk','MUSIC\x20NOTE','eraseEvent','getPosingCharacterDirection','COLLAPSE','iconWidth','setup','status','TiltLeft','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_shadowGraphic','Game_Troop_meetsConditions','_spawnedEvents','command357','Event','switchId','drawIcon','sVCxf','StrictCollision','checkNeedForPeriodicRefresh','getSavedEventLocation','ZQKcQ','VehicleAllow','createSpawnedEvent','drawing','ItwQp','ITEM','qUvQQ','bind','GUjnf','format','mCYXN','_labelWindows','Game_CharacterBase_hasStepAnime','regionId','lastMovedDirection','turnRight90','setPattern','UPPER\x20LEFT','onLoadSuccess','clear','Game_CharacterBase_screenX','ATHOG','QUESTION','wSFZu','pageIndex','ZkudD','Scene_Boot_onDatabaseLoaded','iconIndex','processMoveRouteTeleportTo','_duration','processMoveRouteSelfVariable','GeusV','wTRbV','BgyFK','checkActivationProximity','setupChild','Step2EventId','SpawnEventDespawnEverything','_eventOverload','bWIKr','XdlEG','scale','sbcse','pos','hasAdvancedSwitchVariable','oAWlD','Game_CharacterBase_canPass','MoveRouteIndex','_filename','startEncounterEffect','createLabelWindows','Game_Character_forceMoveRoute','NPmaY','findTargetSprite','deltaX','SUYjh','HuhvL','getEventIconIndex','isEventOverloaded','FsMcy','log','xpcjt','isSaveEventLocation','VtoBn','SsDxV','SelfVariables','_character','initEventsMoveCoreEffects','mfVAC','startMapCommonEventOnOK','UNTITLED','TiltVert','Game_Switches_setValue','TRUE','updateTilt','isDashDisabled','ARRAYSTR','SpawnEventDespawnAtXY','PKIRf','roundY','sDSvz','_spriteOffsetX','characterName','onChange','$callEventMap','dpnRZ','description','gBWuy','processMoveSynchMimic','_eventId','toLowerCase','Enable','mWGLp','_CPCs','note','CPC','RegionOk','setMoveSpeed','bJUwc','boat','remove','turn180','jptjt','labelWindowText','FastForwardKey','BoTYU','NORMAL','shadowFilename','Game_Temp_setDestination','ShipSpeed','AutoBalloon','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20<Copy\x20Event>\x20usage.','airship','tcJhj','isNearTheScreen','isRegionAllowPass','autosaveEventLocation','General','VelQz','EventIconDelete','isBigCharacter','height','ZTgAI','prototype','backX','isAllowCharacterTilt','EventAutoMovement','Game_Player_isMapPassable','process_VisuMZ_EventsMoveCore_Switches_Variables','parse','setDirection','qGqpr','isPassableByAnyDirection','GAjxs','Spriteset_Map_createLowerLayer','posNt','zoomScale','_erased','checkCPCsPresent','return\x200','Visible','deleteSavedEventLocation','player','Window_Message_startMessage','fFosI','Dock','Game_Map_events','EventLabelVisible','Game_CharacterBase_increaseSteps','STR','morphInto','_alwaysUpdateMove','tYQvG','labelWindowRange','offsetX','Game_Event_refresh','setupEvents','IconSize','_EventIcons','executeMoveDir8','trigger','SLBbu','bitmap','_opacity','CarryPose','setBalloonPose','TVsRt','FontSize','_PreservedEventMorphData','LIGHT','RjtbG','uaGFz','_labelWindow','Name','Ntylh','visible','_tilemap','requestBalloon','_data','Movement','SILENCE','Game_Event_clearPageSettings','standing','moveTowardPoint','USER-DEFINED\x204','hasStepAnime','refresh','type','KZWPm','switch1Id','tuSPp','meetsCPC','SpawnEventAtRegion','bufferY','target','ZTBKK','Disable','All','ntmNB','_shadowOpacity','SzlQq','nZyjj','RegionOkTarget','processMoveSynchMirrorVert','Game_Event_event','dXOoX','_moveRoute','...','_eventMorphData','map','iLQYb','hideShadows','IconBufferY','UxOXc','processMoveRouteTeleportToCharacter','uQlhK','OFF','bufferX','Game_Map_parallelCommonEvents','XbKKE','Game_Map_update','BlendMode','processMoveSynch','mirror\x20horizontal','processMoveRouteJumpForward','Hidden','loadSystem','HEART','CPCsMet','_cpc','CDodX','Game_System_initialize','BULB','canPassDiagonally','UstEZ','HiyUl','OSdPw','setAllowEventAutoMovement','deleteIconsOnEventsData','onClickTrigger','Scene_Map_startEncounterEffect','zofiz','LineHeight','parallelCommonEvents','vehicle','KIbbP','code','MWWGU','IxaDQ','setLastPluginCommandInterpreter','removeMorph','checkEventsMoveCoreStringTags','Toggle','Airship','execute','copy','isBusy','kWlDk','removeChild','_diagonalSupport','_lastMovedDirection','IconBufferX','isShadowShrink','Label','fFfLn','avPnE','shadowY','split','_lastPluginCommandInterpreter','zbHXT','updateScale','PreCopyJS','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','iconHeight','vertical\x20mirror','PlayerForbid','CallEvent','isEventTest','ihWiN','processMoveRouteJumpToCharacter','EventIconChange','isRunning','SPIN\x20CLOCKWISE','page','qyoQn','isRegionForbidPass','checkValidEventerMap','%1Dock','_moveRouteIndex','isPressed','switch2Id','MUSICNOTE','mirror\x20vert','_patternLocked','checkRegionEventTrigger','max','_spriteset','Ship','return\x20%1','isSupportDiagonalMovement','loadDataFile','processMoveSynchAway','_saveEventLocations','CjkkR','SPIN\x20CCW','USER-DEFINED\x201','slice','posEventsMoveCore','processMoveRouteMoveToCharacter','ARRAYJSON','kvtBc','fBjmW','pluginCommandCallEvent','setupEventsMoveCoreCommentTags','Template','offsetY','processMoveRouteMoveUntilStop','USER-DEFINED\x203','_eventOverloadThreshold','KNEEL','deleteSavedEventLocationKey','SPIN\x20COUNTERCLOCKWISE','onDatabaseLoaded','deleteIconsOnEventsDataKey','horz\x20mirror','canStartLocalEvents','deltaYFrom','qFLht','PostMorphJS','ZZZ','isActive','SPIN\x20ANTICLOCKWISE','vjbjE','_callEventMap','spawnPreserved','isSpriteVS8dir','isDashingEnabled','_stopCount','roundXWithDirection','OffsetY','jumpHeight','umyRM','_moveSpeed','custom','AllForbid','GqYkh','Game_Map_setupEvents','clearSelfTarget','_eventSpawnData','_eventCopyData','RyRtw','_activationProximity','Sprite_Balloon_updatePosition','meetsConditions','%1%2','_scene','Game_Player_getInputDirection','initMembersEventsMoveCore','YJYuI','_selfTarget','setupDiagonalSupport','_vehicleType','despawnRegions','characterPatternYVS8','Forbid','isOnLadder','loadCPC','_activationProximityAutoTriggerBypass','_SavedEventLocations','ANNOYED','PzbvJ','switch2Valid','Game_Map_isDashDisabled','mapId','HhkaU','eventsXy','moveByInput','Game_CharacterBase_pattern','setupMorphEvent','isBattleTest','deletePreservedMorphEventDataKey','_pose','hasClickTrigger','BsIpm','getInputDirection','exit','AdvancedSwitches','savePreservedMorphEventDataKey','searchLimit','Game_Vehicle_isMapPassable','moveStraight','COBWEB','moveSynchTarget','sIPCZ','RRCkr','YkPRw','updatePose','updateShadow','Qerdx','visibleRange','CuJrR','shadowX','EGYZw','fittingHeight','qGNMc','setupSaveEventLocations','xZSSs','Game_Event_meetsConditionsCPC','value','splice','isJumping','Game_Event_findProperPageIndex','processMoveRouteStepTo','BufferX','despawnEventId','Scene_Load_onLoadSuccess','isSelfSwitch','processMoveSynchApproach','FavorHorz','processMoveRouteStepToCharacter','getDirectionToPoint','mirror\x20vertical','urlDb','Operation','setSelfValue','NiniU','clearSpriteOffsets','AutoBuffer','updatePatternEventsMoveCore','canPass','opacity','OgTNx','isPassable','BoatSpeed','kCJgi','hSKJZ','setupRegionRestrictions','CeNvt','conditions','findProperPageIndex','_mapId','screenX','frameCount','autoEventIconBuffer','Game_Player_executeMove','setDiagonalDirection','_regionRules','template','windowPadding','_pageIndex','restoreSavedEventPosition','zdfdX','GIJmh','Map%1.json','Game_CharacterBase_updatePattern','updateText','setupSpawnedEvents','zKwGB','replace','turnAwayFromPoint','createShadows','defaultFontSize','Value','turnTowardPoint','rotation','selfValue','iwsfw','SELF\x20SWITCH\x20%1','_eventIcon','constructor','iFqJi','event','JfQNg','processMoveRouteBalloon','Window_ScrollText_startMessage','ANGER','uFWkD','PlayerIconChange','pageId','createSaveEventLocationData','NgFlJ','getInputDir8','morphIntoTemplate','isSaveEventLocations','registerSelfEvent','npdWv','region','DiagonalSpeedMultiplier','Allow','ccTbK','setDestination','setupSpawn','_trigger','isCollidedWithEvents','OpacitySpeed','text','directionOnLadderSpriteVS8dir','_poseDuration','UTxWm','Game_Player_checkEventTriggerHere','radius','PostCopyJS','MUSIC-NOTE','Game_Event_setupPageSettings','destinationY','_selfEvent','CkqOj','moveAwayFromCharacter','Game_Event_start','_moveOnlyRegions','BalloonOffsetY','_addedHitbox','_stepPattern','variables','XKuqx','EventLocationSave','_spriteOffsetY','moveSynchType','Game_Enemy_meetsSwitchCondition','executeMove','StopAutoMoveEvents','checkEventTriggerHere','_commonEvents','makeDeepCopy','FzWCL','SelfSwitches','EventLocationDelete','UPPER\x20RIGHT','prepareSpawnedEventAtRegion','adjustDir8MovementSpeed','name','updateVS8BalloonOffsets','pages','getPosingCharacterIndex','isAnyEventStarting','YKaWF','gflBy','VisuMZ_2_DragonbonesUnion','%1DockRegionOnly','Gyjil','LOVE','EventId','EBLDb','eventId','Sprite_Character_update','PosY','cTZQS','fontSize','isLabelVisible','AirshipSpeed','clearStepPattern','clearDashing','%1Forbid','TerrainTag','aDzHO','TIsPZ','VICTORY','AWASe','bVkxf','setDashingEnabled','getDirectionFromPoint','destinationX','round','realMoveSpeed','VehicleForbid','LKJTP','MapID','Spriteset_Map_createShadow','left','findDirectionTo','DOWN','toUpperCase','isDashingAndMoving','setPose','Game_Interpreter_executeCommand','LIGHTBULB','startMessage','lqRqy','distance','isSpawnedEvent','isMapPassable','isAllowEventAutoMovement','Sprite_Character_characterPatternY','_dragonbones','IPXNM','MorphEventTo','call','processMoveRoutePatternLock','EventLabelRefresh','saveEventLocation','EventsMoveCore','ZxDSf','Game_Interpreter_PluginCommand','iconSize','right','EnableTurnInPlace','bZSUJ','events','MULTIPLY','executeCommand','determineCommonEventsWithCPC','length','AozuI','HMPH','FUNC','push','Game_CharacterBase_realMoveSpeed','isSelfVariable','IconIndex','contentsOpacity','_spawnData','findDiagonalDirectionTo','Boat','startMapCommonEventOnOKTarget','PreSpawnJS','dir8','updateMove','HNLKz','TiltRight','LIGHT\x20BULB','processMoveSynchCustom','_clickTrigger','setEventIconData','ybxIO','isInVehicle','qOjAa','PlayerAllow','Game_CharacterBase_initMembers','Stop','processMoveRouteMoveTo','moveRouteIndex','VisibleEventLabels','GRPAH','vKZZj','pVJGC','canMove','lastSpawnedEvent','createLowerLayer','isDestinationValid','activationRegionList','Game_Message_add','EXCLAMATION','NvLjG','isPreventSelfMovement','AutoMoveEvents','DashingEnable','WalkForbid','PosX','jjbsh','version','IchFr','XKwyQ','_EventsMoveCoreSettings','registerSelfTarget','_periodicRefreshTimer','delay','processMoveSynchRandom','updateParallel','isDashing','isShip','ConvertParams','$preloadedMap_%1','padZero','JiKHe'];(function(_0x1a2b97,_0x927cb0){const _0x29000d=function(_0x5e5136){while(--_0x5e5136){_0x1a2b97['push'](_0x1a2b97['shift']());}};_0x29000d(++_0x927cb0);}(_0x927c,0xd2));const _0x2900=function(_0x1a2b97,_0x927cb0){_0x1a2b97=_0x1a2b97-0x0;let _0x29000d=_0x927c[_0x1a2b97];return _0x29000d;};var label=_0x2900('0x306'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2900('0x40')](function(_0x4b9644){return _0x4b9644[_0x2900('0xaa')]&&_0x4b9644[_0x2900('0x10e')]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x2900('0x3e0')]=VisuMZ[label][_0x2900('0x3e0')]||{},VisuMZ[_0x2900('0x34c')]=function(_0x36f144,_0x490fe9){for(const _0xd0e59f in _0x490fe9){if(_0xd0e59f[_0x2900('0x89')](/(.*):(.*)/i)){if(_0x2900('0x411')===_0x2900('0xf0')){function _0x19cc07(){if(_0x5b7c8b[_0x2900('0x125')])this[_0x2900('0x119')](_0x4e4a78[_0x2900('0x125')]);}}else{const _0x3a9e5e=String(RegExp['$1']),_0x549c2a=String(RegExp['$2'])[_0x2900('0x2f3')]()[_0x2900('0x17')]();let _0x56e797,_0x32d177,_0x122bb3;switch(_0x549c2a){case'NUM':_0x56e797=_0x490fe9[_0xd0e59f]!==''?Number(_0x490fe9[_0xd0e59f]):0x0;break;case _0x2900('0x3c3'):_0x32d177=_0x490fe9[_0xd0e59f]!==''?JSON['parse'](_0x490fe9[_0xd0e59f]):[],_0x56e797=_0x32d177[_0x2900('0x189')](_0x4598d6=>Number(_0x4598d6));break;case'EVAL':_0x56e797=_0x490fe9[_0xd0e59f]!==''?eval(_0x490fe9[_0xd0e59f]):null;break;case'ARRAYEVAL':_0x32d177=_0x490fe9[_0xd0e59f]!==''?JSON[_0x2900('0x139')](_0x490fe9[_0xd0e59f]):[],_0x56e797=_0x32d177[_0x2900('0x189')](_0x1be407=>eval(_0x1be407));break;case'JSON':_0x56e797=_0x490fe9[_0xd0e59f]!==''?JSON[_0x2900('0x139')](_0x490fe9[_0xd0e59f]):'';break;case _0x2900('0x1ed'):_0x32d177=_0x490fe9[_0xd0e59f]!==''?JSON[_0x2900('0x139')](_0x490fe9[_0xd0e59f]):[],_0x56e797=_0x32d177[_0x2900('0x189')](_0x505033=>JSON[_0x2900('0x139')](_0x505033));break;case _0x2900('0x314'):_0x56e797=_0x490fe9[_0xd0e59f]!==''?new Function(JSON[_0x2900('0x139')](_0x490fe9[_0xd0e59f])):new Function(_0x2900('0x143'));break;case'ARRAYFUNC':_0x32d177=_0x490fe9[_0xd0e59f]!==''?JSON['parse'](_0x490fe9[_0xd0e59f]):[],_0x56e797=_0x32d177[_0x2900('0x189')](_0x1b3f7f=>new Function(JSON[_0x2900('0x139')](_0x1b3f7f)));break;case _0x2900('0x14d'):_0x56e797=_0x490fe9[_0xd0e59f]!==''?String(_0x490fe9[_0xd0e59f]):'';break;case _0x2900('0x104'):_0x32d177=_0x490fe9[_0xd0e59f]!==''?JSON['parse'](_0x490fe9[_0xd0e59f]):[],_0x56e797=_0x32d177['map'](_0xf53f7=>String(_0xf53f7));break;case'STRUCT':_0x122bb3=_0x490fe9[_0xd0e59f]!==''?JSON['parse'](_0x490fe9[_0xd0e59f]):{},_0x36f144[_0x3a9e5e]={},VisuMZ[_0x2900('0x34c')](_0x36f144[_0x3a9e5e],_0x122bb3);continue;case _0x2900('0x36d'):_0x32d177=_0x490fe9[_0xd0e59f]!==''?JSON[_0x2900('0x139')](_0x490fe9[_0xd0e59f]):[],_0x56e797=_0x32d177[_0x2900('0x189')](_0x43b98b=>VisuMZ[_0x2900('0x34c')]({},JSON[_0x2900('0x139')](_0x43b98b)));break;default:continue;}_0x36f144[_0x3a9e5e]=_0x56e797;}}}return _0x36f144;},(_0x2f9e13=>{const _0x3b4fb0=_0x2f9e13[_0x2900('0x2ca')];for(const _0x13e979 of dependencies){if(!Imported[_0x13e979]){if('ABiIC'!=='ANdpB'){alert(_0x2900('0x3fb')['format'](_0x3b4fb0,_0x13e979)),SceneManager[_0x2900('0x239')]();break;}else{function _0x1babc2(){const _0xc7062f=[_0x57bdc8[_0x2900('0x270')],_0x4e1017['_eventId'],_0x2900('0x28b')[_0x2900('0xc1')](_0x3ed8fc)];_0xc73bc7[_0x2900('0x3bd')](_0xc7062f,_0x57a464);}}}}const _0xbf3202=_0x2f9e13[_0x2900('0x10e')];if(_0xbf3202['match'](/\[Version[ ](.*?)\]/i)){const _0x2d05c9=Number(RegExp['$1']);if(_0x2d05c9!==VisuMZ[label][_0x2900('0x341')]){if(_0x2900('0x10d')===_0x2900('0x10d'))alert(_0x2900('0xac')[_0x2900('0xc1')](_0x3b4fb0,_0x2d05c9)),SceneManager[_0x2900('0x239')]();else{function _0x8b0340(){return this[_0x2900('0x13a')](0x3);}}}}if(_0xbf3202['match'](/\[Tier[ ](\d+)\]/i)){const _0x3ecf5b=Number(RegExp['$1']);if(_0x3ecf5b<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x2900('0xc1')](_0x3b4fb0,_0x3ecf5b,tier)),SceneManager[_0x2900('0x239')]();else{if(_0x2900('0x331')!==_0x2900('0x114'))tier=Math[_0x2900('0x1df')](_0x3ecf5b,tier);else{function _0x5d3a71(){if(this[_0x2900('0x207')]()){const _0x2939bd=['',_0x2900('0x339'),_0x2900('0xce'),_0x2900('0xa4'),_0x2900('0x19b'),_0x2900('0x293'),_0x2900('0x3c2'),'COBWEB',_0x2900('0x16c'),'LIGHT\x20BULB','ZZZ','','','','',''][_0x4cee72];this[_0x2900('0x2f5')](_0x2939bd,_0x53ae1f);}}}}}VisuMZ[_0x2900('0x34c')](VisuMZ[label][_0x2900('0x3e0')],_0x2f9e13[_0x2900('0x416')]);})(pluginData),VisuMZ[_0x2900('0x69')]=function(_0xa76830,_0x2aa6eb,_0x578653){switch(_0x578653){case'=':return _0x2aa6eb;break;case'+':return _0xa76830+_0x2aa6eb;break;case'-':return _0xa76830-_0x2aa6eb;break;case'*':return _0xa76830*_0x2aa6eb;break;case'/':return _0xa76830/_0x2aa6eb;break;case'%':return _0xa76830%_0x2aa6eb;break;}return _0xa76830;},PluginManager[_0x2900('0x3c0')](pluginData[_0x2900('0x2ca')],_0x2900('0x33c'),_0x1e7b4b=>{VisuMZ['ConvertParams'](_0x1e7b4b,_0x1e7b4b);switch(_0x1e7b4b['Value']){case _0x2900('0x2a0'):$gameSystem['setAllowEventAutoMovement'](!![]);break;case _0x2900('0x32c'):$gameSystem[_0x2900('0x1a5')](![]);break;case _0x2900('0x1b4'):$gameSystem[_0x2900('0x1a5')](!$gameSystem[_0x2900('0x2fd')]());break;}}),PluginManager['registerCommand'](pluginData[_0x2900('0x2ca')],'CallEvent',_0x3e95b1=>{VisuMZ[_0x2900('0x34c')](_0x3e95b1,_0x3e95b1);const _0x24d251={'mapId':_0x3e95b1['MapId'],'eventId':_0x3e95b1[_0x2900('0x2d5')],'pageId':_0x3e95b1[_0x2900('0x35a')]};if(_0x24d251[_0x2900('0x22d')]<=0x0)_0x24d251['mapId']=$gameMap?$gameMap[_0x2900('0x22d')]():0x1;$gameTemp[_0x2900('0x41d')]()[_0x2900('0x1f0')](_0x24d251);}),PluginManager[_0x2900('0x3c0')](pluginData[_0x2900('0x2ca')],'DashEnableToggle',_0x4fc877=>{VisuMZ[_0x2900('0x34c')](_0x4fc877,_0x4fc877);switch(_0x4fc877['Value']){case _0x2900('0x113'):$gameSystem[_0x2900('0x2e7')](!![]);break;case _0x2900('0x17c'):$gameSystem['setDashingEnabled'](![]);break;case _0x2900('0x1b4'):$gameSystem['setDashingEnabled'](!$gameSystem['isDashingEnabled']());break;}}),PluginManager[_0x2900('0x3c0')](pluginData[_0x2900('0x2ca')],_0x2900('0x1d0'),_0x2fdf70=>{VisuMZ[_0x2900('0x34c')](_0x2fdf70,_0x2fdf70),_0x2fdf70[_0x2900('0x30')]=_0x2fdf70[_0x2900('0x30')]||$gameMap[_0x2900('0x22d')](),$gameSystem['setEventIconDataKey'](_0x2fdf70[_0x2900('0x30')],_0x2fdf70[_0x2900('0x2d5')],_0x2fdf70[_0x2900('0x318')],_0x2fdf70[_0x2900('0x1bd')],_0x2fdf70[_0x2900('0x18c')],_0x2fdf70['IconBlendMode']);}),PluginManager[_0x2900('0x3c0')](pluginData[_0x2900('0x2ca')],_0x2900('0x12f'),_0x22efc6=>{VisuMZ[_0x2900('0x34c')](_0x22efc6,_0x22efc6),_0x22efc6[_0x2900('0x30')]=_0x22efc6[_0x2900('0x30')]||$gameMap[_0x2900('0x22d')](),$gameSystem[_0x2900('0x1fb')](_0x22efc6[_0x2900('0x30')],_0x22efc6[_0x2900('0x2d5')]);}),PluginManager[_0x2900('0x3c0')](pluginData[_0x2900('0x2ca')],_0x2900('0x304'),_0x41a118=>{if($gameMap)for(const _0x3b4e8b of $gameMap[_0x2900('0x30d')]()){_0x3b4e8b[_0x2900('0x172')]();}}),PluginManager[_0x2900('0x3c0')](pluginData[_0x2900('0x2ca')],_0x2900('0x14b'),_0x564493=>{VisuMZ['ConvertParams'](_0x564493,_0x564493);switch(_0x564493[_0x2900('0x286')]){case _0x2900('0x144'):$gameSystem['setEventLabelsVisible'](!![]);break;case _0x2900('0x199'):$gameSystem[_0x2900('0x3fc')](![]);break;case _0x2900('0x1b4'):$gameSystem[_0x2900('0x3fc')](!$gameSystem[_0x2900('0x3a6')]());break;}}),PluginManager[_0x2900('0x3c0')](pluginData[_0x2900('0x2ca')],_0x2900('0x2bb'),_0x402199=>{VisuMZ['ConvertParams'](_0x402199,_0x402199);if(!$gameMap)return;const _0x521138=$gameMap[_0x2900('0x28f')](_0x402199[_0x2900('0x2d5')]);if(_0x521138)_0x521138[_0x2900('0x305')]();}),PluginManager[_0x2900('0x3c0')](pluginData[_0x2900('0x2ca')],_0x2900('0x2c6'),_0x3c6cc6=>{VisuMZ[_0x2900('0x34c')](_0x3c6cc6,_0x3c6cc6);const _0x2a412a=_0x3c6cc6[_0x2900('0x30')]||$gameMap[_0x2900('0x22d')](),_0xe7c557=_0x3c6cc6[_0x2900('0x2d5')];$gameSystem[_0x2900('0x1f8')](_0x2a412a,_0xe7c557);}),PluginManager[_0x2900('0x3c0')](pluginData[_0x2900('0x2ca')],_0x2900('0x3a9'),_0x3464d7=>{VisuMZ['ConvertParams'](_0x3464d7,_0x3464d7);const _0x13c296=_0x3464d7[_0x2900('0x30')]||$gameMap[_0x2900('0x22d')](),_0x10d11e=_0x3464d7[_0x2900('0x2d5')]||0x1,_0x5ac0c6=_0x3464d7[_0x2900('0x33f')]||0x0,_0x1fa641=_0x3464d7[_0x2900('0x2d9')]||0x0,_0x3ed578=_0x3464d7['Direction']||0x2,_0x1f5861=((_0x3464d7[_0x2900('0x35a')]||0x1)-0x1)[_0x2900('0x418')](0x0,0x13),_0x2f6b14=_0x3464d7[_0x2900('0xe7')]||0x0;$gameSystem[_0x2900('0x297')](_0x13c296,_0x10d11e,_0x5ac0c6,_0x1fa641,_0x3ed578,_0x1f5861,_0x2f6b14);}),PluginManager[_0x2900('0x3c0')](pluginData['name'],_0x2900('0x301'),_0x151911=>{VisuMZ[_0x2900('0x34c')](_0x151911,_0x151911);if(!$gameMap)return;const _0x2fdaef=_0x151911['Step2Preserve'];_0x151911[_0x2900('0x31')]=_0x151911[_0x2900('0x31')]||$gameMap[_0x2900('0x22d')](),_0x151911[_0x2900('0x3b2')]=_0x151911[_0x2900('0x3b2')]||$gameMap[_0x2900('0x22d')](),_0x151911[_0x2900('0xa2')]=_0x151911[_0x2900('0xa2')][_0x2900('0x2f3')]()[_0x2900('0x17')]();if(!_0x2fdaef&&_0x151911[_0x2900('0x31')]!==$gameMap['mapId']())return;if($gameMap['mapId']()===_0x151911[_0x2900('0x31')]){const _0x2f0c78=$gameMap[_0x2900('0x28f')](_0x151911[_0x2900('0x81')]);if(!_0x2f0c78)return;if(_0x151911[_0x2900('0xa2')]!==_0x2900('0xfe'))_0x2f0c78[_0x2900('0x29a')](_0x151911[_0x2900('0xa2')]);else{if(_0x2900('0x21e')!=='eMWES')_0x2f0c78['morphInto'](_0x151911[_0x2900('0x3b2')],_0x151911[_0x2900('0xdc')]);else{function _0x4ef687(){if(this[_0x2900('0x228')]===_0x5c6d49)this[_0x2900('0x3d')]();const _0x5f58ef=_0x2900('0x390')[_0x2900('0xc1')](_0x126d5c,_0x7e6bc2);this[_0x2900('0x228')][_0x5f58ef]={'direction':_0x4d907c,'x':_0x1e351d[_0x2900('0x2ea')](_0x5afb17),'y':_0x4da01a[_0x2900('0x2ea')](_0x49047b),'pageIndex':_0x1737c6,'moveRouteIndex':_0x4cd3d9};}}}}_0x2fdaef&&$gameSystem[_0x2900('0x23b')](_0x151911[_0x2900('0x31')],_0x151911[_0x2900('0x81')],_0x151911[_0x2900('0xa2')],_0x151911[_0x2900('0x3b2')],_0x151911['Step2EventId']);}),PluginManager[_0x2900('0x3c0')](pluginData[_0x2900('0x2ca')],_0x2900('0x3df'),_0x425238=>{VisuMZ[_0x2900('0x34c')](_0x425238,_0x425238);if(!$gameMap)return;_0x425238[_0x2900('0x30')]=_0x425238['MapId']||$gameMap[_0x2900('0x22d')]();if($gameMap[_0x2900('0x22d')]()===_0x425238[_0x2900('0x30')]){if(_0x2900('0x24a')===_0x2900('0x24a')){const _0x287952=$gameMap['event'](_0x425238['EventId']);_0x287952[_0x2900('0x1b2')]();}else{function _0x4f1a78(){_0x418f01=_0x4a6801(_0x365b39['$1']),_0x311c7b=_0x599659(_0x538bf7['$2']);}}}_0x425238[_0x2900('0x352')]&&$gameSystem[_0x2900('0x234')](_0x425238[_0x2900('0x30')],_0x425238['EventId']);}),PluginManager[_0x2900('0x3c0')](pluginData[_0x2900('0x2ca')],_0x2900('0x295'),_0x46e098=>{VisuMZ[_0x2900('0x34c')](_0x46e098,_0x46e098),$gameSystem[_0x2900('0x326')]($gamePlayer,_0x46e098[_0x2900('0x318')],_0x46e098[_0x2900('0x1bd')],_0x46e098[_0x2900('0x18c')],_0x46e098[_0x2900('0x420')]);}),PluginManager[_0x2900('0x3c0')](pluginData[_0x2900('0x2ca')],'PlayerIconDelete',_0x3527ff=>{VisuMZ[_0x2900('0x34c')](_0x3527ff,_0x3527ff),$gameSystem[_0x2900('0x1a6')]($gamePlayer);}),PluginManager['registerCommand'](pluginData[_0x2900('0x2ca')],_0x2900('0x3de'),_0x302c61=>{VisuMZ[_0x2900('0x34c')](_0x302c61,_0x302c61),_0x302c61[_0x2900('0x30')]=_0x302c61[_0x2900('0x30')]||$gameMap['mapId']();const _0x1825c4=[_0x302c61[_0x2900('0x30')],_0x302c61[_0x2900('0x2d5')],_0x302c61[_0x2900('0x8d')]];switch(_0x302c61[_0x2900('0x286')]){case'ON':$gameSelfSwitches[_0x2900('0x3bd')](_0x1825c4,!![]);break;case _0x2900('0x190'):$gameSelfSwitches[_0x2900('0x3bd')](_0x1825c4,![]);break;case _0x2900('0x1b4'):$gameSelfSwitches[_0x2900('0x3bd')](_0x1825c4,!$gameSelfSwitches[_0x2900('0x250')](_0x1825c4));break;}}),PluginManager[_0x2900('0x3c0')](pluginData[_0x2900('0x2ca')],_0x2900('0x3f5'),_0x413928=>{VisuMZ['ConvertParams'](_0x413928,_0x413928),_0x413928[_0x2900('0x30')]=_0x413928[_0x2900('0x30')]||$gameMap['mapId']();const _0x4aebd7=[_0x413928['MapId'],_0x413928[_0x2900('0x2d5')],_0x2900('0x28b')[_0x2900('0xc1')](_0x413928[_0x2900('0x3b4')])];switch(_0x413928[_0x2900('0x286')]){case'ON':$gameSelfSwitches[_0x2900('0x3bd')](_0x4aebd7,!![]);break;case'OFF':$gameSelfSwitches[_0x2900('0x3bd')](_0x4aebd7,![]);break;case _0x2900('0x1b4'):$gameSelfSwitches[_0x2900('0x3bd')](_0x4aebd7,!$gameSelfSwitches['value'](_0x4aebd7));break;}}),PluginManager['registerCommand'](pluginData[_0x2900('0x2ca')],'SelfVariableID',_0x246a05=>{VisuMZ[_0x2900('0x34c')](_0x246a05,_0x246a05);const _0x58b89c=[_0x246a05[_0x2900('0x30')],_0x246a05[_0x2900('0x2d5')],'SELF\x20VARIABLE\x20%1'[_0x2900('0xc1')](_0x246a05['VariableId'])];_0x246a05['MapId']=_0x246a05[_0x2900('0x30')]||$gameMap[_0x2900('0x22d')]();const _0x185312=VisuMZ[_0x2900('0x69')]($gameSelfSwitches[_0x2900('0x250')](_0x58b89c),_0x246a05[_0x2900('0x286')],_0x246a05[_0x2900('0x25f')]);$gameSelfSwitches[_0x2900('0x3bd')](_0x58b89c,_0x185312);}),PluginManager[_0x2900('0x3c0')](pluginData[_0x2900('0x2ca')],_0x2900('0x42'),_0x1883f2=>{VisuMZ[_0x2900('0x34c')](_0x1883f2,_0x1883f2);const _0x7667a5={'template':_0x1883f2['TemplateName'],'mapId':_0x1883f2[_0x2900('0x30')],'eventId':_0x1883f2[_0x2900('0x2d5')],'x':_0x1883f2['PosX'],'y':_0x1883f2[_0x2900('0x2d9')],'spawnPreserved':_0x1883f2[_0x2900('0x0')],'spawnEventId':$gameMap['_spawnedEvents'][_0x2900('0x311')]+0x3e8};$gameMap['prepareSpawnedEventAtXY'](_0x7667a5,_0x1883f2[_0x2900('0x48')],_0x1883f2[_0x2900('0x351')]);}),PluginManager['registerCommand'](pluginData['name'],_0x2900('0x178'),_0x2d2482=>{VisuMZ[_0x2900('0x34c')](_0x2d2482,_0x2d2482);const _0x8aa1f5={'template':_0x2d2482[_0x2900('0xa2')],'mapId':_0x2d2482[_0x2900('0x30')],'eventId':_0x2d2482[_0x2900('0x2d5')],'x':-0x1,'y':-0x1,'spawnPreserved':_0x2d2482[_0x2900('0x0')],'spawnEventId':$gameMap['_spawnedEvents'][_0x2900('0x311')]+0x3e8};$gameMap[_0x2900('0x2c8')](_0x8aa1f5,_0x2d2482[_0x2900('0x49')],_0x2d2482[_0x2900('0x48')],_0x2d2482['Passability']);}),PluginManager[_0x2900('0x3c0')](pluginData['name'],_0x2900('0x6c'),_0x2f76b6=>{VisuMZ[_0x2900('0x34c')](_0x2f76b6,_0x2f76b6),$gameMap[_0x2900('0x256')](_0x2f76b6[_0x2900('0xf')]);}),PluginManager['registerCommand'](pluginData['name'],_0x2900('0x105'),_0x46991=>{VisuMZ['ConvertParams'](_0x46991,_0x46991);const _0x5c7a6b=_0x46991['PosX'],_0x285bf8=_0x46991['PosY'];$gameMap[_0x2900('0x3f9')](_0x5c7a6b,_0x285bf8);}),PluginManager[_0x2900('0x3c0')](pluginData['name'],_0x2900('0x4d'),_0x28fa5a=>{VisuMZ[_0x2900('0x34c')](_0x28fa5a,_0x28fa5a),$gameMap[_0x2900('0x222')](_0x28fa5a['Region']);}),PluginManager['registerCommand'](pluginData['name'],_0x2900('0xdd'),_0x1b4a46=>{VisuMZ[_0x2900('0x34c')](_0x1b4a46,_0x1b4a46),$gameMap['despawnEverything']();}),VisuMZ[_0x2900('0x306')][_0x2900('0xd2')]=Scene_Boot[_0x2900('0x133')][_0x2900('0x1fa')],Scene_Boot['prototype'][_0x2900('0x1fa')]=function(){VisuMZ[_0x2900('0x306')][_0x2900('0xd2')]['call'](this),this['process_VisuMZ_EventsMoveCore_LoadTemplateMaps'](),this['process_VisuMZ_EventsMoveCore_Switches_Variables']();if(VisuMZ['EventsMoveCore']['CustomPageConditions'])VisuMZ[_0x2900('0x306')][_0x2900('0x406')][_0x2900('0x41a')]();},VisuMZ[_0x2900('0x37e')]=[],VisuMZ[_0x2900('0x3a3')]={},Scene_Boot[_0x2900('0x133')][_0x2900('0x1c8')]=function(){if(DataManager[_0x2900('0x233')]()||DataManager['isEventTest']())return;const _0x1affc8=VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x1f2')],_0x16da26=_0x1affc8[_0x2900('0x91')]['slice'](0x0);for(const _0x3f1184 of _0x1affc8['List']){if(_0x2900('0x3b1')!==_0x2900('0x3b1')){function _0xbcc5b(){const _0x418cef=_0x20cbb8[_0x2900('0x1f6')];this['_eventOverload']=this[_0x2900('0x30d')]()[_0x2900('0x311')]>_0x418cef;if(this[_0x2900('0xde')]&&_0x35f4df[_0x2900('0xa')]()){}}}else{_0x3f1184['Name']=_0x3f1184['Name'][_0x2900('0x2f3')]()['trim'](),VisuMZ[_0x2900('0x3a3')][_0x3f1184[_0x2900('0x165')]]=_0x3f1184;if(!_0x16da26[_0x2900('0x3fe')](_0x3f1184['MapID']))_0x16da26[_0x2900('0x315')](_0x3f1184[_0x2900('0x2ee')]);}}for(const _0x2b4368 of _0x16da26){if(VisuMZ['PreloadedMaps'][_0x2b4368])continue;const _0x2b7976=_0x2900('0x27d')[_0x2900('0xc1')](_0x2b4368[_0x2900('0x34e')](0x3)),_0x3a7d1f=_0x2900('0x34d')[_0x2900('0xc1')](_0x2b4368);DataManager['loadDataFile'](_0x3a7d1f,_0x2b7976),setTimeout(this[_0x2900('0x3a5')][_0x2900('0xbf')](this,_0x2b4368,_0x3a7d1f),0x64);}},Scene_Boot[_0x2900('0x133')][_0x2900('0x3a5')]=function(_0x57f7b8,_0x7a14ae){if(window[_0x7a14ae]){if('duikO'!==_0x2900('0x385')){function _0x2e4f73(){const _0x1437ef=this['direction']();return _0x440dd8[_0x2900('0x3ee')](this['y'],_0x1437ef);}}else VisuMZ[_0x2900('0x37e')][_0x57f7b8]=window[_0x7a14ae],window[_0x7a14ae]=undefined;}else{if(_0x2900('0x41f')!==_0x2900('0xdf'))setTimeout(this[_0x2900('0x3a5')][_0x2900('0xbf')](this,_0x57f7b8,_0x7a14ae),0x64);else{function _0xc50f31(){this[_0x2900('0x168')][_0x2900('0x1ba')](_0x3a73e9[_0x2900('0x1a')]);}}}},VisuMZ[_0x2900('0x23a')]=[],VisuMZ[_0x2900('0x2c5')]=[],VisuMZ[_0x2900('0x43')]=[],VisuMZ[_0x2900('0xf9')]=[],Scene_Boot['prototype'][_0x2900('0x138')]=function(){for(let _0x3e4d8a=0x1;_0x3e4d8a<$dataSystem[_0x2900('0x368')][_0x2900('0x311')];_0x3e4d8a++){if($dataSystem[_0x2900('0x368')][_0x3e4d8a][_0x2900('0x89')](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x2900('0x23a')][_0x2900('0x315')](_0x3e4d8a);if($dataSystem[_0x2900('0x368')][_0x3e4d8a][_0x2900('0x89')](/<SELF>/i))VisuMZ[_0x2900('0x2c5')][_0x2900('0x315')](_0x3e4d8a);}for(let _0x3cdad3=0x1;_0x3cdad3<$dataSystem['variables'][_0x2900('0x311')];_0x3cdad3++){if($dataSystem['variables'][_0x3cdad3][_0x2900('0x89')](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x2900('0x43')][_0x2900('0x315')](_0x3cdad3);if($dataSystem[_0x2900('0x2b9')][_0x3cdad3][_0x2900('0x89')](/<SELF>/i))VisuMZ[_0x2900('0xf9')]['push'](_0x3cdad3);}},VisuMZ['EventsMoveCore'][_0x2900('0x406')]={},VisuMZ[_0x2900('0x306')][_0x2900('0x406')][_0x2900('0x41a')]=function(){this[_0x2900('0x3c')]=new Game_CPCInterpreter(),this[_0x2900('0x310')]();},VisuMZ['EventsMoveCore']['CustomPageConditions']['determineCommonEventsWithCPC']=function(){this['_commonEvents']=[];for(const _0x2c72ae of $dataCommonEvents){if(!_0x2c72ae)continue;VisuMZ[_0x2900('0x306')][_0x2900('0x406')][_0x2900('0x226')](_0x2c72ae);if(_0x2c72ae[_0x2900('0x117')][_0x2900('0x311')]>0x0)this[_0x2900('0x2c2')][_0x2900('0x315')](_0x2c72ae['id']);}},VisuMZ[_0x2900('0x306')][_0x2900('0x406')][_0x2900('0x35b')]=function(_0x4b8f77,_0x2d71b1){return this[_0x2900('0x3c')][_0x2900('0xa9')](_0x4b8f77,_0x2d71b1),this[_0x2900('0x3c')][_0x2900('0x1b6')](),this[_0x2900('0x3c')][_0x2900('0x19d')];},VisuMZ[_0x2900('0x306')]['CustomPageConditions'][_0x2900('0x226')]=function(_0x10988c){let _0x581c74=![];_0x10988c[_0x2900('0x117')]=[];for(const _0x3ed453 of _0x10988c[_0x2900('0x3d4')]){if([0x6c,0x198]['includes'](_0x3ed453[_0x2900('0x1ae')])){if(_0x2900('0x1c5')!==_0x2900('0x1ef')){const _0x5bfc1c=_0x3ed453[_0x2900('0x416')][0x0];if(_0x5bfc1c[_0x2900('0x89')](/<PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x2900('0x3a0')!==_0x2900('0x26a'))_0x581c74=!![];else{function _0x837163(){return 0x6;}}}else{if(_0x5bfc1c['match'](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x2900('0x2f9')==='lqRqy')_0x581c74=![];else{function _0x2e0da8(){return this['setDirection'](0x9);}}}}}else{function _0x500e5(){_0x2a580f=this[_0x2900('0x31b')](_0x444601,_0x9d6f8c);}}}_0x581c74&&_0x10988c[_0x2900('0x117')][_0x2900('0x315')](_0x3ed453);}},DataManager['isAdvancedSwitch']=function(_0x4833dc){if(SceneManager[_0x2900('0x21b')]['constructor']===Scene_Debug)return![];return VisuMZ[_0x2900('0x23a')][_0x2900('0x3fe')](_0x4833dc);},DataManager[_0x2900('0x5')]=function(_0x40b8a1){if(SceneManager[_0x2900('0x21b')][_0x2900('0x28d')]===Scene_Debug)return![];return VisuMZ[_0x2900('0x43')][_0x2900('0x3fe')](_0x40b8a1);},DataManager['isSelfSwitch']=function(_0x2dc1cf){if(SceneManager[_0x2900('0x21b')][_0x2900('0x28d')]===Scene_Debug)return![];return VisuMZ[_0x2900('0x2c5')][_0x2900('0x3fe')](_0x2dc1cf);},DataManager[_0x2900('0x317')]=function(_0x3114a0){if(SceneManager[_0x2900('0x21b')][_0x2900('0x28d')]===Scene_Debug)return![];return VisuMZ[_0x2900('0xf9')][_0x2900('0x3fe')](_0x3114a0);},VisuMZ[_0x2900('0x306')][_0x2900('0x124')]=Game_Temp['prototype'][_0x2900('0x2a2')],Game_Temp[_0x2900('0x133')][_0x2900('0x2a2')]=function(_0xb127af,_0x2f4469){if(this[_0x2900('0x41b')](_0xb127af,_0x2f4469))return;VisuMZ[_0x2900('0x306')][_0x2900('0x124')][_0x2900('0x302')](this,_0xb127af,_0x2f4469);},Game_Temp[_0x2900('0x133')][_0x2900('0x41b')]=function(_0x23cd8d,_0x1b35e5){const _0x535cf2=$gameMap[_0x2900('0x22f')](_0x23cd8d,_0x1b35e5);for(const _0x43522e of _0x535cf2){if(_0x2900('0x33')!==_0x2900('0x15e')){if(_0x43522e&&_0x43522e[_0x2900('0x236')]()){if(_0x2900('0x365')===_0x2900('0x365'))return _0x43522e[_0x2900('0x1a7')](),!![];else{function _0xf64d6(){return!!this[_0x2900('0x289')](_0x57385e);}}}}else{function _0x3aa9ee(){if(_0x44b0dd)for(const _0x5a8631 of _0x232649[_0x2900('0x30d')]()){_0x5a8631[_0x2900('0x172')]();}}}}return![];},Game_Temp[_0x2900('0x133')][_0x2900('0x1b1')]=function(_0x2b18cc){this[_0x2900('0x1c4')]=_0x2b18cc;},Game_Temp[_0x2900('0x133')][_0x2900('0x41d')]=function(){return this[_0x2900('0x1c4')];},Game_Temp[_0x2900('0x133')][_0x2900('0x345')]=function(_0x4520cf){this[_0x2900('0x21f')]=_0x4520cf;},Game_Temp[_0x2900('0x133')][_0x2900('0x213')]=function(){this[_0x2900('0x21f')]=undefined;},Game_Temp[_0x2900('0x133')][_0x2900('0x3a4')]=function(){return this['_selfTarget'];},VisuMZ['EventsMoveCore'][_0x2900('0x19f')]=Game_System[_0x2900('0x133')][_0x2900('0x41a')],Game_System[_0x2900('0x133')][_0x2900('0x41a')]=function(){VisuMZ[_0x2900('0x306')][_0x2900('0x19f')]['call'](this),this[_0x2900('0x3d')]();},Game_System[_0x2900('0x133')][_0x2900('0x3d')]=function(){this[_0x2900('0x344')]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x2900('0x156')]={},this[_0x2900('0x3fd')]=[],this['_PreservedEventMorphData']={},this[_0x2900('0x228')]={};},Game_System[_0x2900('0x133')][_0x2900('0x208')]=function(){if(this['_EventsMoveCoreSettings']===undefined)this[_0x2900('0x3d')]();if(this[_0x2900('0x344')][_0x2900('0x33d')]===undefined)this[_0x2900('0x3d')]();return this[_0x2900('0x344')][_0x2900('0x33d')];},Game_System[_0x2900('0x133')]['setDashingEnabled']=function(_0x5656a8){if(this[_0x2900('0x344')]===undefined)this[_0x2900('0x3d')]();if(this[_0x2900('0x344')][_0x2900('0x33d')]===undefined)this[_0x2900('0x3d')]();this[_0x2900('0x344')][_0x2900('0x33d')]=_0x5656a8;},Game_System[_0x2900('0x133')][_0x2900('0x2fd')]=function(){if(this['_EventsMoveCoreSettings']===undefined)this[_0x2900('0x3d')]();if(this[_0x2900('0x344')][_0x2900('0x136')]===undefined)this[_0x2900('0x3d')]();return this[_0x2900('0x344')][_0x2900('0x136')];},Game_System[_0x2900('0x133')]['setAllowEventAutoMovement']=function(_0x3082cc){if(this[_0x2900('0x344')]===undefined)this['initEventsMoveCore']();if(this[_0x2900('0x344')][_0x2900('0x136')]===undefined)this[_0x2900('0x3d')]();this[_0x2900('0x344')][_0x2900('0x136')]=_0x3082cc;},Game_System[_0x2900('0x133')][_0x2900('0x3a6')]=function(){if(this[_0x2900('0x344')]===undefined)this[_0x2900('0x3d')]();if(this['_EventsMoveCoreSettings'][_0x2900('0x32f')]===undefined)this[_0x2900('0x3d')]();return this[_0x2900('0x344')]['VisibleEventLabels'];},Game_System[_0x2900('0x133')][_0x2900('0x3fc')]=function(_0x4eaa8c){if(this[_0x2900('0x344')]===undefined)this[_0x2900('0x3d')]();if(this[_0x2900('0x344')][_0x2900('0x32f')]===undefined)this['initEventsMoveCore']();this[_0x2900('0x344')]['VisibleEventLabels']=_0x4eaa8c;},Game_System[_0x2900('0x133')][_0x2900('0x27')]=function(_0x5b06d6){if(this[_0x2900('0x156')]===undefined)this[_0x2900('0x3d')]();if(!_0x5b06d6)return null;if(_0x5b06d6===$gamePlayer){if('JoTai'!=='ldSHH')return this[_0x2900('0x156')][_0x2900('0x3ff')];else{function _0x39a715(){return 0x2;}}}else{const _0x19e38f=_0x2900('0x390')[_0x2900('0xc1')](_0x5b06d6[_0x2900('0x270')],_0x5b06d6['_eventId']);return this['_EventIcons'][_0x19e38f];}},Game_System[_0x2900('0x133')]['setEventIconData']=function(_0x1905e3,_0x343a91,_0x13ba2b,_0x46ada9,_0x1ed87b){if(this[_0x2900('0x156')]===undefined)this['initEventsMoveCore']();const _0x30f4d4=_0x1905e3===$gamePlayer?'Player':_0x2900('0x390')['format'](_0x1905e3[_0x2900('0x270')],_0x1905e3[_0x2900('0x111')]);this[_0x2900('0x156')][_0x30f4d4]={'iconIndex':_0x343a91,'bufferX':_0x13ba2b,'bufferY':_0x46ada9,'blendMode':_0x1ed87b};},Game_System[_0x2900('0x133')][_0x2900('0x6d')]=function(_0x528417,_0x3aa743,_0x4f36f8,_0x3fc2d4,_0x1ec12a,_0x3dacee){if(this[_0x2900('0x156')]===undefined)this[_0x2900('0x3d')]();const _0x167af3=_0x2900('0x390')[_0x2900('0xc1')](_0x528417,_0x3aa743);this[_0x2900('0x156')][_0x167af3]={'iconIndex':_0x4f36f8,'bufferX':_0x3fc2d4,'bufferY':_0x1ec12a,'blendMode':_0x3dacee};},Game_System[_0x2900('0x133')]['deleteIconsOnEventsData']=function(_0x565a81){if(this[_0x2900('0x156')]===undefined)this[_0x2900('0x3d')]();if(!_0x565a81)return null;if(_0x565a81===$gamePlayer){if(_0x2900('0x129')===_0x2900('0x2c4')){function _0x48a267(){if(_0x50dd32)return _0x43f7cc;}}else delete this[_0x2900('0x156')][_0x2900('0x3ff')];}else this[_0x2900('0x1fb')](_0x565a81[_0x2900('0x270')],_0x565a81[_0x2900('0x111')]);},Game_System[_0x2900('0x133')]['deleteIconsOnEventsDataKey']=function(_0x3e6b9f,_0x2664aa){if(this[_0x2900('0x156')]===undefined)this[_0x2900('0x3d')]();const _0x3f7e2b=_0x2900('0x390')[_0x2900('0xc1')](_0x3e6b9f,_0x2664aa);delete this[_0x2900('0x156')][_0x3f7e2b];},Game_System[_0x2900('0x133')][_0x2900('0xb7')]=function(_0x338896){if(this['_SavedEventLocations']===undefined)this['initEventsMoveCore']();if(!_0x338896)return null;const _0x453a33='Map%1-Event%2'['format'](_0x338896[_0x2900('0x270')],_0x338896[_0x2900('0x111')]);return this[_0x2900('0x228')][_0x453a33];},Game_System[_0x2900('0x133')][_0x2900('0x305')]=function(_0x5087b1){if(this[_0x2900('0x228')]===undefined)this[_0x2900('0x3d')]();if(!_0x5087b1)return;const _0x4ed513=_0x2900('0x390')['format'](_0x5087b1[_0x2900('0x270')],_0x5087b1[_0x2900('0x111')]);this[_0x2900('0x228')][_0x4ed513]={'direction':_0x5087b1[_0x2900('0x7d')](),'x':Math[_0x2900('0x2ea')](_0x5087b1['x']),'y':Math[_0x2900('0x2ea')](_0x5087b1['y']),'pageIndex':_0x5087b1[_0x2900('0x279')],'moveRouteIndex':_0x5087b1[_0x2900('0x1d8')]};},Game_System[_0x2900('0x133')]['deleteSavedEventLocation']=function(_0x92d425){if(this[_0x2900('0x228')]===undefined)this[_0x2900('0x3d')]();if(!_0x92d425)return;this[_0x2900('0x1f8')](_0x92d425[_0x2900('0x270')],_0x92d425[_0x2900('0x111')]);},Game_System[_0x2900('0x133')][_0x2900('0x1f8')]=function(_0x4ff118,_0x149873){if(this[_0x2900('0x228')]===undefined)this[_0x2900('0x3d')]();const _0x4a1cc3='Map%1-Event%2'[_0x2900('0xc1')](_0x4ff118,_0x149873);delete this['_SavedEventLocations'][_0x4a1cc3];},Game_System[_0x2900('0x133')][_0x2900('0x297')]=function(_0x20f7cd,_0x5d832f,_0x3fd85b,_0x15407b,_0x196dd1,_0x372234,_0x404496){if(this[_0x2900('0x228')]===undefined)this[_0x2900('0x3d')]();const _0x100fb3=_0x2900('0x390')[_0x2900('0xc1')](_0x20f7cd,_0x5d832f);this['_SavedEventLocations'][_0x100fb3]={'direction':_0x196dd1,'x':Math[_0x2900('0x2ea')](_0x3fd85b),'y':Math[_0x2900('0x2ea')](_0x15407b),'pageIndex':_0x372234,'moveRouteIndex':_0x404496};},Game_System['prototype'][_0x2900('0x98')]=function(_0x4a0bb9){if(this[_0x2900('0x160')]===undefined)this[_0x2900('0x3d')]();if(!_0x4a0bb9)return;const _0x765273='Map%1-Event%2'[_0x2900('0xc1')](_0x4a0bb9[_0x2900('0x270')],_0x4a0bb9[_0x2900('0x111')]);return this['_PreservedEventMorphData'][_0x765273];},Game_System[_0x2900('0x133')]['savePreservedMorphEventDataKey']=function(_0x3bd41c,_0x18f0c2,_0x1a78a0,_0x4439b7,_0x12d852){if(this['_PreservedEventMorphData']===undefined)this[_0x2900('0x3d')]();const _0x245ac1=_0x2900('0x390')[_0x2900('0xc1')](_0x3bd41c,_0x18f0c2);this['_PreservedEventMorphData'][_0x245ac1]={'template':_0x1a78a0,'mapId':_0x4439b7,'eventId':_0x12d852};},Game_System[_0x2900('0x133')][_0x2900('0x234')]=function(_0x36c7b1,_0x10bf6b){if(this[_0x2900('0x160')]===undefined)this[_0x2900('0x3d')]();const _0x2029a9=_0x2900('0x390')[_0x2900('0xc1')](_0x36c7b1,_0x10bf6b);delete this[_0x2900('0x160')][_0x2029a9];},Game_System['prototype'][_0x2900('0x3a2')]=function(_0x26ee5b){if(this[_0x2900('0x3fd')]===undefined)this[_0x2900('0x3d')]();return this['_MapSpawnedEventData'][_0x26ee5b]=this[_0x2900('0x3fd')][_0x26ee5b]||[],this[_0x2900('0x3fd')][_0x26ee5b];},Game_System[_0x2900('0x133')][_0x2900('0x40f')]=function(_0xc05f1c){const _0x52e4a7=this[_0x2900('0x3a2')](_0xc05f1c);for(const _0x29467b of _0x52e4a7){if('sbalx'!==_0x2900('0x3b8')){function _0x4c769b(){this[_0x2900('0xaf')]=_0x552157[_0x2900('0x3a2')](this[_0x2900('0x22d')]()),this[_0x2900('0x3d1')]=!![];}}else{if(!_0x29467b)continue;if(_0x29467b['_spawnPreserved'])continue;const _0x451d78=_0x52e4a7[_0x2900('0x35d')](_0x29467b);_0x52e4a7[_0x451d78]=null;}}},VisuMZ[_0x2900('0x306')][_0x2900('0x338')]=Game_Message[_0x2900('0x133')]['add'],Game_Message['prototype']['add']=function(_0x24f859){VisuMZ[_0x2900('0x306')][_0x2900('0x338')][_0x2900('0x302')](this,_0x24f859),this['_selfEvent']=$gameTemp['getSelfTarget']();},Game_Message[_0x2900('0x133')][_0x2900('0x29c')]=function(){$gameTemp['registerSelfTarget'](this[_0x2900('0x2b1')]);},VisuMZ[_0x2900('0x306')]['Game_Switches_value']=Game_Switches[_0x2900('0x133')][_0x2900('0x250')],Game_Switches[_0x2900('0x133')][_0x2900('0x250')]=function(_0xa07ab9){if(DataManager[_0x2900('0x3d9')](_0xa07ab9)){if('VUrch'!==_0x2900('0x10'))return!!this[_0x2900('0x79')](_0xa07ab9);else{function _0x5df5bd(){const _0x230d9b=this['_eventSpawnData'][_0x2900('0x22d')],_0x2180d9=this[_0x2900('0x214')][_0x2900('0x2d7')];return _0x28f54b[_0x2900('0x37e')][_0x230d9b][_0x2900('0x30d')][_0x2180d9];}}}else{if(DataManager[_0x2900('0x258')](_0xa07ab9))return!!this['selfValue'](_0xa07ab9);else{if(_0x2900('0xd7')===_0x2900('0x73')){function _0x31bae8(){_0x39b8ce[_0x2900('0x415')](_0x46dff0[_0x12f9bf]);}}else return VisuMZ[_0x2900('0x306')][_0x2900('0x6b')]['call'](this,_0xa07ab9);}}},Game_Switches[_0x2900('0x399')]={},Game_Switches[_0x2900('0x133')]['advancedValue']=function(_0x37c39f){if(!Game_Switches[_0x2900('0x399')][_0x37c39f]){$dataSystem['switches'][_0x37c39f]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0xdb50da=_0x2900('0x1e2')[_0x2900('0xc1')](String(RegExp['$1']));Game_Switches[_0x2900('0x399')][_0x37c39f]=new Function(_0x2900('0xb2'),_0xdb50da);}const _0x266158=$gameTemp[_0x2900('0x3a4')]()||this;return Game_Switches[_0x2900('0x399')][_0x37c39f][_0x2900('0x302')](_0x266158,_0x37c39f);},Game_Switches[_0x2900('0x133')][_0x2900('0x289')]=function(_0x513170){const _0x270db9=$gameTemp[_0x2900('0x3a4')]()||this;if(_0x270db9[_0x2900('0x28d')]!==Game_Event){if('RXItN'!=='RXItN'){function _0x37718a(){this[_0x2900('0x392')]();}}else return VisuMZ['EventsMoveCore']['Game_Switches_value'][_0x2900('0x302')](this,_0x513170);}else{const _0x1dc415=[_0x270db9[_0x2900('0x270')],_0x270db9[_0x2900('0x111')],_0x2900('0x28b')[_0x2900('0xc1')](_0x513170)];return $gameSelfSwitches[_0x2900('0x250')](_0x1dc415);}},VisuMZ[_0x2900('0x306')][_0x2900('0x100')]=Game_Switches[_0x2900('0x133')][_0x2900('0x3bd')],Game_Switches[_0x2900('0x133')]['setValue']=function(_0x31d92e,_0xef3540){if(DataManager[_0x2900('0x258')](_0x31d92e)){if('TAtra'!=='TAtra'){function _0x215941(){return _0x1323cc['EventsMoveCore'][_0x2900('0xe6')][_0x2900('0x302')](this,_0x3b7e34,_0xbe0e7f,_0x40f26a);}}else this[_0x2900('0x260')](_0x31d92e,_0xef3540);}else{if(_0x2900('0x78')===_0x2900('0x78'))VisuMZ[_0x2900('0x306')][_0x2900('0x100')][_0x2900('0x302')](this,_0x31d92e,_0xef3540);else{function _0x165bd6(){_0x308538['ConvertParams'](_0x4bc95e,_0x5f4dfe);const _0x2ab152={'template':_0x156d5f[_0x2900('0xa2')],'mapId':_0x4dd23a[_0x2900('0x30')],'eventId':_0x10317a['EventId'],'x':-0x1,'y':-0x1,'spawnPreserved':_0x1e3d1b[_0x2900('0x0')],'spawnEventId':_0x151f4c['_spawnedEvents']['length']+0x3e8};_0x366f1f['prepareSpawnedEventAtRegion'](_0x2ab152,_0x4e8bae[_0x2900('0x49')],_0x3d05a7[_0x2900('0x48')],_0x1d8e18[_0x2900('0x351')]);}}}},Game_Switches[_0x2900('0x133')][_0x2900('0x260')]=function(_0x1f37ea,_0x49f437){const _0x7f7474=$gameTemp[_0x2900('0x3a4')]()||this;if(_0x7f7474[_0x2900('0x28d')]!==Game_Event)VisuMZ[_0x2900('0x306')]['Game_Switches_setValue']['call'](this,_0x1f37ea,_0x49f437);else{const _0x5ea5f1=[_0x7f7474[_0x2900('0x270')],_0x7f7474['_eventId'],_0x2900('0x28b')['format'](_0x1f37ea)];$gameSelfSwitches[_0x2900('0x3bd')](_0x5ea5f1,_0x49f437);}},VisuMZ['EventsMoveCore']['Game_Variables_value']=Game_Variables[_0x2900('0x133')][_0x2900('0x250')],Game_Variables[_0x2900('0x133')][_0x2900('0x250')]=function(_0x22593e){if(DataManager[_0x2900('0x5')](_0x22593e)){if(_0x2900('0x419')===_0x2900('0x58')){function _0x1f6e43(){if(_0x5676a8)this[_0x2900('0x287')](_0x20bf2c['x'],_0x210276['y']);}}else return this['advancedValue'](_0x22593e);}else return DataManager[_0x2900('0x317')](_0x22593e)?this['selfValue'](_0x22593e):VisuMZ['EventsMoveCore'][_0x2900('0x75')][_0x2900('0x302')](this,_0x22593e);},Game_Variables[_0x2900('0x399')]={},Game_Variables[_0x2900('0x133')][_0x2900('0x79')]=function(_0x228b0c){if(!Game_Variables[_0x2900('0x399')][_0x228b0c]){if(_0x2900('0x39d')!==_0x2900('0x281')){$dataSystem[_0x2900('0x2b9')][_0x228b0c][_0x2900('0x89')](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x35126d=_0x2900('0x1e2')[_0x2900('0xc1')](String(RegExp['$1']));Game_Variables[_0x2900('0x399')][_0x228b0c]=new Function('variableId',_0x35126d);}else{function _0x2c9294(){return this['isSpriteVS8dir']()?(this['_pose']||'')[_0x2900('0x2f3')]()[_0x2900('0x17')]():''[_0x2900('0x2f3')]()[_0x2900('0x17')]();}}}const _0x2a89fa=$gameTemp[_0x2900('0x3a4')]()||this;return Game_Variables[_0x2900('0x399')][_0x228b0c][_0x2900('0x302')](_0x2a89fa,_0x228b0c);},Game_Variables['prototype'][_0x2900('0x289')]=function(_0x17842a){const _0x3f6691=$gameTemp[_0x2900('0x3a4')]()||this;if(_0x3f6691[_0x2900('0x28d')]!==Game_Event)return VisuMZ['EventsMoveCore'][_0x2900('0x75')][_0x2900('0x302')](this,_0x17842a);else{if(_0x2900('0x1af')!==_0x2900('0x1af')){function _0x441ed3(){_0x197eca=_0xcc2074[_0x2900('0x2f3')]()[_0x2900('0x17')]();const _0x3bf939=_0x5ef60e[_0x2900('0x3a3')][_0x2e995];if(!_0x3bf939)return;const _0x1ba4bb=_0x3bf939['MapID'],_0x19281c=_0x3bf939[_0x2900('0xf')];if(!this['checkValidEventerMap'](_0x1ba4bb,_0x19281c))return;if(!_0x4a3515)_0x3bf939[_0x2900('0x400')]['call'](this,_0x1ba4bb,_0x19281c,this);this[_0x2900('0x14e')](_0x1ba4bb,_0x19281c,_0x5e8e87);if(!_0x54ce46)_0x3bf939[_0x2900('0x200')]['call'](this,_0x1ba4bb,_0x19281c,this);this[_0x2900('0x21')]();}}else{const _0x3bd6cf=[_0x3f6691[_0x2900('0x270')],_0x3f6691[_0x2900('0x111')],_0x2900('0x3d7')[_0x2900('0xc1')](_0x17842a)];return $gameSelfSwitches['value'](_0x3bd6cf);}}},VisuMZ[_0x2900('0x306')][_0x2900('0x3d6')]=Game_Variables[_0x2900('0x133')][_0x2900('0x3bd')],Game_Variables['prototype'][_0x2900('0x3bd')]=function(_0x55d2e4,_0x3b5826){DataManager[_0x2900('0x317')](_0x55d2e4)?this['setSelfValue'](_0x55d2e4,_0x3b5826):VisuMZ['EventsMoveCore'][_0x2900('0x3d6')][_0x2900('0x302')](this,_0x55d2e4,_0x3b5826);},Game_Variables[_0x2900('0x133')][_0x2900('0x260')]=function(_0x591710,_0x4155c5){const _0x4447b8=$gameTemp[_0x2900('0x3a4')]()||this;if(_0x4447b8['constructor']!==Game_Event)VisuMZ[_0x2900('0x306')][_0x2900('0x3d6')][_0x2900('0x302')](this,_0x591710,_0x4155c5);else{const _0x463788=[_0x4447b8[_0x2900('0x270')],_0x4447b8[_0x2900('0x111')],_0x2900('0x3d7')[_0x2900('0xc1')](_0x591710)];$gameSelfSwitches['setValue'](_0x463788,_0x4155c5);}},VisuMZ[_0x2900('0x306')][_0x2900('0x53')]=Game_SelfSwitches[_0x2900('0x133')][_0x2900('0x250')],Game_SelfSwitches[_0x2900('0x133')][_0x2900('0x250')]=function(_0x503889){if(_0x503889[0x2][_0x2900('0x89')](/SELF/i))return this['selfValue'](_0x503889);else{if(_0x2900('0x1b0')==='IxaDQ'){return VisuMZ[_0x2900('0x306')][_0x2900('0x53')][_0x2900('0x302')](this,_0x503889);;}else{function _0xeffe08(){return this[_0x2900('0x16f')](_0x274705(_0x21eb23['$1']),_0x34d725(_0x1134f6['$2']));}}}},Game_SelfSwitches[_0x2900('0x133')]['selfValue']=function(_0xe67eec){return _0xe67eec[0x2][_0x2900('0x89')](/VAR/i)?this[_0x2900('0x16a')][_0xe67eec]||0x0:!!this[_0x2900('0x16a')][_0xe67eec];},VisuMZ[_0x2900('0x306')][_0x2900('0x3ac')]=Game_SelfSwitches[_0x2900('0x133')][_0x2900('0x3bd')],Game_SelfSwitches[_0x2900('0x133')][_0x2900('0x3bd')]=function(_0x4eebf5,_0x13614f){if(_0x4eebf5[0x2][_0x2900('0x89')](/SELF/i)){if(_0x2900('0x267')===_0x2900('0x267'))this[_0x2900('0x260')](_0x4eebf5,_0x13614f);else{function _0x3c6445(){return this['processMoveRouteMoveRepeat'](0x8,_0x1b5dcf(_0x2dc531['$1']));}}}else VisuMZ[_0x2900('0x306')]['Game_SelfSwitches_setValue'][_0x2900('0x302')](this,_0x4eebf5,_0x13614f);},Game_SelfSwitches[_0x2900('0x133')]['setSelfValue']=function(_0x9d78a4,_0x586209){this[_0x2900('0x16a')][_0x9d78a4]=_0x9d78a4[0x2][_0x2900('0x89')](/VAR/i)?_0x586209:!!_0x586209,this[_0x2900('0x10b')]();},VisuMZ['EventsMoveCore'][_0x2900('0x2be')]=Game_Enemy[_0x2900('0x133')][_0x2900('0x65')],Game_Enemy[_0x2900('0x133')][_0x2900('0x65')]=function(_0x250d55){$gameTemp['registerSelfTarget'](this);const _0x39e0be=VisuMZ[_0x2900('0x306')][_0x2900('0x2be')]['call'](this,_0x250d55);return $gameTemp[_0x2900('0x213')](),_0x39e0be;},VisuMZ[_0x2900('0x306')][_0x2900('0xae')]=Game_Troop[_0x2900('0x133')][_0x2900('0x219')],Game_Troop['prototype'][_0x2900('0x219')]=function(_0x3a461e){$gameTemp['registerSelfTarget'](this);const _0x3197fd=VisuMZ[_0x2900('0x306')][_0x2900('0xae')][_0x2900('0x302')](this,_0x3a461e);return $gameTemp['clearSelfTarget'](),_0x3197fd;},VisuMZ['EventsMoveCore'][_0x2900('0xd')]=Game_Map['prototype'][_0x2900('0xa9')],Game_Map['prototype']['setup']=function(_0x288805){this[_0x2900('0x40f')](_0x288805),VisuMZ[_0x2900('0x306')][_0x2900('0xd')][_0x2900('0x302')](this,_0x288805),this['clearEventCache'](),this[_0x2900('0x3e')](),this[_0x2900('0x220')](),this[_0x2900('0x26c')](),this['setupSaveEventLocations'](),this[_0x2900('0x280')]();},VisuMZ['EventsMoveCore'][_0x2900('0x212')]=Game_Map[_0x2900('0x133')][_0x2900('0x154')],Game_Map[_0x2900('0x133')][_0x2900('0x154')]=function(){VisuMZ[_0x2900('0x306')][_0x2900('0x212')][_0x2900('0x302')](this),this[_0x2900('0x51')]();},Game_Map[_0x2900('0x1f6')]=0xc8,Game_Map[_0x2900('0x133')][_0x2900('0x3e')]=function(){const _0x2df6f9=Game_Map[_0x2900('0x1f6')];this[_0x2900('0xde')]=this[_0x2900('0x30d')]()['length']>_0x2df6f9;if(this[_0x2900('0xde')]&&$gameTemp[_0x2900('0xa')]()){}},Game_Map[_0x2900('0x133')][_0x2900('0xf2')]=function(){return this['_eventOverload'];},Game_Map[_0x2900('0x133')]['clearEventCache']=function(){this[_0x2900('0x370')]=undefined;},Game_Map[_0x2900('0x133')][_0x2900('0x220')]=function(){this[_0x2900('0x1bb')]=VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x16b')]['EnableDir8'];const _0x255ad2=$dataMap['note']||'';if(_0x255ad2[_0x2900('0x89')](/<DIAGONAL MOVEMENT: ON>/i))this[_0x2900('0x1bb')]=!![];if(_0x255ad2[_0x2900('0x89')](/<DIAGONAL MOVEMENT: OFF>/i))this[_0x2900('0x1bb')]=!![];},Game_Map[_0x2900('0x133')][_0x2900('0x1e3')]=function(){if(this[_0x2900('0x1bb')]===undefined)this[_0x2900('0x220')]();return this['_diagonalSupport'];},Game_Map['prototype']['roundXWithDirection']=function(_0x20d791,_0x5239a2){if([0x1,0x4,0x7][_0x2900('0x3fe')](_0x5239a2))_0x20d791-=0x1;if([0x3,0x6,0x9]['includes'](_0x5239a2))_0x20d791+=0x1;return this[_0x2900('0x83')](_0x20d791);},Game_Map[_0x2900('0x133')][_0x2900('0x3ee')]=function(_0x3bd3ef,_0x8fdfb4){if([0x1,0x2,0x3][_0x2900('0x3fe')](_0x8fdfb4))_0x3bd3ef+=0x1;if([0x7,0x8,0x9][_0x2900('0x3fe')](_0x8fdfb4))_0x3bd3ef-=0x1;return this[_0x2900('0x107')](_0x3bd3ef);},Game_Map[_0x2900('0x133')]['absDistance']=function(_0x503b7e,_0x37bbe5,_0xceae61,_0x357797){return Math[_0x2900('0x1df')](Math[_0x2900('0x40b')](this[_0x2900('0xee')](_0x503b7e,_0xceae61)),Math[_0x2900('0x40b')](this[_0x2900('0x3c7')](_0x37bbe5,_0x357797)));},Game_Map[_0x2900('0x133')][_0x2900('0x26c')]=function(){const _0x15f7a0=VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x49')],_0x36f432={},_0x3d681f=['Allow',_0x2900('0x224'),_0x2900('0x149')],_0x4c1592=[_0x2900('0x17d'),_0x2900('0x3c9'),_0x2900('0x3ff'),_0x2900('0xb1'),_0x2900('0x39c'),_0x2900('0x31c'),_0x2900('0x1e1'),_0x2900('0x1b5')];for(const _0x5a3218 of _0x3d681f){for(const _0xbfadd8 of _0x4c1592){const _0xaa8304='%1%2'[_0x2900('0xc1')](_0xbfadd8,_0x5a3218);if(_0x15f7a0[_0xaa8304]){if('nxFGc'===_0x2900('0x2e3')){function _0x5bb887(){_0x9b02a6[_0x2900('0x306')]['Sprite_Balloon_setup'][_0x2900('0x302')](this,_0x3876ca,_0x1cb62e),_0xbee61e[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x61')][_0x2900('0x126')]&&this[_0x2900('0x387')][_0x2900('0xfa')][_0x2900('0x15d')](_0x2188c6,this[_0x2900('0xd5')]);}}else _0x36f432[_0xaa8304]=_0x15f7a0[_0xaa8304][_0x2900('0x1ea')](0x0);}}}const _0x79449f=$dataMap[_0x2900('0x116')]||'',_0x4b126c=_0x79449f['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);if(_0x4b126c){if(_0x2900('0x25e')!==_0x2900('0x1ce'))for(const _0x535d7a of _0x4b126c){_0x535d7a[_0x2900('0x89')](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x14adee=String(RegExp['$1'])[_0x2900('0x112')]()[_0x2900('0x17')](),_0x35528b=String(RegExp['$1'])[_0x2900('0x112')]()[_0x2900('0x17')]();const _0x25c0e4=JSON[_0x2900('0x139')]('['+RegExp['$3']['match'](/\d+/g)+']');_0x14adee=_0x14adee[_0x2900('0x384')](0x0)[_0x2900('0x2f3')]()+_0x14adee[_0x2900('0x1ea')](0x1),_0x35528b=_0x35528b[_0x2900('0x384')](0x0)[_0x2900('0x2f3')]()+_0x35528b['slice'](0x1);const _0x31088b=_0x2900('0x21a')[_0x2900('0xc1')](_0x14adee,_0x35528b);if(_0x36f432[_0x31088b])_0x36f432[_0x31088b]=_0x36f432[_0x31088b][_0x2900('0x36')](_0x25c0e4);}else{function _0x5e790c(){_0xa19869[_0x2900('0x4c')](),this[_0x2900('0x3c6')]();}}}this[_0x2900('0x276')]=_0x36f432;},Game_Map[_0x2900('0x133')][_0x2900('0x12b')]=function(_0x5cbf2e,_0x1de533,_0x28130e,_0x15d9f9){const _0x16eba7=this[_0x2900('0x20a')](_0x5cbf2e,_0x28130e),_0x3aab79=this[_0x2900('0x3ee')](_0x1de533,_0x28130e),_0xecf587=this[_0x2900('0xc5')](_0x16eba7,_0x3aab79),_0xe34ea6=this[_0x2900('0x276')];if(_0xe34ea6[_0x2900('0x4b')][_0x2900('0x3fe')](_0xecf587))return!![];else{if(_0x15d9f9===_0x2900('0x146'))return _0xe34ea6[_0x2900('0x32a')][_0x2900('0x3fe')](_0xecf587)||_0xe34ea6['WalkAllow'][_0x2900('0x3fe')](_0xecf587);else{if(_0x15d9f9===_0x2900('0x28f'))return _0xe34ea6['EventAllow'][_0x2900('0x3fe')](_0xecf587)||_0xe34ea6['WalkAllow'][_0x2900('0x3fe')](_0xecf587);else{if(_0xe34ea6[_0x2900('0xb9')][_0x2900('0x3fe')](_0xecf587)){if(_0x2900('0x36b')===_0x2900('0x36b'))return!![];else{function _0x59a1e5(){const _0x3bcaeb=_0x3e9143['pages'][_0x24acdb[_0x2900('0x296')]-0x1][_0x2900('0x3d4')];this[_0x2900('0xdb')](_0x3bcaeb,this['eventId']());}}}else{const _0x526f75='%1Allow'['format'](_0x15d9f9['charAt'](0x0)[_0x2900('0x2f3')]()+_0x15d9f9[_0x2900('0x1ea')](0x1));if(_0xe34ea6[_0x526f75])return _0xe34ea6[_0x526f75][_0x2900('0x3fe')](_0xecf587);}}}}return![];},Game_Map[_0x2900('0x133')][_0x2900('0x1d5')]=function(_0x384206,_0x392b55,_0x2a1078,_0x4c24b3){const _0x51f89d=this[_0x2900('0x20a')](_0x384206,_0x2a1078),_0x5e5508=this[_0x2900('0x3ee')](_0x392b55,_0x2a1078),_0x44953e=this[_0x2900('0xc5')](_0x51f89d,_0x5e5508),_0x5b042a=this[_0x2900('0x276')];if(_0x5b042a[_0x2900('0x210')][_0x2900('0x3fe')](_0x44953e))return!![];else{if(_0x4c24b3===_0x2900('0x146'))return _0x5b042a[_0x2900('0x1cb')][_0x2900('0x3fe')](_0x44953e)||_0x5b042a['WalkForbid'][_0x2900('0x3fe')](_0x44953e);else{if(_0x4c24b3===_0x2900('0x28f'))return _0x5b042a[_0x2900('0x408')][_0x2900('0x3fe')](_0x44953e)||_0x5b042a[_0x2900('0x33e')][_0x2900('0x3fe')](_0x44953e);else{if(_0x5b042a[_0x2900('0x2ec')][_0x2900('0x3fe')](_0x44953e)){if('qoUWg'===_0x2900('0x63')){function _0x440b69(){if(!this['page']())return;const _0x53c2e1=this[_0x2900('0x3d4')]();let _0x10bd04='';for(const _0x459e67 of _0x53c2e1){if([0x6c,0x198][_0x2900('0x3fe')](_0x459e67[_0x2900('0x1ae')])){if(_0x10bd04!=='')_0x10bd04+='\x0a';_0x10bd04+=_0x459e67[_0x2900('0x416')][0x0];}}this[_0x2900('0x1b3')](_0x10bd04);}}else return!![];}else{const _0x26db74=_0x2900('0x2e0')[_0x2900('0xc1')](_0x4c24b3['charAt'](0x0)['toUpperCase']()+_0x4c24b3[_0x2900('0x1ea')](0x1));if(_0x5b042a[_0x26db74])return _0x5b042a[_0x26db74][_0x2900('0x3fe')](_0x44953e);}}}}return![];},Game_Map[_0x2900('0x133')][_0x2900('0x2e')]=function(_0x4f1567,_0x3bf4d1,_0x268f25,_0x558e19){_0x268f25=_0x558e19==='airship'?0x5:_0x268f25;const _0x4ce65e=this[_0x2900('0x20a')](_0x4f1567,_0x268f25),_0x186ee3=this[_0x2900('0x3ee')](_0x3bf4d1,_0x268f25),_0x108389=this[_0x2900('0xc5')](_0x4ce65e,_0x186ee3),_0x2d46d8=this[_0x2900('0x276')];if(_0x2d46d8[_0x2900('0x4e')]['includes'](_0x108389))return!![];else{if(_0x2900('0x1a3')==='lJvMv'){function _0x207a9c(){this[_0x2900('0x109')]=_0x29860d(_0x3eba92['$1']);}}else{const _0x47bcb7=_0x2900('0x1d7')[_0x2900('0xc1')](_0x558e19[_0x2900('0x384')](0x0)[_0x2900('0x2f3')]()+_0x558e19['slice'](0x1));if(_0x2d46d8[_0x47bcb7])return _0x2d46d8[_0x47bcb7][_0x2900('0x3fe')](_0x108389);}}return![];},VisuMZ[_0x2900('0x306')][_0x2900('0x72')]=Game_Map[_0x2900('0x133')][_0x2900('0x172')],Game_Map[_0x2900('0x133')][_0x2900('0x172')]=function(){VisuMZ[_0x2900('0x306')][_0x2900('0x72')][_0x2900('0x302')](this),this[_0x2900('0xb6')]();},Game_Map[_0x2900('0x133')][_0x2900('0xb6')]=function(){this['_needsPeriodicRefresh']=![];if(this[_0x2900('0x30d')]()[_0x2900('0x3ce')](_0x35a364=>_0x35a364['hasAdvancedSwitchVariable']())){if(_0x2900('0x166')!==_0x2900('0x166')){function _0xed10f7(){this['_patternLocked']=![],this[_0x2900('0x371')](),this[_0x2900('0x2df')](),this[_0x2900('0x262')](),this['clearStepPattern']();}}else{this[_0x2900('0x46')]=!![];return;}}if(this[_0x2900('0x30d')]()[_0x2900('0x3ce')](_0x124367=>_0x124367['hasCPCs']())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x2900('0x2c2')][_0x2900('0x3ce')](_0x3e4bb9=>_0x3e4bb9[_0x2900('0xe4')]())){if('KXsEn'===_0x2900('0x35e')){this[_0x2900('0x46')]=!![];return;}else{function _0x4d8980(){return this[_0x2900('0x1')](_0x4e10e2);}}}if(this[_0x2900('0x2c2')][_0x2900('0x3ce')](_0x1947c7=>_0x1947c7[_0x2900('0x398')]())){if(_0x2900('0x1c')===_0x2900('0x28')){function _0x1714d3(){_0x276a3a[_0x2900('0x415')](_0x20ae64[_0x5b43a7]);}}else{this[_0x2900('0x46')]=!![];return;}}},VisuMZ[_0x2900('0x306')][_0x2900('0x194')]=Game_Map[_0x2900('0x133')][_0x2900('0x372')],Game_Map[_0x2900('0x133')][_0x2900('0x372')]=function(_0x4cb991){this[_0x2900('0x44')](),VisuMZ[_0x2900('0x306')]['Game_Map_update'][_0x2900('0x302')](this,_0x4cb991);},Game_Map[_0x2900('0x133')]['updatePeriodicRefresh']=function(){if(!this[_0x2900('0x46')])return;this[_0x2900('0x346')]=this[_0x2900('0x346')]||0x3c,this[_0x2900('0x346')]--;if(this[_0x2900('0x346')]<=0x0){if(_0x2900('0xec')!=='Wolcc')this[_0x2900('0x2c')](),this[_0x2900('0x346')]=0x3c;else{function _0x3449e8(){_0x56e8fb[_0x2900('0x306')][_0x2900('0x72')][_0x2900('0x302')](this),this['checkNeedForPeriodicRefresh']();}}}},VisuMZ[_0x2900('0x306')][_0x2900('0x22c')]=Game_Map[_0x2900('0x133')][_0x2900('0x103')],Game_Map[_0x2900('0x133')][_0x2900('0x103')]=function(){if(!$gameSystem['isDashingEnabled']())return!![];return VisuMZ['EventsMoveCore'][_0x2900('0x22c')][_0x2900('0x302')](this);},Game_Map[_0x2900('0x133')][_0x2900('0x24d')]=function(){this[_0x2900('0x1e6')]=![];const _0xac560e=$dataMap[_0x2900('0x116')]||'';if(_0xac560e[_0x2900('0x89')](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if('XcXdH'!=='XcXdH'){function _0x583c86(){if(!this[_0x2900('0xad')][_0x2900('0x167')])return![];return _0x486401[_0x2900('0x133')][_0x2900('0x15')][_0x2900('0x302')](this);}}else this[_0x2900('0x1e6')]=!![];}},Game_Map[_0x2900('0x133')]['isSaveEventLocations']=function(){if(this[_0x2900('0x1e6')]===undefined)this[_0x2900('0x24d')]();return this[_0x2900('0x1e6')];},Game_Map[_0x2900('0x133')][_0x2900('0x40f')]=function(_0x2eac30){if(_0x2eac30!==this[_0x2900('0x22d')]()&&$gamePlayer){if(_0x2900('0x330')===_0x2900('0x330'))$gameSystem['removeTemporaryMapSpawnedEvents'](_0x2eac30);else{function _0x5d07a9(){if(this[_0x2900('0x156')]===_0x37f369)this[_0x2900('0x3d')]();if(!_0x3183c5)return null;_0x3b242e===_0x27823a?delete this['_EventIcons'][_0x2900('0x3ff')]:this[_0x2900('0x1fb')](_0x5d916e[_0x2900('0x270')],_0x56c7ce[_0x2900('0x111')]);}}}},Game_Map[_0x2900('0x133')][_0x2900('0x280')]=function(){this[_0x2900('0xaf')]=$gameSystem[_0x2900('0x3a2')](this[_0x2900('0x22d')]()),this[_0x2900('0x3d1')]=!![];},VisuMZ['EventsMoveCore'][_0x2900('0x14a')]=Game_Map[_0x2900('0x133')][_0x2900('0x30d')],Game_Map['prototype'][_0x2900('0x30d')]=function(){if(this[_0x2900('0x370')])return this[_0x2900('0x370')];const _0xe3b2a3=VisuMZ[_0x2900('0x306')][_0x2900('0x14a')][_0x2900('0x302')](this),_0x4fd57a=_0xe3b2a3[_0x2900('0x36')](this[_0x2900('0xaf')]||[]);return this[_0x2900('0x370')]=_0x4fd57a[_0x2900('0x40')](_0x2dc684=>!!_0x2dc684),this[_0x2900('0x370')];},VisuMZ[_0x2900('0x306')][_0x2900('0x57')]=Game_Map[_0x2900('0x133')][_0x2900('0x28f')],Game_Map[_0x2900('0x133')][_0x2900('0x28f')]=function(_0x262875){return _0x262875>=0x3e8?(_0x262875-=0x3e8,this['_spawnedEvents'][_0x262875]):VisuMZ[_0x2900('0x306')][_0x2900('0x57')][_0x2900('0x302')](this,_0x262875);},Game_Map[_0x2900('0x133')][_0x2900('0xa5')]=function(_0x347657){const _0x4f58a7=this[_0x2900('0x28f')](_0x347657);if(_0x4f58a7)_0x4f58a7['erase']();},Game_Map[_0x2900('0x133')][_0x2900('0x37f')]=function(_0x22cb01){$gameTemp['_spawnData']=_0x22cb01;const _0x2ef195=new Game_Event(_0x22cb01[_0x2900('0x22d')],_0x22cb01[_0x2900('0x2d7')]);$gameTemp['_spawnData']=undefined,this['_spawnedEvents'][_0x2900('0x315')](_0x2ef195),_0x2ef195[_0x2900('0x2a3')](_0x22cb01),this[_0x2900('0x21')]();},Game_Map[_0x2900('0x133')][_0x2900('0x3ab')]=function(_0x1bf136,_0x5ea3c9,_0x3b70b7){const _0x5628bf=_0x1bf136['x'],_0x9d3212=_0x1bf136['y'];if(!this[_0x2900('0x38')](_0x5628bf,_0x9d3212))return;if(_0x5ea3c9){if(_0x2900('0x16')!=='WzFpX'){function _0x1fabdd(){this[_0x2900('0x1a')][_0x2900('0xe1')]['x']=_0x155e85[_0x2900('0x55')](0x1,this[_0x2900('0x1a')][_0x2900('0xe1')]['x']+0.1),this['_shadowSprite'][_0x2900('0xe1')]['y']=_0x17d29d['min'](0x1,this['_shadowSprite']['scale']['y']+0.1);}}else{if(this[_0x2900('0x22f')](_0x5628bf,_0x9d3212)[_0x2900('0x311')]>0x0)return;if($gamePlayer['x']===_0x5628bf&&$gamePlayer['y']===_0x9d3212)return;if(this[_0x2900('0x11b')]()[_0x2900('0x13f')](_0x5628bf,_0x9d3212))return;if(this['ship']()[_0x2900('0x13f')](_0x5628bf,_0x9d3212))return;}}if(_0x3b70b7){if(!this[_0x2900('0x13c')](_0x5628bf,_0x9d3212))return;}this[_0x2900('0x37f')](_0x1bf136);},Game_Map[_0x2900('0x133')][_0x2900('0x2c8')]=function(_0x1d7462,_0x4ca928,_0x5724c9,_0x45d8a6){const _0x49f148=[],_0x3f3aca=this['width'](),_0x564332=this[_0x2900('0x131')]();for(let _0x42ff9a=0x0;_0x42ff9a<_0x3f3aca;_0x42ff9a++){if('RAPjo'==='RAPjo')for(let _0x576527=0x0;_0x576527<_0x564332;_0x576527++){if(!_0x4ca928[_0x2900('0x3fe')](this['regionId'](_0x42ff9a,_0x576527)))continue;if(!this['isValid'](_0x42ff9a,_0x576527))continue;if(_0x5724c9){if(this[_0x2900('0x22f')](_0x42ff9a,_0x576527)[_0x2900('0x311')]>0x0)continue;if($gamePlayer['x']===_0x42ff9a&&$gamePlayer['y']===_0x576527)continue;if(this[_0x2900('0x11b')]()['posNt'](_0x42ff9a,_0x576527))continue;if(this['ship']()[_0x2900('0x13f')](_0x42ff9a,_0x576527))continue;}if(_0x45d8a6){if(!this['isPassableByAnyDirection'](_0x42ff9a,_0x576527))continue;}_0x49f148[_0x2900('0x315')]([_0x42ff9a,_0x576527]);}else{function _0x54b842(){this[_0x2900('0xad')][_0x2900('0x167')]=![];}}}if(_0x49f148[_0x2900('0x311')]>0x0){const _0x34b644=_0x49f148[Math[_0x2900('0x3a8')](_0x49f148[_0x2900('0x311')])];_0x1d7462['x']=_0x34b644[0x0],_0x1d7462['y']=_0x34b644[0x1],this[_0x2900('0x37f')](_0x1d7462);}},Game_Map['prototype']['isPassableByAnyDirection']=function(_0x1918b0,_0x55503d){if(this[_0x2900('0x268')](_0x1918b0,_0x55503d,0x2))return!![];if(this[_0x2900('0x268')](_0x1918b0,_0x55503d,0x4))return!![];if(this[_0x2900('0x268')](_0x1918b0,_0x55503d,0x6))return!![];if(this[_0x2900('0x268')](_0x1918b0,_0x55503d,0x8))return!![];return![];},Game_Map[_0x2900('0x133')][_0x2900('0x256')]=function(_0x1fb0e7){if(_0x1fb0e7<0x3e8)return;if(!this[_0x2900('0xaf')])return;const _0x5481aa=this[_0x2900('0x28f')](_0x1fb0e7);_0x5481aa[_0x2900('0x37a')](-0x1,-0x1),_0x5481aa['erase'](),this[_0x2900('0xaf')][_0x1fb0e7-0x3e8]=null,this[_0x2900('0x21')]();},Game_Map[_0x2900('0x133')]['firstSpawnedEvent']=function(){for(const _0x6d428d of this[_0x2900('0xaf')]){if(_0x6d428d)return _0x6d428d;}return null;},Game_Map[_0x2900('0x133')][_0x2900('0x90')]=function(){const _0x3f418d=this['firstSpawnedEvent']();return _0x3f418d?_0x3f418d[_0x2900('0x111')]:0x0;},Game_Map['prototype']['lastSpawnedEvent']=function(){const _0x57615a=this[_0x2900('0xaf')][_0x2900('0x1ea')](0x0)['reverse']();for(const _0x45ef89 of _0x57615a){if(_0x45ef89)return _0x45ef89;}return null;},Game_Map[_0x2900('0x133')][_0x2900('0x99')]=function(){const _0x2e71d1=this[_0x2900('0x334')]();return _0x2e71d1?_0x2e71d1[_0x2900('0x111')]:0x0;},Game_Map['prototype'][_0x2900('0x3f9')]=function(_0x59fe31,_0x1b4900){const _0x15aafa=this[_0x2900('0x22f')](_0x59fe31,_0x1b4900);for(const _0x2e8370 of _0x15aafa){if(_0x2900('0xbe')===_0x2900('0xf3')){function _0x330c50(){const _0x17865e=_0x2bfcef[_0x2900('0x3e8')](this['moveSynchTarget']()),_0x383c35=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x17865e[_0x2900('0xc6')]()];this[_0x2900('0x157')](_0x383c35);}}else{if(!_0x2e8370)continue;if(_0x2e8370[_0x2900('0x2fb')]())this[_0x2900('0x256')](_0x2e8370[_0x2900('0x111')]);}}},Game_Map['prototype'][_0x2900('0x222')]=function(_0x53eb06){for(const _0x4a36ee of this['_spawnedEvents']){if(!_0x4a36ee)continue;if(_0x53eb06[_0x2900('0x3fe')](_0x4a36ee[_0x2900('0xc5')]())){if(_0x2900('0x327')!=='RHCEA')this[_0x2900('0x256')](_0x4a36ee[_0x2900('0x111')]);else{function _0xd2588d(){return _0x27e038[_0x2900('0x34a')]();}}}}},Game_Map[_0x2900('0x133')]['despawnEverything']=function(){for(const _0x427ac0 of this[_0x2900('0xaf')]){if(!_0x427ac0)continue;this['despawnEventId'](_0x427ac0[_0x2900('0x111')]);}},Game_CommonEvent[_0x2900('0x133')][_0x2900('0xe4')]=function(){const _0x3bf8a7=this[_0x2900('0x28f')]();return this[_0x2900('0x202')]()&&_0x3bf8a7[_0x2900('0x158')]>=0x1&&DataManager[_0x2900('0x3d9')](_0x3bf8a7[_0x2900('0xb2')]);},Game_CommonEvent[_0x2900('0x133')][_0x2900('0x398')]=function(){return VisuMZ[_0x2900('0x306')][_0x2900('0x406')][_0x2900('0x2c2')][_0x2900('0x3fe')](this[_0x2900('0x6a')]);},VisuMZ[_0x2900('0x306')][_0x2900('0x82')]=Game_CommonEvent[_0x2900('0x133')]['isActive'],Game_CommonEvent[_0x2900('0x133')][_0x2900('0x202')]=function(){return VisuMZ['EventsMoveCore'][_0x2900('0x82')][_0x2900('0x302')](this)?!![]:VisuMZ['EventsMoveCore'][_0x2900('0x406')][_0x2900('0x35b')](this[_0x2900('0x28f')]()[_0x2900('0x117')],this[_0x2900('0x6a')]);},VisuMZ[_0x2900('0x306')]['Game_Map_parallelCommonEvents']=Game_Map[_0x2900('0x133')][_0x2900('0x1ab')],Game_Map[_0x2900('0x133')][_0x2900('0x1ab')]=function(){const _0x76c375=VisuMZ[_0x2900('0x306')][_0x2900('0x192')][_0x2900('0x302')](this),_0x2f9fad=VisuMZ[_0x2900('0x306')]['CustomPageConditions'][_0x2900('0x2c2')]['map'](_0x3250f2=>$dataCommonEvents[_0x3250f2]);return _0x76c375[_0x2900('0x36')](_0x2f9fad)[_0x2900('0x40')]((_0x2e6cc3,_0x338bba,_0x325c54)=>_0x325c54[_0x2900('0x35d')](_0x2e6cc3)===_0x338bba);},VisuMZ[_0x2900('0x306')]['Game_CharacterBase_initMembers']=Game_CharacterBase[_0x2900('0x133')][_0x2900('0x3e4')],Game_CharacterBase[_0x2900('0x133')][_0x2900('0x3e4')]=function(){VisuMZ[_0x2900('0x306')][_0x2900('0x32b')][_0x2900('0x302')](this),this[_0x2900('0x355')]();},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x355')]=function(){this[_0x2900('0x1dd')]=![],this['clearPose'](),this[_0x2900('0x2df')](),this[_0x2900('0x262')](),this['clearStepPattern']();},Game_CharacterBase[_0x2900('0x133')]['isSpriteVS8dir']=function(){if(this[_0x2900('0x28d')]===Game_Player&&this[_0x2900('0x328')]())return this[_0x2900('0x1ac')]()['characterName']()[_0x2900('0x89')](/\[VS8\]/i);else return Imported[_0x2900('0x2d1')]&&this[_0x2900('0x412')]()?!![]:this[_0x2900('0x10a')]()[_0x2900('0x89')](/\[VS8\]/i);},VisuMZ['EventsMoveCore'][_0x2900('0x403')]=Game_CharacterBase[_0x2900('0x133')]['direction'],Game_CharacterBase[_0x2900('0x133')]['direction']=function(){if(this['isOnLadder']()&&!this['isJumping']()&&this[_0x2900('0x207')]())return this[_0x2900('0x2a8')]();else{if(this[_0x2900('0x225')]()&&!this['isJumping']()){if(_0x2900('0x248')===_0x2900('0x248'))return 0x8;else{function _0x5c189c(){this[_0x2900('0x11d')]();}}}else{if(this[_0x2900('0x3f1')]()&&this[_0x2900('0x207')]())return this['getPosingCharacterDirection']();else{if(_0x2900('0x19e')===_0x2900('0x19e'))return VisuMZ[_0x2900('0x306')][_0x2900('0x403')][_0x2900('0x302')](this);else{function _0x2a9429(){return _0x5baf27>0x0?0x6:0x4;}}}}}},VisuMZ[_0x2900('0x306')][_0x2900('0x407')]=Game_CharacterBase[_0x2900('0x133')][_0x2900('0x13a')],Game_CharacterBase[_0x2900('0x133')][_0x2900('0x13a')]=function(_0x1cba23){if(!this['isSpriteVS8dir']())_0x1cba23=this[_0x2900('0x11')](_0x1cba23);VisuMZ[_0x2900('0x306')]['Game_CharacterBase_setDirection']['call'](this,_0x1cba23);},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x11')]=function(_0x574327){if(_0x574327===0x1)return this[_0x2900('0x265')](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x574327===0x3)return this[_0x2900('0x265')](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x574327===0x7)return this['canPass'](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x574327===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x574327;},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x8e')]=function(_0x34070c){return[0x1,0x3,0x5,0x7,0x9][_0x2900('0x3fe')](_0x34070c);},Game_CharacterBase[_0x2900('0x133')][_0x2900('0xc6')]=function(){return this[_0x2900('0x1bc')]||0x0;},VisuMZ[_0x2900('0x306')][_0x2900('0x3db')]=Game_CharacterBase[_0x2900('0x133')][_0x2900('0x23e')],Game_CharacterBase[_0x2900('0x133')][_0x2900('0x23e')]=function(_0x31e20e){this[_0x2900('0x1bc')]=_0x31e20e,VisuMZ['EventsMoveCore'][_0x2900('0x3db')][_0x2900('0x302')](this,_0x31e20e);},Game_CharacterBase[_0x2900('0x133')]['executeMoveDir8']=function(_0x479c28){if(!this[_0x2900('0x8e')](_0x479c28))return this[_0x2900('0x23e')](_0x479c28);let _0x12ecd6=0x0,_0x43e976=0x0;switch(_0x479c28){case 0x1:_0x12ecd6=0x4,_0x43e976=0x2;break;case 0x3:_0x12ecd6=0x6,_0x43e976=0x2;break;case 0x7:_0x12ecd6=0x4,_0x43e976=0x8;break;case 0x9:_0x12ecd6=0x6,_0x43e976=0x8;break;}if(VisuMZ[_0x2900('0x306')]['Settings'][_0x2900('0x16b')][_0x2900('0xb5')]){if(!this[_0x2900('0x265')](this['_x'],this['_y'],_0x12ecd6)){if(_0x2900('0x1ff')===_0x2900('0xa1')){function _0x2bc221(){this[_0x2900('0x164')][_0x2900('0x152')]=_0x2ab5ff(_0x414d0a['$1']),this['_labelWindow'][_0x2900('0x1f3')]=_0x468fad(_0x5e4918['$2']);}}else return this['moveStraight'](_0x43e976);}if(!this[_0x2900('0x265')](this['_x'],this['_y'],_0x43e976)){if(_0x2900('0x26b')!=='iwDOD')return this[_0x2900('0x23e')](_0x12ecd6);else{function _0x318616(){if(this['_PreservedEventMorphData']===_0xa01892)this[_0x2900('0x3d')]();const _0x7428c=_0x2900('0x390')[_0x2900('0xc1')](_0x30ffad,_0x4a96c9);this[_0x2900('0x160')][_0x7428c]={'template':_0xc1efa1,'mapId':_0xaba646,'eventId':_0x4a6b9d};}}}if(!this[_0x2900('0x1a1')](this['_x'],this['_y'],_0x12ecd6,_0x43e976)){let _0x21c827=VisuMZ['EventsMoveCore'][_0x2900('0x3e0')]['Movement']['FavorHorz']?_0x12ecd6:_0x43e976;return this[_0x2900('0x23e')](_0x21c827);}}this[_0x2900('0x1bc')]=_0x479c28,this['moveDiagonally'](_0x12ecd6,_0x43e976);},VisuMZ['EventsMoveCore'][_0x2900('0x316')]=Game_CharacterBase[_0x2900('0x133')][_0x2900('0x2eb')],Game_CharacterBase[_0x2900('0x133')][_0x2900('0x2eb')]=function(){let _0x279b01=this[_0x2900('0x20e')];return this[_0x2900('0x34a')]()&&(_0x279b01+=this[_0x2900('0x60')]()),this[_0x2900('0x2c9')](_0x279b01);},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x60')]=function(){const _0x4835f6=VisuMZ['EventsMoveCore']['Settings'][_0x2900('0x16b')];if(_0x4835f6[_0x2900('0x359')]!==undefined){if(_0x2900('0xcf')!==_0x2900('0xcf')){function _0x227bc0(){return _0x4c0fc5[_0x2900('0xaa')]&&_0x1f63bf['description'][_0x2900('0x3fe')]('['+_0x1a1acd+']');}}else return _0x4835f6[_0x2900('0x359')];}else return VisuMZ[_0x2900('0x306')][_0x2900('0x316')][_0x2900('0x302')](this)-this[_0x2900('0x20e')];},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x2c9')]=function(_0x8d3a1d){const _0x44ecc4=VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x16b')];if(!_0x44ecc4[_0x2900('0x5d')])return _0x8d3a1d;if([0x1,0x3,0x7,0x9][_0x2900('0x3fe')](this[_0x2900('0x1bc')])){if(_0x2900('0x108')===_0x2900('0x108'))_0x8d3a1d*=_0x44ecc4[_0x2900('0x29f')]||0.01;else{function _0x22c0f3(){_0x2ced0e('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x2900('0xc1')](_0x82d652,_0x247e3a)),_0x444db3[_0x2900('0x239')]();}}}return _0x8d3a1d;},VisuMZ[_0x2900('0x306')]['Game_CharacterBase_isDashing']=Game_CharacterBase[_0x2900('0x133')][_0x2900('0x34a')],Game_CharacterBase[_0x2900('0x133')][_0x2900('0x34a')]=function(){if(this[_0x2900('0x6')])return!![];return VisuMZ['EventsMoveCore'][_0x2900('0x3cc')][_0x2900('0x302')](this);},Game_CharacterBase['prototype'][_0x2900('0x2f4')]=function(){return this[_0x2900('0x34a')]();},VisuMZ[_0x2900('0x306')]['Game_CharacterBase_pattern']=Game_CharacterBase[_0x2900('0x133')][_0x2900('0x2d')],Game_CharacterBase['prototype'][_0x2900('0x2d')]=function(){if(this[_0x2900('0x3f1')]()){if(_0x2900('0x17e')!==_0x2900('0x17e')){function _0x4c0751(){this[_0x2900('0x362')][_0x2900('0x173')]=_0x4539bd(_0x132469['$1'])['toLowerCase']()[_0x2900('0x17')]();}}else return this[_0x2900('0x96')]();}else{if(_0x2900('0x132')!==_0x2900('0x35f'))return VisuMZ['EventsMoveCore'][_0x2900('0x231')][_0x2900('0x302')](this);else{function _0x14993a(){if(_0x454504)this['processMoveRouteJumpTo'](_0x28da21['x'],_0xea9b63['y']);}}}},VisuMZ[_0x2900('0x306')][_0x2900('0x14c')]=Game_CharacterBase['prototype'][_0x2900('0x8b')],Game_CharacterBase[_0x2900('0x133')][_0x2900('0x8b')]=function(){VisuMZ[_0x2900('0x306')][_0x2900('0x14c')][_0x2900('0x302')](this),this[_0x2900('0x371')]();},VisuMZ[_0x2900('0x306')]['Game_CharacterBase_characterIndex']=Game_CharacterBase[_0x2900('0x133')][_0x2900('0x3e6')],Game_CharacterBase[_0x2900('0x133')][_0x2900('0x3e6')]=function(){if(this[_0x2900('0x207')]())return this[_0x2900('0x3b9')]();return VisuMZ[_0x2900('0x306')][_0x2900('0x353')]['call'](this);},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x3b9')]=function(){const _0x151510=this[_0x2900('0x7d')]();if(this[_0x2900('0x252')]()){if(_0x2900('0x2ed')!==_0x2900('0x2ed')){function _0x2aa52b(){return _0x24e1d1['dir8'];}}else{if([0x2,0x4,0x6,0x8]['includes'](_0x151510))return 0x4;if([0x1,0x3,0x7,0x9][_0x2900('0x3fe')](_0x151510))return 0x5;}}else{if(this['isOnLadder']())return 0x6;else{if(this['isPosing']())return this['getPosingCharacterIndex']();else{if(this[_0x2900('0x354')]()&&this[_0x2900('0x389')]()){if([0x2,0x4,0x6,0x8]['includes'](_0x151510))return 0x4;if([0x1,0x3,0x7,0x9][_0x2900('0x3fe')](_0x151510))return 0x5;}else{if(this[_0x2900('0x2f4')]()){if(_0x2900('0x241')!=='sIPCZ'){function _0x365d75(){const _0x169ad2=this[_0x2900('0x27')]();if(!_0x169ad2)return![];return _0x169ad2[_0x2900('0xd3')]>0x0;}}else{if([0x2,0x4,0x6,0x8][_0x2900('0x3fe')](_0x151510))return 0x2;if([0x1,0x3,0x7,0x9][_0x2900('0x3fe')](_0x151510))return 0x3;}}else{if(_0x2900('0xf5')!=='xpcjt'){function _0x26662b(){if(_0x280565===0x4&&_0x1d1a5b===0x2)this[_0x2900('0x13a')](0x1);if(_0x4c3523===0x6&&_0x5fa667===0x2)this[_0x2900('0x13a')](0x3);if(_0x58c12a===0x4&&_0x583098===0x8)this[_0x2900('0x13a')](0x7);if(_0x4b7fc0===0x6&&_0x5b289f===0x8)this[_0x2900('0x13a')](0x9);}}else{if([0x2,0x4,0x6,0x8][_0x2900('0x3fe')](_0x151510))return 0x0;if([0x1,0x3,0x7,0x9][_0x2900('0x3fe')](_0x151510))return 0x1;}}}}}}},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x389')]=function(){return VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x61')]['CarryPose'];},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x2')]=function(){return this['isOnLadder']()&&this[_0x2900('0x86')]()===VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x2e1')]['Rope'];},Game_CharacterBase['prototype'][_0x2900('0x2a8')]=function(){if(this[_0x2900('0x2')]())return 0x4;else{if(_0x2900('0x185')!==_0x2900('0x185')){function _0x2e40c3(){_0x165111[_0x2900('0x315')](_0x4a973f),_0x45786d[_0x2900('0x315')](_0x141de8);}}else return 0x2;}},VisuMZ[_0x2900('0x306')][_0x2900('0x367')]=Game_CharacterBase[_0x2900('0x133')][_0x2900('0x372')],Game_CharacterBase[_0x2900('0x133')][_0x2900('0x372')]=function(){VisuMZ[_0x2900('0x306')][_0x2900('0x367')]['call'](this),this[_0x2900('0x244')]();},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x244')]=function(){this[_0x2900('0x2a9')]=this[_0x2900('0x2a9')]||0x0;if(this[_0x2900('0x2a9')]>0x0){this[_0x2900('0x2a9')]--;if(this['_poseDuration']<=0x0&&this[_0x2900('0x235')]!==_0x2900('0x201'))this[_0x2900('0x371')]();}},VisuMZ['EventsMoveCore'][_0x2900('0x94')]=Game_CharacterBase[_0x2900('0x133')][_0x2900('0x38e')],Game_CharacterBase[_0x2900('0x133')][_0x2900('0x38e')]=function(_0x381922,_0x3ef052){VisuMZ[_0x2900('0x306')][_0x2900('0x94')][_0x2900('0x302')](this,_0x381922,_0x3ef052);if(this[_0x2900('0x207')]())this[_0x2900('0x275')](_0x381922,_0x3ef052);},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x275')]=function(_0x9c0e8,_0x5df97a){if(_0x9c0e8===0x4&&_0x5df97a===0x2)this[_0x2900('0x13a')](0x1);if(_0x9c0e8===0x6&&_0x5df97a===0x2)this[_0x2900('0x13a')](0x3);if(_0x9c0e8===0x4&&_0x5df97a===0x8)this[_0x2900('0x13a')](0x7);if(_0x9c0e8===0x6&&_0x5df97a===0x8)this[_0x2900('0x13a')](0x9);},VisuMZ[_0x2900('0x306')][_0x2900('0xc4')]=Game_CharacterBase['prototype']['hasStepAnime'],Game_CharacterBase[_0x2900('0x133')][_0x2900('0x171')]=function(){if(this[_0x2900('0x3f1')]()&&this['getPose']()===_0x2900('0x201'))return!![];return VisuMZ[_0x2900('0x306')]['Game_CharacterBase_hasStepAnime'][_0x2900('0x302')](this);},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x2f5')]=function(_0x1937d7,_0x4cc425){if(this['isSpriteVS8dir']()){if(_0x2900('0x2e6')===_0x2900('0x2cf')){function _0x518915(){this[_0x2900('0x3e1')]();}}else this['_pose']=_0x1937d7[_0x2900('0x2f3')]()[_0x2900('0x17')](),this['_poseDuration']=_0x4cc425||Infinity;}},Game_CharacterBase[_0x2900('0x133')]['getPose']=function(){if(this[_0x2900('0x207')]())return(this[_0x2900('0x235')]||'')[_0x2900('0x2f3')]()[_0x2900('0x17')]();else{if(_0x2900('0x1a4')===_0x2900('0x1a4'))return''[_0x2900('0x2f3')]()[_0x2900('0x17')]();else{function _0x1b5da7(){const _0x5ee496=this[_0x2900('0x7d')]();return _0x1d41b8[_0x2900('0x20a')](this['x'],_0x5ee496);}}}},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x15d')]=function(_0x5516bf,_0x553bcc){if(this[_0x2900('0x207')]()){if(_0x2900('0x18a')!==_0x2900('0x18a')){function _0x334c59(){const _0x584bf1=this[_0x2900('0x28f')]()['note'];if(_0x584bf1==='')return;if(_0x530b5c[_0x2900('0x233')]()||_0x44abac[_0x2900('0x1cd')]())return;const _0x108297=_0x3d3977[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x1f2')];let _0x3f262e=null,_0x7c7322=0x0,_0x3c3a4e=0x0;if(_0x584bf1['match'](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x7c7322=_0x5c8922(_0x17d02e['$1']),_0x3c3a4e=_0x33bcd4(_0x157e14['$2']);else{if(_0x584bf1['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x7c7322=_0x15bf44(_0x5215e3['$1']),_0x3c3a4e=_0x2f64df(_0x5195df['$2']);else{if(_0x584bf1[_0x2900('0x89')](/<COPY EVENT:[ ](.*?)>/i)){const _0x4f8f74=_0x18d1a4(_0x188c35['$1'])[_0x2900('0x2f3')]()[_0x2900('0x17')]();_0x3f262e=_0x526b2c[_0x2900('0x3a3')][_0x4f8f74];if(!_0x3f262e)return;_0x7c7322=_0x3f262e[_0x2900('0x2ee')],_0x3c3a4e=_0x3f262e[_0x2900('0xf')];}}}if(!this['checkValidEventerMap'](_0x7c7322,_0x3c3a4e))return;_0x108297[_0x2900('0x1c7')][_0x2900('0x302')](this,_0x7c7322,_0x3c3a4e,this);if(_0x3f262e)_0x3f262e[_0x2900('0x1c7')][_0x2900('0x302')](this,_0x7c7322,_0x3c3a4e,this);this[_0x2900('0x215')]={'mapId':_0x7c7322,'eventId':_0x3c3a4e},this[_0x2900('0x279')]=-0x2,this['refresh'](),_0x108297[_0x2900('0x2ad')][_0x2900('0x302')](this,_0x7c7322,_0x3c3a4e,this);if(_0x3f262e)_0x3f262e['PostCopyJS']['call'](this,_0x7c7322,_0x3c3a4e,this);_0x179f1c[_0x2900('0x21')]();}}else{const _0xc1b99b=['',_0x2900('0x339'),'QUESTION',_0x2900('0xa4'),'HEART','ANGER','SWEAT',_0x2900('0x23f'),_0x2900('0x16c'),_0x2900('0x323'),'ZZZ','','','','',''][_0x5516bf];this['setPose'](_0xc1b99b,_0x553bcc);}}},Game_CharacterBase['prototype']['clearPose']=function(){this[_0x2900('0x235')]='',this[_0x2900('0x2a9')]=0x0;},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x3f1')]=function(){return this[_0x2900('0x207')]()&&!!this[_0x2900('0x235')];},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x2cd')]=function(){const _0x5ba661=this[_0x2900('0x235')][_0x2900('0x2f3')]();switch(this[_0x2900('0x235')][_0x2900('0x2f3')]()[_0x2900('0x17')]()){case _0x2900('0xbd'):case'HMPH':case _0x2900('0x2e4'):case _0x2900('0x3e9'):case _0x2900('0x1f7'):case _0x2900('0xa7'):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase['prototype'][_0x2900('0xa6')]=function(){switch(this[_0x2900('0x235')][_0x2900('0x2f3')]()){case _0x2900('0x339'):case _0x2900('0xce'):case _0x2900('0xa4'):return 0x2;break;case _0x2900('0x19b'):case _0x2900('0x293'):case _0x2900('0x3c2'):return 0x4;break;case'ITEM':case _0x2900('0x313'):case _0x2900('0x2e4'):case'COBWEB':case _0x2900('0x16c'):case _0x2900('0x323'):return 0x6;break;case _0x2900('0x3e9'):case _0x2900('0x1f7'):case _0x2900('0xa7'):case'ZZZ':return 0x8;break;default:return VisuMZ['EventsMoveCore'][_0x2900('0x407')][_0x2900('0x302')](this);break;}},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x96')]=function(){switch(this[_0x2900('0x235')][_0x2900('0x2f3')]()){case _0x2900('0xbd'):case'HURT':case _0x2900('0x339'):case _0x2900('0x19b'):case _0x2900('0x23f'):return 0x0;break;case _0x2900('0x313'):case'KNEEL':case _0x2900('0xce'):case _0x2900('0x293'):case _0x2900('0x16c'):return 0x1;break;case _0x2900('0x2e4'):case _0x2900('0xa7'):case _0x2900('0xa4'):case'SWEAT':case'LIGHT\x20BULB':return 0x2;break;default:return VisuMZ[_0x2900('0x306')][_0x2900('0x231')]['call'](this);break;}},Game_CharacterBase['prototype'][_0x2900('0x5e')]=function(){this[_0x2900('0x6')]=!![];},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x2df')]=function(){this[_0x2900('0x6')]=![];},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x15')]=function(){if(this['isTile']())return![];if(this[_0x2900('0x50')])return![];if(this['_transparent'])return![];if(this[_0x2900('0x3c5')]==='')return![];if(this[_0x2900('0x28d')]===Game_Vehicle)return![];return!![];},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x1be')]=function(){if(this[_0x2900('0x225')]())return!![];if(this[_0x2900('0x28d')]===Game_Player&&this['isInVehicle']())return!![];return![];},Game_CharacterBase['prototype'][_0x2900('0x123')]=function(){return VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x16b')][_0x2900('0x3dd')];},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x249')]=function(){return this[_0x2900('0x271')]();},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x1c2')]=function(){return this[_0x2900('0x3ba')]()+this['shiftY']()+this[_0x2900('0x20c')]();},Game_Character[_0x2900('0x133')][_0x2900('0x31b')]=function(_0x1bdeb1,_0xf63d55){const _0x3cc899=this[_0x2900('0x23c')](),_0x15e4cc=$gameMap[_0x2900('0xe')](),_0x564729=[],_0x7949e8=[],_0x30a67c=[],_0x5ba317={};let _0x270f20=_0x5ba317;if(this['x']===_0x1bdeb1&&this['y']===_0xf63d55)return 0x0;_0x5ba317[_0x2900('0x380')]=null,_0x5ba317['x']=this['x'],_0x5ba317['y']=this['y'],_0x5ba317['g']=0x0,_0x5ba317['f']=$gameMap[_0x2900('0x2fa')](_0x5ba317['x'],_0x5ba317['y'],_0x1bdeb1,_0xf63d55),_0x564729[_0x2900('0x315')](_0x5ba317),_0x7949e8[_0x2900('0x315')](_0x5ba317['y']*_0x15e4cc+_0x5ba317['x']);while(_0x564729[_0x2900('0x311')]>0x0){let _0x4d7b68=0x0;for(let _0x461ab1=0x0;_0x461ab1<_0x564729[_0x2900('0x311')];_0x461ab1++){_0x564729[_0x461ab1]['f']<_0x564729[_0x4d7b68]['f']&&(_0x4d7b68=_0x461ab1);}const _0x1264d3=_0x564729[_0x4d7b68],_0x45a51d=_0x1264d3['x'],_0x14312d=_0x1264d3['y'],_0x381d32=_0x14312d*_0x15e4cc+_0x45a51d,_0xe44f01=_0x1264d3['g'];_0x564729[_0x2900('0x251')](_0x4d7b68,0x1),_0x7949e8[_0x2900('0x251')](_0x7949e8[_0x2900('0x35d')](_0x381d32),0x1),_0x30a67c[_0x2900('0x315')](_0x381d32);if(_0x1264d3['x']===_0x1bdeb1&&_0x1264d3['y']===_0xf63d55){_0x270f20=_0x1264d3;break;}if(_0xe44f01>=_0x3cc899)continue;for(let _0x1985ad=0x1;_0x1985ad<0xa;_0x1985ad++){if(_0x1985ad===0x5)continue;const _0x5ec11b=_0x1985ad,_0x34dee5=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6][_0x1985ad],_0x1dd36d=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8][_0x1985ad],_0x591770=$gameMap[_0x2900('0x20a')](_0x45a51d,_0x5ec11b),_0x186c49=$gameMap['roundYWithDirection'](_0x14312d,_0x5ec11b),_0x4c6783=_0x186c49*_0x15e4cc+_0x591770;if(_0x30a67c[_0x2900('0x3fe')](_0x4c6783)){if(_0x2900('0x181')===_0x2900('0x181'))continue;else{function _0x212256(){return!!this[_0x2900('0x79')](_0x29a744);}}}if(this[_0x2900('0x28d')]===Game_Player&&VisuMZ[_0x2900('0x306')]['Settings'][_0x2900('0x16b')]['StrictCollision']){if(!this[_0x2900('0x265')](_0x45a51d,_0x14312d,_0x34dee5))continue;if(!this[_0x2900('0x265')](_0x45a51d,_0x14312d,_0x1dd36d))continue;}if(!this[_0x2900('0x1a1')](_0x45a51d,_0x14312d,_0x34dee5,_0x1dd36d))continue;const _0x5d95a3=_0xe44f01+0x1,_0x4f5d8c=_0x7949e8[_0x2900('0x35d')](_0x4c6783);if(_0x4f5d8c<0x0||_0x5d95a3<_0x564729[_0x4f5d8c]['g']){if(_0x2900('0x246')!=='icFut'){let _0x2cc462={};if(_0x4f5d8c>=0x0){if(_0x2900('0x66')!==_0x2900('0xe2'))_0x2cc462=_0x564729[_0x4f5d8c];else{function _0x5a858d(){const _0x589eaf=_0xcfb77[_0x2900('0x416')][0x0];this[_0x2900('0x3f6')](_0x2d0db,_0x589eaf);}}}else _0x564729[_0x2900('0x315')](_0x2cc462),_0x7949e8[_0x2900('0x315')](_0x4c6783);_0x2cc462['parent']=_0x1264d3,_0x2cc462['x']=_0x591770,_0x2cc462['y']=_0x186c49,_0x2cc462['g']=_0x5d95a3,_0x2cc462['f']=_0x5d95a3+$gameMap[_0x2900('0x2fa')](_0x591770,_0x186c49,_0x1bdeb1,_0xf63d55),(!_0x270f20||_0x2cc462['f']-_0x2cc462['g']<_0x270f20['f']-_0x270f20['g'])&&(_0x270f20=_0x2cc462);}else{function _0x1a11a7(){_0xd195e3[_0x2900('0x306')][_0x2900('0x338')][_0x2900('0x302')](this,_0x201662),this[_0x2900('0x2b1')]=_0x327be4[_0x2900('0x3a4')]();}}}}}let _0x3a0e38=_0x270f20;while(_0x3a0e38[_0x2900('0x380')]&&_0x3a0e38[_0x2900('0x380')]!==_0x5ba317){_0x3a0e38=_0x3a0e38[_0x2900('0x380')];}const _0x3174d0=$gameMap[_0x2900('0xee')](_0x3a0e38['x'],_0x5ba317['x']),_0x2d6b3b=$gameMap[_0x2900('0x3c7')](_0x3a0e38['y'],_0x5ba317['y']);if(_0x3174d0<0x0&&_0x2d6b3b>0x0)return 0x1;if(_0x3174d0>0x0&&_0x2d6b3b>0x0)return 0x3;if(_0x3174d0<0x0&&_0x2d6b3b<0x0)return 0x7;if(_0x3174d0>0x0&&_0x2d6b3b<0x0)return 0x9;if(_0x2d6b3b>0x0)return 0x2;if(_0x3174d0<0x0)return 0x4;if(_0x3174d0>0x0)return 0x6;if(_0x2d6b3b<0x0)return 0x8;const _0x5df6ab=this[_0x2900('0x377')](_0x1bdeb1),_0x132d50=this[_0x2900('0x1fe')](_0xf63d55);if(Math[_0x2900('0x40b')](_0x5df6ab)>Math['abs'](_0x132d50)){if('nzbcf'===_0x2900('0x3d0')){function _0x389499(){if(!this['canPass'](this['_x'],this['_y'],_0x294968))return this['moveStraight'](_0x4e0640);if(!this[_0x2900('0x265')](this['_x'],this['_y'],_0x24dd34))return this[_0x2900('0x23e')](_0x32cba5);if(!this[_0x2900('0x1a1')](this['_x'],this['_y'],_0x5b3ae2,_0x14e2a3)){let _0x440767=_0x1e6f66[_0x2900('0x306')]['Settings']['Movement'][_0x2900('0x25a')]?_0x218c85:_0x519700;return this[_0x2900('0x23e')](_0x440767);}}}else return _0x5df6ab>0x0?0x4:0x6;}else{if(_0x132d50!==0x0)return _0x132d50>0x0?0x8:0x2;}return 0x0;},VisuMZ[_0x2900('0x306')]['Game_CharacterBase_canPass']=Game_CharacterBase[_0x2900('0x133')][_0x2900('0x265')],Game_CharacterBase[_0x2900('0x133')][_0x2900('0x265')]=function(_0x16d578,_0x146b8c,_0xf264c){if(this[_0x2900('0x221')]===_0x2900('0x128'))return this['vehicle']()[_0x2900('0x74')](_0x16d578,_0x146b8c,_0xf264c);else{if(_0x2900('0x22e')===_0x2900('0x22e'))return VisuMZ['EventsMoveCore'][_0x2900('0xe6')]['call'](this,_0x16d578,_0x146b8c,_0xf264c);else{function _0x41297a(){this[_0x2900('0x260')](_0xd1d137,_0x37664a);}}}},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x262')]=function(){this[_0x2900('0x109')]=0x0,this[_0x2900('0x2bc')]=0x0;},VisuMZ[_0x2900('0x306')][_0x2900('0xcc')]=Game_CharacterBase[_0x2900('0x133')][_0x2900('0x271')],Game_CharacterBase['prototype'][_0x2900('0x271')]=function(){return VisuMZ['EventsMoveCore'][_0x2900('0xcc')][_0x2900('0x302')](this)+(this['_spriteOffsetX']||0x0);},VisuMZ[_0x2900('0x306')]['Game_CharacterBase_screenY']=Game_CharacterBase['prototype'][_0x2900('0x3ba')],Game_CharacterBase[_0x2900('0x133')][_0x2900('0x3ba')]=function(){return VisuMZ[_0x2900('0x306')]['Game_CharacterBase_screenY'][_0x2900('0x302')](this)+(this[_0x2900('0x2bc')]||0x0);},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x2de')]=function(){this[_0x2900('0x2b8')]='';},VisuMZ[_0x2900('0x306')][_0x2900('0x27e')]=Game_CharacterBase[_0x2900('0x133')][_0x2900('0x350')],Game_CharacterBase[_0x2900('0x133')][_0x2900('0x350')]=function(){if(this['_patternLocked'])return;if(this[_0x2900('0x264')]())return;VisuMZ[_0x2900('0x306')][_0x2900('0x27e')][_0x2900('0x302')](this);},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x264')]=function(){if(!this[_0x2900('0x171')]()&&this[_0x2900('0x209')]>0x0)return![];switch(String(this[_0x2900('0x2b8')])[_0x2900('0x2f3')]()[_0x2900('0x17')]()){case _0x2900('0x39f'):this[_0x2900('0x409')]+=0x1;if(this[_0x2900('0x409')]>0x2)this[_0x2900('0xc8')](0x0);break;case'RIGHT\x20TO\x20LEFT':this[_0x2900('0x409')]-=0x1;if(this['_pattern']<0x0)this[_0x2900('0xc8')](0x2);break;case _0x2900('0x1d2'):case _0x2900('0x3f3'):this[_0x2900('0xc7')]();break;case _0x2900('0x1f9'):case _0x2900('0x1e8'):case _0x2900('0x203'):case _0x2900('0x3b'):this['turnLeft90']();break;default:return![];}return!![];},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x27')]=function(){return $gameSystem[_0x2900('0x27')](this);},Game_CharacterBase['prototype'][_0x2900('0x354')]=function(){const _0x5ac805=this['getEventIconData']();if(!_0x5ac805)return![];return _0x5ac805[_0x2900('0xd3')]>0x0;},Game_CharacterBase['prototype'][_0x2900('0x388')]=function(){const _0x4cd8d8=this[_0x2900('0x7d')]();return $gameMap[_0x2900('0x20a')](this['x'],_0x4cd8d8);},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x3cd')]=function(){const _0x5e9ef6=this[_0x2900('0x7d')]();return $gameMap[_0x2900('0x3ee')](this['y'],_0x5e9ef6);},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x134')]=function(){const _0x147b1f=this[_0x2900('0x364')](this[_0x2900('0x7d')]());return $gameMap['roundXWithDirection'](this['x'],_0x147b1f);},Game_CharacterBase[_0x2900('0x133')][_0x2900('0x34')]=function(){const _0x59db0d=this[_0x2900('0x364')](this[_0x2900('0x7d')]());return $gameMap[_0x2900('0x3ee')](this['y'],_0x59db0d);},VisuMZ[_0x2900('0x306')]['Game_Character_setMoveRoute']=Game_Character[_0x2900('0x133')][_0x2900('0xb')],Game_Character[_0x2900('0x133')]['setMoveRoute']=function(_0x3d460b){route=JsonEx[_0x2900('0x2c3')](_0x3d460b),VisuMZ[_0x2900('0x306')][_0x2900('0x36f')][_0x2900('0x302')](this,route);},VisuMZ[_0x2900('0x306')][_0x2900('0xeb')]=Game_Character[_0x2900('0x133')]['forceMoveRoute'],Game_Character[_0x2900('0x133')][_0x2900('0x401')]=function(_0x16904a){route=JsonEx[_0x2900('0x2c3')](_0x16904a),VisuMZ[_0x2900('0x306')][_0x2900('0xeb')][_0x2900('0x302')](this,route);},VisuMZ[_0x2900('0x306')][_0x2900('0x37b')]=Game_Character[_0x2900('0x133')]['processMoveCommand'],Game_Character['prototype']['processMoveCommand']=function(_0x46f3a2){const _0x5b8375=Game_Character,_0x3491b3=_0x46f3a2['parameters'];if(_0x46f3a2[_0x2900('0x1ae')]===_0x5b8375[_0x2900('0x3eb')]){if(_0x2900('0x22a')===_0x2900('0x211')){function _0x44cbc9(){if(this['_moveOnlyRegions']===_0x1f034f)this[_0x2900('0xfb')]();return this[_0x2900('0x2b5')][_0x2900('0x311')]>0x0;}}else{const _0x5e2b45=_0x46f3a2[_0x2900('0x416')][0x0];this[_0x2900('0x3f6')](_0x46f3a2,_0x5e2b45);}}else{if(_0x2900('0x3c8')!==_0x2900('0x3c8')){function _0x224fd0(){return _0x413007['getEventIconData'](this);}}else VisuMZ[_0x2900('0x306')][_0x2900('0x37b')][_0x2900('0x302')](this,_0x46f3a2);}},Game_Character[_0x2900('0x133')][_0x2900('0x3f6')]=function(_0x1bb2b4,_0x2f90a2){if(_0x2f90a2[_0x2900('0x89')](/ANIMATION:[ ](\d+)/i))return this[_0x2900('0x88')](Number(RegExp['$1']));if(_0x2f90a2[_0x2900('0x89')](/BALLOON:[ ](.*)/i))return this[_0x2900('0x291')](String(RegExp['$1']));if(_0x2f90a2[_0x2900('0x89')](/HUG:[ ]LEFT/i))return this[_0x2900('0x3ca')](_0x2900('0x2f0'));if(_0x2f90a2[_0x2900('0x89')](/HUG:[ ]RIGHT/i))return this[_0x2900('0x3ca')](_0x2900('0x30a'));if(_0x2f90a2[_0x2900('0x89')](/INDEX:[ ](\d+)/i)){if(_0x2900('0x30c')!=='bZSUJ'){function _0x5d1973(){return this[_0x2900('0x2cd')]();}}else return this[_0x2900('0x7b')](Number(RegExp['$1']));}if(_0x2f90a2[_0x2900('0x89')](/INDEX:[ ]([\+\-]\d+)/i)){if('XMvHt'===_0x2900('0xc')){function _0x3e7550(){return _0x502ba4['EventsMoveCore'][_0x2900('0xcc')][_0x2900('0x302')](this)+(this[_0x2900('0x109')]||0x0);}}else{const _0x3cc50c=this['_characterIndex']+Number(RegExp['$1']);return this[_0x2900('0x7b')](_0x3cc50c);}}if(_0x2f90a2[_0x2900('0x89')](/JUMP FORWARD:[ ](\d+)/i)){if(_0x2900('0x298')!==_0x2900('0x180'))return this['processMoveRouteJumpForward'](Number(RegExp['$1']));else{function _0x294868(){let _0x4c3638='';for(const _0x265cf6 of _0x30996e['list']){[0x6c,0x198][_0x2900('0x3fe')](_0x265cf6[_0x2900('0x1ae')])&&(_0x4c3638+=_0x265cf6[_0x2900('0x416')][0x0]);}if(_0x4c3638['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x4c3638['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}}}if(_0x2f90a2[_0x2900('0x89')](/JUMP TO:[ ](\d+),[ ](\d+)/i)){if(_0x2900('0x1ee')===_0x2900('0x1ee'))return this[_0x2900('0x357')](Number(RegExp['$1']),Number(RegExp['$2']));else{function _0x12019c(){if([0x1,0x2,0x3][_0x2900('0x3fe')](_0x1028ae))_0x24f073+=0x1;if([0x7,0x8,0x9][_0x2900('0x3fe')](_0x2db6c6))_0x2266a2-=0x1;return this[_0x2900('0x107')](_0xf2479e);}}}if(_0x2f90a2[_0x2900('0x89')](/JUMP TO EVENT:[ ](\d+)/i)){const _0x390243=$gameEvents['event'](Number(RegExp['$1']));return this['processMoveRouteJumpToCharacter'](_0x390243);}if(_0x2f90a2[_0x2900('0x89')](/JUMP TO PLAYER/i))return this[_0x2900('0x1cf')]($gamePlayer);if(_0x2f90a2[_0x2900('0x89')](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0x18c021=String(RegExp['$1']);return this['processMoveRouteMoveUntilStop'](_0x18c021);}if(_0x2f90a2[_0x2900('0x89')](/MOVE TO:[ ](\d+),[ ](\d+)/i)){if(_0x2900('0x52')!==_0x2900('0x20d')){const _0x4c0e75=Number(RegExp['$1']),_0x482917=Number(RegExp['$2']);return this[_0x2900('0x32d')](_0x4c0e75,_0x482917);}else{function _0x3cc1e0(){if([0x6c,0x198]['includes'](_0x43f2ba[_0x2900('0x1ae')])){if(_0x40f485!=='')_0x23e3d5+='\x0a';_0x560c50+=_0x43b209[_0x2900('0x416')][0x0];}}}}if(_0x2f90a2[_0x2900('0x89')](/MOVE TO EVENT:[ ](\d+)/i)){if('IFLHP'!==_0x2900('0x374')){function _0x2c260c(){const _0xe49615=_0x3013f6(_0x34158e['$1'])['toUpperCase']()[_0x2900('0x17')](),_0x2dc65c=[_0x2900('0x122'),_0x2900('0x3b3'),_0x2900('0x30e'),'SCREEN'];this[_0x2900('0x28c')][_0x2900('0x29')]=_0x2dc65c[_0x2900('0x35d')](_0xe49615)[_0x2900('0x418')](0x0,0x3);}}else{const _0x4361a8=$gameEvents[_0x2900('0x28f')](Number(RegExp['$1']));return this[_0x2900('0x1ec')](_0x4361a8);}}if(_0x2f90a2[_0x2900('0x89')](/MOVE TO PLAYER/i))return this[_0x2900('0x1ec')]($gamePlayer);if(_0x2f90a2[_0x2900('0x89')](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x2900('0x56')](0x1,Number(RegExp['$1']));if(_0x2f90a2['match'](/MOVE DOWN:[ ](\d+)/i)){if(_0x2900('0x33a')===_0x2900('0x11a')){function _0x18ee0a(){return this[_0x2900('0x23e')](_0x42a57d);}}else return this[_0x2900('0x56')](0x2,Number(RegExp['$1']));}if(_0x2f90a2[_0x2900('0x89')](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x2900('0x56')](0x3,Number(RegExp['$1']));if(_0x2f90a2[_0x2900('0x89')](/MOVE LEFT:[ ](\d+)/i)){if('qOjAa'!==_0x2900('0x329')){function _0x2e1805(){return this[_0x2900('0x2a8')]();}}else return this['processMoveRouteMoveRepeat'](0x4,Number(RegExp['$1']));}if(_0x2f90a2[_0x2900('0x89')](/MOVE RIGHT:[ ](\d+)/i)){if(_0x2900('0x163')!==_0x2900('0x163')){function _0x28ac4e(){_0x3c0019[_0x2900('0xbb')]&&this[_0x2900('0xb3')](_0x262aa1,_0x120b0f['x']+0x2,_0x100014['y']),_0x42a071['x']+=_0x1c2351[_0x2900('0x55')](this[_0x2900('0x309')](),_0x176b78[_0x2900('0xa8')])+0x4;}}else return this[_0x2900('0x56')](0x6,Number(RegExp['$1']));}if(_0x2f90a2[_0x2900('0x89')](/MOVE UPPER LEFT:[ ](\d+)/i)){if(_0x2900('0x3f7')!==_0x2900('0x3f7')){function _0x5856a3(){this['_forceDashing']=!![];}}else return this[_0x2900('0x56')](0x7,Number(RegExp['$1']));}if(_0x2f90a2['match'](/MOVE UP:[ ](\d+)/i)){if(_0x2900('0xd9')!==_0x2900('0xd9')){function _0x5ade26(){return this['processMoveRoutePatternLock'](_0x55e04c(_0x3bbe3b['$1']));}}else return this['processMoveRouteMoveRepeat'](0x8,Number(RegExp['$1']));}if(_0x2f90a2[_0x2900('0x89')](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x2900('0x56')](0x9,Number(RegExp['$1']));if(_0x2f90a2[_0x2900('0x89')](/OPACITY:[ ](\d+)([%％])/i)){const _0x3ed4e0=Math[_0x2900('0x2ea')](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x3ed4e0['clamp'](0x0,0xff));}if(_0x2f90a2[_0x2900('0x89')](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){const _0x5dea54=this[_0x2900('0x15b')]+Math[_0x2900('0x2ea')](Number(RegExp['$1'])/0x64*0xff);return this[_0x2900('0x366')](_0x5dea54[_0x2900('0x418')](0x0,0xff));}if(_0x2f90a2[_0x2900('0x89')](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x462f2e=this['_opacity']+Number(RegExp['$1']);return this[_0x2900('0x366')](_0x462f2e['clamp'](0x0,0xff));}if(_0x2f90a2[_0x2900('0x89')](/PATTERN LOCK:[ ](\d+)/i)){if(_0x2900('0x2aa')===_0x2900('0x80')){function _0x54ef1b(){return this[_0x2900('0x1ac')]()['characterName']()[_0x2900('0x89')](/\[VS8\]/i);}}else return this[_0x2900('0x303')](Number(RegExp['$1']));}if(_0x2f90a2[_0x2900('0x89')](/PATTERN UNLOCK/i)){if(_0x2900('0x7f')!==_0x2900('0x36a'))return this[_0x2900('0x1dd')]=![];else{function _0x2eabe9(){return this[_0x2900('0x291')](_0x39a878(_0x13cc9d['$1']));}}}if(_0x2f90a2['match'](/POSE:[ ](.*)/i)){const _0x4db74c=String(RegExp['$1'])[_0x2900('0x2f3')]()['trim']();return this[_0x2900('0x2f5')](_0x4db74c);}if(_0x2f90a2['match'](/STEP TOWARD:[ ](\d+),[ ](\d+)/i)){const _0x2b7859=Number(RegExp['$1']),_0x3eb744=Number(RegExp['$2']);return this[_0x2900('0x254')](_0x2b7859,_0x3eb744);}if(_0x2f90a2[_0x2900('0x89')](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x5914bd=$gameEvents[_0x2900('0x28f')](Number(RegExp['$1']));return this['processMoveRouteStepToCharacter'](_0x5914bd);}if(_0x2f90a2[_0x2900('0x89')](/STEP TOWARD PLAYER/i))return this[_0x2900('0x6f')]($gamePlayer);if(_0x2f90a2[_0x2900('0x89')](/STEP AWAY FROM:[ ](\d+),[ ](\d+)/i)){if(_0x2900('0x243')!==_0x2900('0x26d'))return this[_0x2900('0x3af')](Number(RegExp['$1']),Number(RegExp['$2']));else{function _0x3c3606(){return this[_0x2900('0x56')](0x9,_0x196e7a(_0x469bda['$1']));}}}if(_0x2f90a2[_0x2900('0x89')](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x305142=$gameEvents[_0x2900('0x28f')](Number(RegExp['$1']));return this[_0x2900('0x2b3')](_0x305142);}if(_0x2f90a2[_0x2900('0x89')](/STEP AWAY FROM PLAYER/i))return this[_0x2900('0x2b3')]($gamePlayer);if(_0x2f90a2[_0x2900('0x89')](/TURN TO:[ ](\d+),[ ](\d+)/i)){if(_0x2900('0x148')===_0x2900('0x340')){function _0x39c4a2(){if(this[_0x2900('0x41b')](_0x11fee1,_0x405d56))return;_0x1d82c8[_0x2900('0x306')][_0x2900('0x124')]['call'](this,_0x346e94,_0x34a3b2);}}else return this[_0x2900('0x16f')](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x2f90a2[_0x2900('0x89')](/TURN TO EVENT:[ ](\d+)/i)){const _0xf8372f=$gameEvents[_0x2900('0x28f')](Number(RegExp['$1']));return this[_0x2900('0x1')](_0xf8372f);}if(_0x2f90a2[_0x2900('0x89')](/TURN TO PLAYER/i)){if(_0x2900('0x216')===_0x2900('0x2ba')){function _0x1a90df(){if(this[_0x2900('0x156')]===_0x120a6e)this[_0x2900('0x3d')]();const _0x2f57f6=_0x2d8e43===_0x9d459b?_0x2900('0x3ff'):_0x2900('0x390')[_0x2900('0xc1')](_0x36a0ea[_0x2900('0x270')],_0x4ffc51[_0x2900('0x111')]);this[_0x2900('0x156')][_0x2f57f6]={'iconIndex':_0x340085,'bufferX':_0x5921bb,'bufferY':_0x869cc3,'blendMode':_0x35bffd};}}else return this['turnTowardCharacter']($gamePlayer);}if(_0x2f90a2[_0x2900('0x89')](/TURN AWAY FROM:[ ](\d+),[ ](\d+)/i))return this[_0x2900('0x283')](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x2f90a2[_0x2900('0x89')](/TURN AWAY FROM EVENT:[ ](\d+)/i)){if('bwCaI'===_0x2900('0x40c')){function _0x24b276(){_0x5ecd18=!![];}}else{const _0x2b1c2e=$gameEvents[_0x2900('0x28f')](Number(RegExp['$1']));return this['turnAwayFromCharacter'](_0x2b1c2e);}}if(_0x2f90a2[_0x2900('0x89')](/TURN AWAY FROM PLAYER/i))return this['turnAwayFromCharacter']($gamePlayer);if(_0x2f90a2['match'](/TURN LOWER LEFT/i)){if(_0x2900('0x290')===_0x2900('0x290'))return this[_0x2900('0x13a')](0x1);else{function _0x4c29b3(){if(this[_0x2900('0x344')]===_0x18d19a)this[_0x2900('0x3d')]();if(this[_0x2900('0x344')][_0x2900('0x136')]===_0x5e2f21)this[_0x2900('0x3d')]();this['_EventsMoveCoreSettings'][_0x2900('0x136')]=_0xb83d95;}}}if(_0x2f90a2[_0x2900('0x89')](/TURN LOWER RIGHT/i))return this['setDirection'](0x3);if(_0x2f90a2[_0x2900('0x89')](/TURN UPPER LEFT/i)){if('pVJGC'!==_0x2900('0x332')){function _0x2478fd(){const _0x282882=this[_0x2900('0x87')](this[_0x2900('0x5b')]);this[_0x2900('0xe')]=_0x282882[_0x2900('0xe')]+(_0x33fa69[_0x2900('0x278')]()+this['itemPadding']())*0x2,this[_0x2900('0x131')]=_0x29c810[_0x2900('0x1df')](this[_0x2900('0x32')](),_0x282882[_0x2900('0x131')])+_0x250c8c[_0x2900('0x278')]()*0x2,this[_0x2900('0x9f')]();}}else return this[_0x2900('0x13a')](0x7);}if(_0x2f90a2[_0x2900('0x89')](/TURN UPPER RIGHT/i)){if(_0x2900('0x1b9')===_0x2900('0xbc')){function _0x55da0e(){return this[_0x2900('0x6f')](_0x29ba6f);}}else return this[_0x2900('0x13a')](0x9);}if(_0x2f90a2[_0x2900('0x89')](/SELF SWITCH[ ](.*):[ ](.*)/i)){if(_0x2900('0xd8')==='wTRbV')return this['processMoveRouteSelfSwitch'](RegExp['$1'],RegExp['$2']);else{function _0x550f83(){if(this[_0x2900('0x33b')]())return;_0x396f21[_0x2900('0x306')][_0x2900('0x13')][_0x2900('0x302')](this),this[_0x2900('0x70')]()&&_0x12b80b[_0x2900('0x8a')](this[_0x2900('0x111')]);}}}if(_0x2f90a2[_0x2900('0x89')](/SELF VARIABLE[ ](.*):[ ](.*)/i)){if(_0x2900('0x106')===_0x2900('0x106'))return this[_0x2900('0xd6')](RegExp['$1'],RegExp['$2']);else{function _0x5a4cf1(){return this[_0x2900('0x1c4')];}}}if(_0x2f90a2[_0x2900('0x89')](/TELEPORT TO:[ ](\d+),[ ](\d+)/i)){if(_0x2900('0x402')===_0x2900('0x174')){function _0x34fc42(){this[_0x2900('0x370')]=_0x53cc47;}}else return this[_0x2900('0xd4')](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x2f90a2['match'](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x25519a=$gameEvents[_0x2900('0x28f')](Number(RegExp['$1']));return this[_0x2900('0x18e')](_0x25519a);}if(_0x2f90a2['match'](/TELEPORT TO PLAYER/i)){if(_0x2900('0x28a')===_0x2900('0x2b2')){function _0x17f197(){return _0x5655d3[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x182')];}}else return this['processMoveRouteTeleportToCharacter']($gamePlayer);}try{VisuMZ['EventsMoveCore']['Game_Character_processMoveCommand'][_0x2900('0x302')](this,_0x1bb2b4);}catch(_0x575466){if($gameTemp['isPlaytest']())console[_0x2900('0xf4')](_0x575466);}},Game_Character['prototype']['processMoveRouteAnimation']=function(_0x592711){$gameTemp[_0x2900('0x3f8')]([this],_0x592711);},Game_Character[_0x2900('0x133')][_0x2900('0x291')]=function(_0x569e4d){let _0x3c2596=0x0;switch(_0x569e4d[_0x2900('0x2f3')]()[_0x2900('0x17')]()){case'!':case _0x2900('0x339'):_0x3c2596=0x1;break;case'?':case _0x2900('0xce'):_0x3c2596=0x2;break;case _0x2900('0x3d8'):case _0x2900('0x376'):case _0x2900('0xa4'):case _0x2900('0x2ae'):case _0x2900('0x1db'):_0x3c2596=0x3;break;case _0x2900('0x19b'):case _0x2900('0x2d4'):_0x3c2596=0x4;break;case _0x2900('0x293'):_0x3c2596=0x5;break;case _0x2900('0x3c2'):_0x3c2596=0x6;break;case _0x2900('0x23f'):case _0x2900('0x229'):_0x3c2596=0x7;break;case _0x2900('0x16c'):case _0x2900('0x187'):_0x3c2596=0x8;break;case _0x2900('0x161'):case _0x2900('0x1a0'):case _0x2900('0x323'):case'LIGHT-BULB':case _0x2900('0x2f7'):_0x3c2596=0x9;break;case'Z':case'ZZ':case _0x2900('0x201'):case _0x2900('0x2a'):_0x3c2596=0xa;break;case _0x2900('0x1e9'):_0x3c2596=0xb;break;case'USER-DEFINED\x202':_0x3c2596=0xc;break;case _0x2900('0x1f5'):_0x3c2596=0xd;break;case _0x2900('0x170'):_0x3c2596=0xe;break;case _0x2900('0x3d3'):_0x3c2596=0xf;break;}$gameTemp[_0x2900('0x169')](this,_0x3c2596);},Game_Character[_0x2900('0x133')]['processMoveRouteHugWall']=function(_0x3da078){const _0x4972dc=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x5b04a5=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x430d9f=this[_0x2900('0x7d')](),_0x3baf02=(_0x3da078===_0x2900('0x2f0')?_0x4972dc:_0x5b04a5)[_0x430d9f],_0x41bad9=(_0x3da078===_0x2900('0x2f0')?_0x5b04a5:_0x4972dc)[_0x430d9f];if(this[_0x2900('0x265')](this['x'],this['y'],_0x3baf02)){if(_0x2900('0x2d0')===_0x2900('0x34f')){function _0x35d6e4(){_0x113f96('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x41c8c2,_0x18ffa1,_0x5eaf0c)),_0x4b4d0a['exit']();}}else _0x3da078==='left'?this[_0x2900('0x392')]():this[_0x2900('0xc7')]();}else{if(!this[_0x2900('0x265')](this['x'],this['y'],this[_0x2900('0x7d')]())){if(this[_0x2900('0x265')](this['x'],this['y'],_0x41bad9)){if(_0x2900('0xfc')!==_0x2900('0xf7')){if(_0x3da078===_0x2900('0x2f0')){if(_0x2900('0x12e')===_0x2900('0x12e'))this[_0x2900('0xc7')]();else{function _0x59df7d(){const _0x57d5c9=_0x218c58[_0x2900('0x3a4')]()||this;if(_0x57d5c9['constructor']!==_0x219846)_0x47483e[_0x2900('0x306')][_0x2900('0x100')][_0x2900('0x302')](this,_0x10b9a8,_0x339a1b);else{const _0x1efef4=[_0x57d5c9['_mapId'],_0x57d5c9[_0x2900('0x111')],_0x2900('0x28b')[_0x2900('0xc1')](_0x4f4c88)];_0x8c5a60[_0x2900('0x3bd')](_0x1efef4,_0x412820);}}}}else{if(_0x2900('0x41c')!==_0x2900('0x3e5'))this[_0x2900('0x392')]();else{function _0x52861c(){if(_0x444eda['isEventRunning']())return;if(_0x124a7c[_0x2900('0x2ce')]())return;let _0x495b6c=_0x52a213[_0x2900('0x306')]['Settings'][_0x2900('0x118')],_0x52816e=_0x38e82f[_0x2900('0xc5')](_0x20cc4a,_0x5f0931);const _0x482002=_0x2900('0x405')[_0x2900('0xc1')](_0x52816e);_0x495b6c[_0x482002]&&_0x290286[_0x2900('0x415')](_0x495b6c[_0x482002]);}}}}else{function _0x17327b(){_0x3678f4[_0x2900('0x306')]['Game_Variables_setValue'][_0x2900('0x302')](this,_0x684b61,_0x2df613);}}}else this[_0x2900('0x11d')]();}}this['canPass'](this['x'],this['y'],this[_0x2900('0x7d')]())&&this[_0x2900('0x356')]();},Game_Character[_0x2900('0x133')][_0x2900('0x7b')]=function(_0x34a4f3){if(ImageManager[_0x2900('0x130')](this['_characterName']))return;_0x34a4f3=_0x34a4f3[_0x2900('0x418')](0x0,0x7),this[_0x2900('0x93')](this[_0x2900('0x3c5')],_0x34a4f3);},Game_Character['prototype'][_0x2900('0x198')]=function(_0x486777){switch(this[_0x2900('0x7d')]()){case 0x1:this['jump'](-_0x486777,_0x486777);break;case 0x2:this[_0x2900('0x84')](0x0,_0x486777);break;case 0x3:this[_0x2900('0x84')](_0x486777,_0x486777);break;case 0x4:this[_0x2900('0x84')](-_0x486777,0x0);break;case 0x6:this[_0x2900('0x84')](_0x486777,0x0);break;case 0x7:this['jump'](-_0x486777,-_0x486777);break;case 0x8:this['jump'](0x0,-_0x486777);break;case 0x9:this[_0x2900('0x84')](_0x486777,-_0x486777);break;}},Game_Character[_0x2900('0x133')]['processMoveRouteJumpTo']=function(_0x7cb470,_0x2ba5b7){const _0x9839e9=Math[_0x2900('0x2ea')](_0x7cb470-this['x']),_0x4724bb=Math[_0x2900('0x2ea')](_0x2ba5b7-this['y']);this[_0x2900('0x84')](_0x9839e9,_0x4724bb);},Game_Character[_0x2900('0x133')][_0x2900('0x1cf')]=function(_0x5bb007){if(_0x5bb007)this[_0x2900('0x357')](_0x5bb007['x'],_0x5bb007['y']);},Game_Character[_0x2900('0x133')][_0x2900('0x254')]=function(_0x18e488,_0x3ec08e){let _0x1a19ae=0x0;$gameMap[_0x2900('0x1e3')]()?_0x1a19ae=this[_0x2900('0x31b')](_0x18e488,_0x3ec08e):_0x1a19ae=this[_0x2900('0x2f1')](_0x18e488,_0x3ec08e),this[_0x2900('0x157')](_0x1a19ae),this[_0x2900('0x12')](!![]);},Game_Character[_0x2900('0x133')][_0x2900('0x25b')]=function(_0x3a01d0){if(_0x3a01d0)this['processMoveRouteStepTo'](_0x3a01d0['x'],_0x3a01d0['y']);},Game_Character[_0x2900('0x133')]['processMoveRouteStepFrom']=function(_0x27f521,_0x591dfd){const _0x190ed3=this[_0x2900('0x377')](_0x27f521),_0x265670=this['deltaYFrom'](_0x591dfd);},Game_Character[_0x2900('0x133')][_0x2900('0x1f4')]=function(_0x4d8d6d){const _0x5dcfa1=['',_0x2900('0x3b6'),_0x2900('0x2f2'),_0x2900('0x59'),_0x2900('0x360'),'',_0x2900('0x383'),_0x2900('0xc9'),'UP',_0x2900('0x2c7')],_0x5066fb=_0x5dcfa1[_0x2900('0x35d')](_0x4d8d6d[_0x2900('0x2f3')]()[_0x2900('0x17')]());if(directioin<=0x0)return;if(this[_0x2900('0x265')](this['x'],this['y'],_0x5066fb)){if(_0x2900('0x1a9')!==_0x2900('0x14'))this[_0x2900('0x157')](_0x5066fb),this['_moveRouteIndex']-=0x1;else{function _0x35bd97(){const _0x28ddfc=_0x1f25ef['eventsXy'](_0x3d8fe0,_0x2c4a58);for(const _0x24b185 of _0x28ddfc){if(_0x24b185&&_0x24b185[_0x2900('0x236')]())return _0x24b185[_0x2900('0x1a7')](),!![];}return![];}}}},Game_Character['prototype'][_0x2900('0x32d')]=function(_0x5c30c2,_0x46e447){this[_0x2900('0x254')](_0x5c30c2,_0x46e447);if(this['x']!==_0x5c30c2||this['y']!==_0x46e447)this['_moveRouteIndex']--;},Game_Character[_0x2900('0x133')]['processMoveRouteMoveToCharacter']=function(_0x47c6aa){if(_0x47c6aa)this[_0x2900('0x32d')](_0x47c6aa['x'],_0x47c6aa['y']);},Game_Character[_0x2900('0x133')][_0x2900('0x56')]=function(_0x2ee993,_0x4e5e9d){_0x4e5e9d=_0x4e5e9d||0x0;const _0x3e1dca={'code':0x1,'indent':null,'parameters':[]};_0x3e1dca[_0x2900('0x1ae')]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x2ee993],this[_0x2900('0x186')]['list'][this['_moveRouteIndex']][_0x2900('0x416')][0x0]='';while(_0x4e5e9d--){this[_0x2900('0x186')][_0x2900('0x3d4')]['splice'](this[_0x2900('0x1d8')]+0x1,0x0,_0x3e1dca);}},Game_Character[_0x2900('0x133')][_0x2900('0x303')]=function(_0x2c649a){this[_0x2900('0x1dd')]=!![],this[_0x2900('0xc8')](_0x2c649a);},Game_Character[_0x2900('0x133')]['processMoveRouteSelfSwitch']=function(_0x2e6981,_0x4a969a){if(this===$gamePlayer)return;const _0x581f8b=[this[_0x2900('0x270')],this[_0x2900('0x111')],'A'];_0x2e6981[_0x2900('0x89')](/\b[ABCD]\b/i)?_0x581f8b[0x2]=String(_0x2e6981)['charAt'](0x0)['toUpperCase']()[_0x2900('0x17')]():_0x581f8b[0x2]=_0x2900('0x28b')['format'](_0x2e6981);switch(_0x4a969a[_0x2900('0x2f3')]()[_0x2900('0x17')]()){case'ON':case _0x2900('0x101'):$gameSelfSwitches[_0x2900('0x3bd')](_0x581f8b,!![]);break;case _0x2900('0x190'):case _0x2900('0x395'):$gameSelfSwitches['setValue'](_0x581f8b,![]);break;case _0x2900('0x1b4'):$gameSelfSwitches[_0x2900('0x3bd')](_0x581f8b,!$gameSelfSwitches['value'](_0x581f8b));break;}},Game_Character['prototype']['processMoveRouteSelfVariable']=function(_0x3004cc,_0x633693){if(this===$gamePlayer)return;const _0x15ac51=[this[_0x2900('0x270')],this[_0x2900('0x111')],_0x2900('0x3d7')[_0x2900('0xc1')](switchId)];$gameSelfSwitches[_0x2900('0x3bd')](_0x15ac51,Number(_0x633693));},Game_Character[_0x2900('0x133')][_0x2900('0xd4')]=function(_0x2cae15,_0x238066){this[_0x2900('0x37a')](_0x2cae15,_0x238066);},Game_Character[_0x2900('0x133')][_0x2900('0x18e')]=function(_0x30402a){if(_0x30402a)this[_0x2900('0xd4')](_0x30402a['x'],_0x30402a['y']);},Game_Character[_0x2900('0x133')][_0x2900('0xc7')]=function(){switch(this[_0x2900('0x7d')]()){case 0x1:this['setDirection'](0x7);break;case 0x2:this[_0x2900('0x13a')](0x4);break;case 0x3:this[_0x2900('0x13a')](0x1);break;case 0x4:this[_0x2900('0x13a')](0x8);break;case 0x6:this[_0x2900('0x13a')](0x2);break;case 0x7:this[_0x2900('0x13a')](0x9);break;case 0x8:this[_0x2900('0x13a')](0x6);break;case 0x9:this[_0x2900('0x13a')](0x3);break;}},Game_Character['prototype'][_0x2900('0x392')]=function(){switch(this[_0x2900('0x7d')]()){case 0x1:this[_0x2900('0x13a')](0x3);break;case 0x2:this[_0x2900('0x13a')](0x6);break;case 0x3:this['setDirection'](0x9);break;case 0x4:this[_0x2900('0x13a')](0x2);break;case 0x6:this[_0x2900('0x13a')](0x8);break;case 0x7:this[_0x2900('0x13a')](0x1);break;case 0x8:this[_0x2900('0x13a')](0x4);break;case 0x9:this[_0x2900('0x13a')](0x7);break;}},Game_Character[_0x2900('0x133')][_0x2900('0x25c')]=function(_0x3a9394,_0x397e62,_0x484fd8){const _0x2cc811=this[_0x2900('0x377')](_0x3a9394),_0x1078b8=this[_0x2900('0x1fe')](_0x397e62);if($gameMap[_0x2900('0x1e3')]()){if(_0x484fd8||this[_0x2900('0x207')]()){if(_0x2cc811>0x0&&_0x1078b8<0x0)return 0x1;if(_0x2cc811<0x0&&_0x1078b8<0x0)return 0x3;if(_0x2cc811>0x0&&_0x1078b8>0x0)return 0x7;if(_0x2cc811<0x0&&_0x1078b8>0x0)return 0x9;}}if(Math[_0x2900('0x40b')](_0x2cc811)>Math['abs'](_0x1078b8)){if(_0x2900('0x342')!==_0x2900('0x342')){function _0x56e361(){return _0x41d639['EventsMoveCore'][_0x2900('0x2fe')][_0x2900('0x302')](this);}}else return _0x2cc811>0x0?0x4:0x6;}else{if(_0x1078b8!==0x0)return _0x1078b8>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x2900('0x133')][_0x2900('0x2e8')]=function(_0xdd0b06,_0x4b2658,_0xb7d544){const _0x21a4c6=this[_0x2900('0x377')](_0xdd0b06),_0x17874f=this['deltaYFrom'](_0x4b2658);if($gameMap[_0x2900('0x1e3')]()){if(_0xb7d544||this[_0x2900('0x207')]()){if(_0x21a4c6>0x0&&_0x17874f<0x0)return 0x9;if(_0x21a4c6<0x0&&_0x17874f<0x0)return 0x7;if(_0x21a4c6>0x0&&_0x17874f>0x0)return 0x3;if(_0x21a4c6<0x0&&_0x17874f>0x0)return 0x1;}}if(Math[_0x2900('0x40b')](_0x21a4c6)>Math[_0x2900('0x40b')](_0x17874f))return _0x21a4c6>0x0?0x6:0x4;else{if(_0x17874f!==0x0){if('ZyXyO'==='uEJYP'){function _0x7c1b93(){this['_poseDuration']--;if(this[_0x2900('0x2a9')]<=0x0&&this[_0x2900('0x235')]!==_0x2900('0x201'))this['clearPose']();}}else return _0x17874f>0x0?0x2:0x8;}}return 0x0;},Game_Character[_0x2900('0x133')][_0x2900('0x16f')]=function(_0x15e2c8,_0x5b1a9){const _0x13c161=this[_0x2900('0x25c')](_0x15e2c8,_0x5b1a9,!![]);if(_0x13c161)this[_0x2900('0x157')](_0x13c161);},Game_Character[_0x2900('0x133')][_0x2900('0x3af')]=function(_0x49a0f1,_0x39412e){const _0x1766b6=this[_0x2900('0x2e8')](_0x49a0f1,_0x39412e,!![]);if(_0x1766b6)this['executeMoveDir8'](_0x1766b6);},Game_Character[_0x2900('0x133')][_0x2900('0x287')]=function(_0x43f3d6,_0x55626f){const _0x20c7f1=this[_0x2900('0x25c')](_0x43f3d6,_0x55626f,![]);if(_0x20c7f1)this[_0x2900('0x13a')](_0x20c7f1);},Game_Character[_0x2900('0x133')][_0x2900('0x283')]=function(_0x596fba,_0xde3144){const _0x19bf16=this[_0x2900('0x2e8')](_0x596fba,_0xde3144,![]);if(_0x19bf16)this[_0x2900('0x13a')](_0x19bf16);},Game_Character[_0x2900('0x133')]['moveTowardCharacter']=function(_0x3128bf){if(_0x3128bf)this[_0x2900('0x16f')](_0x3128bf['x'],_0x3128bf['y']);},Game_Character[_0x2900('0x133')][_0x2900('0x2b3')]=function(_0x52765c){if(_0x52765c)this[_0x2900('0x3af')](_0x52765c['x'],_0x52765c['y']);},Game_Character[_0x2900('0x133')][_0x2900('0x1')]=function(_0x1f1ab0){if(_0x1f1ab0)this['turnTowardPoint'](_0x1f1ab0['x'],_0x1f1ab0['y']);},Game_Character[_0x2900('0x133')][_0x2900('0x2f')]=function(_0x547726){if(_0x547726)this[_0x2900('0x283')](_0x547726['x'],_0x547726['y']);},VisuMZ[_0x2900('0x306')][_0x2900('0x3b7')]=Game_Player['prototype'][_0x2900('0x34a')],Game_Player[_0x2900('0x133')]['isDashing']=function(){if(this[_0x2900('0x6')])return!![];return VisuMZ[_0x2900('0x306')]['Game_Player_isDashing'][_0x2900('0x302')](this);},Game_Player[_0x2900('0x133')][_0x2900('0x2f4')]=function(){return this['isDashing']()&&(this['isMoving']()||this['getInputDirection']()!==0x0&&this[_0x2900('0x265')](this['_x'],this['_y'],this[_0x2900('0x238')]())||$gameTemp[_0x2900('0x336')]());},VisuMZ[_0x2900('0x306')][_0x2900('0x21c')]=Game_Player['prototype'][_0x2900('0x238')],Game_Player[_0x2900('0x133')][_0x2900('0x238')]=function(){if($gameMap[_0x2900('0x1e3')]()){if(_0x2900('0x24e')!==_0x2900('0x2da'))return this[_0x2900('0x299')]();else{function _0x429563(){let _0xec4067=_0x46d6ee[_0x2900('0x306')][_0x2900('0x3e0')]['Movement'][_0x2900('0x25a')]?_0x55633d:_0x578ba9;return this[_0x2900('0x23e')](_0xec4067);}}}else return VisuMZ[_0x2900('0x306')][_0x2900('0x21c')]['call'](this);},Game_Player['prototype'][_0x2900('0x299')]=function(){return Input[_0x2900('0x31f')];},Game_Player[_0x2900('0x133')][_0x2900('0x230')]=function(){if(!this[_0x2900('0x70')]()&&this[_0x2900('0x333')]()){if('Gyjil'===_0x2900('0x2d3')){let _0x42c7dc=this[_0x2900('0x238')]();if(_0x42c7dc>0x0){if(_0x2900('0x13b')===_0x2900('0x13b'))$gameTemp['clearDestination']();else{function _0x5ca578(){_0x12b248[_0x3b7fa8]['f']<_0x52a56b[_0x2c26eb]['f']&&(_0x187f44=_0x17eb17);}}}else{if($gameTemp['isDestinationValid']()){if('EBLDb'===_0x2900('0x2d6')){const _0x48dad1=$gameTemp[_0x2900('0x2e9')](),_0x398122=$gameTemp[_0x2900('0x2b0')]();if($gameMap[_0x2900('0x1e3')]()){if(_0x2900('0x242')===_0x2900('0x3b0')){function _0x340c13(){return _0x3ecffa[_0x2900('0xa')]()&&_0x3b0e44[_0x2900('0xf4')](_0x2900('0x127')[_0x2900('0xc1')](_0x49439c)),![];}}else _0x42c7dc=this[_0x2900('0x31b')](_0x48dad1,_0x398122);}else _0x42c7dc=this['findDirectionTo'](_0x48dad1,_0x398122);}else{function _0x3f5d98(){this['_eventIcon'][_0x2900('0x179')]=_0x6310b5(_0x5f2eec['$1']);}}}}_0x42c7dc>0x0?(this[_0x2900('0x37')]=this[_0x2900('0x37')]||0x0,this[_0x2900('0x3e3')]()?this[_0x2900('0x13a')](_0x42c7dc):this[_0x2900('0x2bf')](_0x42c7dc),this[_0x2900('0x37')]++):this['_inputTime']=0x0;}else{function _0x48dbf5(){this[_0x2900('0xc7')]();}}}},Game_Player[_0x2900('0x133')][_0x2900('0x3e3')]=function(){const _0x214e7c=VisuMZ[_0x2900('0x306')]['Settings'][_0x2900('0x16b')];if(!_0x214e7c[_0x2900('0x30b')])return![];if($gameTemp[_0x2900('0x336')]())return![];if(this[_0x2900('0x34a')]()||this[_0x2900('0x70')]()||this['isOnLadder']())return![];return this[_0x2900('0x37')]<_0x214e7c['TurnInPlaceDelay'];},VisuMZ[_0x2900('0x306')][_0x2900('0x274')]=Game_Player[_0x2900('0x133')][_0x2900('0x2bf')],Game_Player[_0x2900('0x133')][_0x2900('0x2bf')]=function(_0x567f75){$gameMap[_0x2900('0x1e3')]()?this['executeMoveDir8'](_0x567f75):VisuMZ[_0x2900('0x306')]['Game_Player_executeMove'][_0x2900('0x302')](this,_0x567f75);},VisuMZ[_0x2900('0x306')][_0x2900('0x137')]=Game_Player[_0x2900('0x133')][_0x2900('0x2fc')],Game_Player['prototype']['isMapPassable']=function(_0x31cc23,_0x21c2a8,_0x6b9db4){if($gameMap[_0x2900('0x12b')](_0x31cc23,_0x21c2a8,_0x6b9db4,_0x2900('0x146')))return!![];if($gameMap[_0x2900('0x1d5')](_0x31cc23,_0x21c2a8,_0x6b9db4,_0x2900('0x146')))return![];return VisuMZ[_0x2900('0x306')][_0x2900('0x137')][_0x2900('0x302')](this,_0x31cc23,_0x21c2a8,_0x6b9db4);},VisuMZ['EventsMoveCore']['Game_Player_checkEventTriggerHere']=Game_Player[_0x2900('0x133')][_0x2900('0x2c1')],Game_Player[_0x2900('0x133')][_0x2900('0x2c1')]=function(_0x20ddce){VisuMZ[_0x2900('0x306')][_0x2900('0x2ab')][_0x2900('0x302')](this,_0x20ddce);if(this[_0x2900('0x1fd')]()){this[_0x2900('0x1b')](_0x20ddce);if(_0x20ddce[_0x2900('0x3fe')](0x0)&&this[_0x2900('0x31d')]()===_0x2900('0x16e'))this['startMapCommonEventOnOK'](this['x'],this['y']);else{if(_0x20ddce['includes'](0x1)||_0x20ddce['includes'](0x2)){if('nhGKq'!==_0x2900('0x1c1'))this[_0x2900('0x5a')]();else{function _0x37391c(){if(_0x47359a&&_0x16291e[_0x2900('0x236')]())return _0x143c74[_0x2900('0x1a7')](),!![];}}}}}},VisuMZ[_0x2900('0x306')][_0x2900('0x36c')]=Game_Player[_0x2900('0x133')][_0x2900('0xa0')],Game_Player[_0x2900('0x133')][_0x2900('0xa0')]=function(_0x323d1a){VisuMZ[_0x2900('0x306')][_0x2900('0x36c')][_0x2900('0x302')](this,_0x323d1a);if(this[_0x2900('0x1fd')]()&&_0x323d1a['includes'](0x0)&&this[_0x2900('0x31d')]()===_0x2900('0x35')){const _0x2a2274=this['direction'](),_0x23ec5a=$gameMap['roundXWithDirection'](this['x'],_0x2a2274),_0x4fa69f=$gameMap[_0x2900('0x3ee')](this['y'],_0x2a2274);this[_0x2900('0xfd')](_0x23ec5a,_0x4fa69f);}},Game_Player['prototype'][_0x2900('0x1b')]=function(_0x372c51){if($gameMap[_0x2900('0x9a')]())return;if($gameMap[_0x2900('0x2ce')]())return;const _0x1ce7b4=$gameMap[_0x2900('0x30d')]();for(const _0x42fa43 of _0x1ce7b4){if(!_0x42fa43)continue;if(!_0x42fa43[_0x2900('0x54')](_0x372c51))continue;if(this['meetActivationRegionConditions'](_0x42fa43))return _0x42fa43[_0x2900('0x3c6')]();if(this[_0x2900('0x417')](_0x42fa43))return _0x42fa43[_0x2900('0x3c6')]();}},Game_Player[_0x2900('0x133')][_0x2900('0x4')]=function(_0x1a8b15){if($gameMap[_0x2900('0x9a')]())return![];if($gameMap[_0x2900('0x2ce')]())return![];return _0x1a8b15[_0x2900('0x337')]()[_0x2900('0x3fe')](this[_0x2900('0xc5')]());},Game_Player[_0x2900('0x133')][_0x2900('0x417')]=function(_0x3c2774){if($gameMap[_0x2900('0x9a')]())return![];if($gameMap[_0x2900('0x2ce')]())return![];if(['none',_0x2900('0x29e')][_0x2900('0x3fe')](_0x3c2774[_0x2900('0x3bc')]()))return![];const _0x32a1e0=_0x3c2774[_0x2900('0x3bc')](),_0x5d8bc4=_0x3c2774[_0x2900('0x38f')]();switch(_0x32a1e0){case _0x2900('0x2ac'):const _0x3d6ef1=$gameMap[_0x2900('0x2fa')](this['x'],this['y'],_0x3c2774['x'],_0x3c2774['y']);return _0x3c2774[_0x2900('0x38f')]()>=_0x3d6ef1;break;case'square':return _0x5d8bc4>=Math[_0x2900('0x40b')](_0x3c2774[_0x2900('0x377')](this['x']))&&_0x5d8bc4>=Math[_0x2900('0x40b')](_0x3c2774[_0x2900('0x1fe')](this['y']));break;case'row':return _0x5d8bc4>=Math[_0x2900('0x40b')](_0x3c2774[_0x2900('0x1fe')](this['y']));break;case _0x2900('0x410'):return _0x5d8bc4>=Math[_0x2900('0x40b')](_0x3c2774[_0x2900('0x377')](this['x']));break;case'default':return![];break;}},Game_Player[_0x2900('0x133')][_0x2900('0xfd')]=function(_0x2c9554,_0x54ac0c){if($gameMap[_0x2900('0x9a')]())return;if($gameMap['isAnyEventStarting']())return;let _0x42dd72=VisuMZ['EventsMoveCore'][_0x2900('0x3e0')]['RegionOk'],_0x481671=$gameMap[_0x2900('0xc5')](_0x2c9554,_0x54ac0c);const _0x5b106b=_0x2900('0x405')[_0x2900('0xc1')](_0x481671);if(_0x42dd72[_0x5b106b]){if(_0x2900('0x261')===_0x2900('0x261'))$gameTemp[_0x2900('0x415')](_0x42dd72[_0x5b106b]);else{function _0x30817d(){if(!_0x2b997b&&_0x230b62[_0x2900('0x9a')]())return![];if(!_0xfd6be9&&_0x2d4541[_0x2900('0x2ce')]())return![];if([_0x2900('0x397'),_0x2900('0x29e')][_0x2900('0x3fe')](this[_0x2900('0x3bc')]()))return!![];return _0x7b4410['meetActivationProximityConditions'](this);}}}},Game_Player[_0x2900('0x133')][_0x2900('0x31d')]=function(){return VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x182')];},Game_Player['prototype'][_0x2900('0x5a')]=function(){if($gameMap[_0x2900('0x9a')]())return;if($gameMap[_0x2900('0x2ce')]())return;let _0x3729d7=VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')]['RegionTouch'];const _0x142d3d=_0x2900('0x405')['format'](this[_0x2900('0xc5')]());if(_0x3729d7[_0x142d3d]){if(_0x2900('0xc2')!==_0x2900('0x97'))$gameTemp[_0x2900('0x415')](_0x3729d7[_0x142d3d]);else{function _0x484b88(){_0x3023a9[_0x584934]=_0x3a980e[_0x3bd5d8][_0x2900('0x1ea')](0x0);}}}},VisuMZ[_0x2900('0x306')][_0x2900('0x375')]=Game_Player[_0x2900('0x133')][_0x2900('0x8b')],Game_Player[_0x2900('0x133')][_0x2900('0x8b')]=function(){VisuMZ[_0x2900('0x306')][_0x2900('0x375')][_0x2900('0x302')](this),VisuMZ[_0x2900('0x8a')](0x0);},Game_Follower[_0x2900('0x133')][_0x2900('0x34a')]=function(){return $gamePlayer[_0x2900('0x34a')]();},Game_Follower[_0x2900('0x133')][_0x2900('0x2f4')]=function(){return $gamePlayer[_0x2900('0x2f4')]();},Game_Follower[_0x2900('0x133')]['realMoveSpeed']=function(){return $gamePlayer[_0x2900('0x2eb')]();},VisuMZ[_0x2900('0x306')][_0x2900('0x23d')]=Game_Vehicle[_0x2900('0x133')][_0x2900('0x2fc')],Game_Vehicle['prototype'][_0x2900('0x2fc')]=function(_0x2ea97f,_0x2a5dfc,_0x33cdc8){if($gameMap[_0x2900('0x12b')](_0x2ea97f,_0x2a5dfc,_0x33cdc8,this[_0x2900('0x9d')]))return!![];if($gameMap[_0x2900('0x1d5')](_0x2ea97f,_0x2a5dfc,_0x33cdc8,this[_0x2900('0x9d')]))return![];return VisuMZ['EventsMoveCore'][_0x2900('0x23d')][_0x2900('0x302')](this,_0x2ea97f,_0x2a5dfc,_0x33cdc8);},Game_Vehicle[_0x2900('0x133')][_0x2900('0x74')]=function(_0x6ef0b4,_0x2c026b,_0x5cdcfd){if($gameMap[_0x2900('0x12b')](_0x6ef0b4,_0x2c026b,_0x5cdcfd,this[_0x2900('0x9d')]))return!![];if($gameMap[_0x2900('0x1d5')](_0x6ef0b4,_0x2c026b,_0x5cdcfd,this[_0x2900('0x9d')]))return![];return VisuMZ[_0x2900('0x306')][_0x2900('0xe6')][_0x2900('0x302')]($gamePlayer,_0x6ef0b4,_0x2c026b,_0x5cdcfd);},VisuMZ['EventsMoveCore']['Game_Vehicle_isLandOk']=Game_Vehicle[_0x2900('0x133')][_0x2900('0x8c')],Game_Vehicle[_0x2900('0x133')][_0x2900('0x8c')]=function(_0xf7528a,_0x23b8d0,_0x185460){if($gameMap[_0x2900('0x2e')](_0xf7528a,_0x23b8d0,_0x185460,this[_0x2900('0x9d')]))return!![];const _0x79cdf3=this[_0x2900('0x9d')][_0x2900('0x384')](0x0)[_0x2900('0x2f3')]()+this[_0x2900('0x9d')][_0x2900('0x1ea')](0x1),_0x2a490e=_0x2900('0x2d2')['format'](_0x79cdf3);return VisuMZ['EventsMoveCore']['Settings'][_0x2900('0x49')][_0x2a490e]?![]:VisuMZ[_0x2900('0x306')][_0x2900('0xa3')][_0x2900('0x302')](this,_0xf7528a,_0x23b8d0,_0x185460);},VisuMZ[_0x2900('0x306')]['Game_Vehicle_initMoveSpeed']=Game_Vehicle[_0x2900('0x133')]['initMoveSpeed'],Game_Vehicle[_0x2900('0x133')]['initMoveSpeed']=function(){VisuMZ[_0x2900('0x306')]['Game_Vehicle_initMoveSpeed'][_0x2900('0x302')](this);const _0x36b772=VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')]['Movement'];if(this['isBoat']()){if(_0x36b772[_0x2900('0x269')])this['setMoveSpeed'](_0x36b772['BoatSpeed']);}else{if(this[_0x2900('0x34b')]()){if('TVXzR'==='TVXzR'){if(_0x36b772['ShipSpeed'])this[_0x2900('0x119')](_0x36b772[_0x2900('0x125')]);}else{function _0x576675(){while(this[_0x2900('0x1d1')]()){this[_0x2900('0x30f')]();}}}}else{if(this[_0x2900('0x1d')]()){if(_0x36b772[_0x2900('0x2dd')])this[_0x2900('0x119')](_0x36b772['AirshipSpeed']);}}}},VisuMZ[_0x2900('0x306')][_0x2900('0x3ea')]=Game_Event[_0x2900('0x133')]['initialize'],Game_Event[_0x2900('0x133')][_0x2900('0x41a')]=function(_0x4ada5c,_0x2adbfa){VisuMZ['EventsMoveCore'][_0x2900('0x3ea')][_0x2900('0x302')](this,_0x4ada5c,_0x2adbfa),this[_0x2900('0x386')](),this[_0x2900('0x232')](),this[_0x2900('0x27a')]();},VisuMZ[_0x2900('0x306')][_0x2900('0x184')]=Game_Event[_0x2900('0x133')]['event'],Game_Event[_0x2900('0x133')][_0x2900('0x28f')]=function(){if(this[_0x2900('0x188')]!==undefined){if(_0x2900('0xd1')!==_0x2900('0x5f')){const _0x101d3b=this[_0x2900('0x188')][_0x2900('0x22d')],_0x17acb6=this['_eventMorphData'][_0x2900('0x2d7')];return VisuMZ[_0x2900('0x37e')][_0x101d3b]['events'][_0x17acb6];}else{function _0x59ee03(){return this[_0x2900('0x2')]()?0x4:0x2;}}}if(this[_0x2900('0x215')]!==undefined){if(_0x2900('0x3a')===_0x2900('0x3a')){const _0x596912=this['_eventCopyData'][_0x2900('0x22d')],_0x37d957=this[_0x2900('0x215')][_0x2900('0x2d7')];return VisuMZ[_0x2900('0x37e')][_0x596912]['events'][_0x37d957];}else{function _0x1c49f4(){if(_0x27ec53)this['moveTowardPoint'](_0x141fa0['x'],_0x100f84['y']);}}}if(this[_0x2900('0x214')]!==undefined){if(_0x2900('0x3aa')===_0x2900('0xb8')){function _0x5ebf2c(){const _0x52735b=this[_0x2900('0x15b')]+_0xd21894(_0x4df3fd['$1']);return this['setOpacity'](_0x52735b[_0x2900('0x418')](0x0,0xff));}}else{const _0x29cd61=this['_eventSpawnData'][_0x2900('0x22d')],_0x35ea74=this[_0x2900('0x214')][_0x2900('0x2d7')];return VisuMZ[_0x2900('0x37e')][_0x29cd61]['events'][_0x35ea74];}}if($gameTemp[_0x2900('0x31a')]!==undefined){if(_0x2900('0x1d4')===_0x2900('0x1d4')){const _0x29e20c=$gameTemp[_0x2900('0x31a')]['mapId'],_0x28cbd2=$gameTemp[_0x2900('0x31a')]['eventId'];return VisuMZ[_0x2900('0x37e')][_0x29e20c][_0x2900('0x30d')][_0x28cbd2];}else{function _0x126ada(){const _0x4c7e4f=_0x45059d[_0x2900('0x98')](this);if(!_0x4c7e4f)return;const _0x522936=_0x4c7e4f['template'][_0x2900('0x2f3')]()[_0x2900('0x17')]();_0x522936!==_0x2900('0xfe')?this['morphIntoTemplate'](_0x522936,!![]):this[_0x2900('0x14e')](_0x4c7e4f[_0x2900('0x22d')],_0x4c7e4f['eventId'],!![]);}}}return VisuMZ['EventsMoveCore'][_0x2900('0x184')][_0x2900('0x302')](this);},Game_Event[_0x2900('0x133')][_0x2900('0x1d6')]=function(_0x5a4ca4,_0xdf4f0f){if(_0x5a4ca4===0x0||_0xdf4f0f===0x0)return![];if(!VisuMZ['PreloadedMaps'][_0x5a4ca4])return $gameTemp['isPlaytest']()&&console[_0x2900('0xf4')](_0x2900('0x127')[_0x2900('0xc1')](_0x5a4ca4)),![];return!![];},VisuMZ[_0x2900('0x306')][_0x2900('0x2b4')]=Game_Event['prototype'][_0x2900('0x3c6')],Game_Event[_0x2900('0x133')]['start']=function(){VisuMZ[_0x2900('0x306')][_0x2900('0x2b4')]['call'](this),Imported[_0x2900('0x68')]&&Input[_0x2900('0x1d9')](VisuMZ['MessageCore'][_0x2900('0x3e0')][_0x2900('0x12d')][_0x2900('0x120')])&&Input[_0x2900('0xcb')]();},Game_Event[_0x2900('0x133')][_0x2900('0x386')]=function(){const _0x45e179=this[_0x2900('0x28f')]()[_0x2900('0x116')];if(_0x45e179==='')return;if(DataManager[_0x2900('0x233')]()||DataManager[_0x2900('0x1cd')]())return;const _0x21ff7b=VisuMZ[_0x2900('0x306')]['Settings']['Template'];let _0x4c7664=null,_0x2f021b=0x0,_0x548dab=0x0;if(_0x45e179[_0x2900('0x89')](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){if(_0x2900('0x312')===_0x2900('0x37d')){function _0x166cfe(){_0x37db19[_0x2900('0x306')][_0x2900('0x367')][_0x2900('0x302')](this),this['updatePose']();}}else _0x2f021b=Number(RegExp['$1']),_0x548dab=Number(RegExp['$2']);}else{if(_0x45e179[_0x2900('0x89')](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){if(_0x2900('0xcd')!==_0x2900('0x394'))_0x2f021b=Number(RegExp['$1']),_0x548dab=Number(RegExp['$2']);else{function _0xff734d(){if(_0x14a20d[_0x2900('0x2e')](_0x14b20e,_0x42e3e7,_0x315b1b,this['_type']))return!![];const _0x34acac=this[_0x2900('0x9d')][_0x2900('0x384')](0x0)[_0x2900('0x2f3')]()+this[_0x2900('0x9d')][_0x2900('0x1ea')](0x1),_0x5e0241=_0x2900('0x2d2')[_0x2900('0xc1')](_0x34acac);return _0x3b02ce[_0x2900('0x306')][_0x2900('0x3e0')]['Region'][_0x5e0241]?![]:_0x5c5b97[_0x2900('0x306')]['Game_Vehicle_isLandOk']['call'](this,_0x34e93a,_0x25dc73,_0x3857d6);}}}else{if(_0x45e179[_0x2900('0x89')](/<COPY EVENT:[ ](.*?)>/i)){if(_0x2900('0x77')!==_0x2900('0x193')){const _0x4ead8f=String(RegExp['$1'])[_0x2900('0x2f3')]()[_0x2900('0x17')]();_0x4c7664=VisuMZ[_0x2900('0x3a3')][_0x4ead8f];if(!_0x4c7664)return;_0x2f021b=_0x4c7664[_0x2900('0x2ee')],_0x548dab=_0x4c7664[_0x2900('0xf')];}else{function _0x1278eb(){this['startMapCommonEventOnOK'](this['x'],this['y']);}}}}}if(!this[_0x2900('0x1d6')](_0x2f021b,_0x548dab))return;_0x21ff7b[_0x2900('0x1c7')][_0x2900('0x302')](this,_0x2f021b,_0x548dab,this);if(_0x4c7664)_0x4c7664[_0x2900('0x1c7')]['call'](this,_0x2f021b,_0x548dab,this);this[_0x2900('0x215')]={'mapId':_0x2f021b,'eventId':_0x548dab},this['_pageIndex']=-0x2,this[_0x2900('0x172')](),_0x21ff7b['PostCopyJS'][_0x2900('0x302')](this,_0x2f021b,_0x548dab,this);if(_0x4c7664)_0x4c7664['PostCopyJS'][_0x2900('0x302')](this,_0x2f021b,_0x548dab,this);$gameMap[_0x2900('0x21')]();},Game_Event['prototype'][_0x2900('0x232')]=function(){const _0x4027ae=$gameSystem[_0x2900('0x98')](this);if(!_0x4027ae)return;const _0x5714c7=_0x4027ae[_0x2900('0x277')][_0x2900('0x2f3')]()[_0x2900('0x17')]();if(_0x5714c7!==_0x2900('0xfe'))this[_0x2900('0x29a')](_0x5714c7,!![]);else{if('EmDvx'!==_0x2900('0x18d'))this[_0x2900('0x14e')](_0x4027ae['mapId'],_0x4027ae[_0x2900('0x2d7')],!![]);else{function _0x52b97a(){this[_0x2900('0x46')]=!![];return;}}}},Game_Event[_0x2900('0x133')][_0x2900('0x14e')]=function(_0x31ee48,_0x1fa83e,_0x346aac){if(!this[_0x2900('0x1d6')](_0x31ee48,_0x1fa83e))return;const _0x2c1561=VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x1f2')];if(!_0x346aac)_0x2c1561[_0x2900('0x400')]['call'](this,_0x31ee48,_0x1fa83e,this);this[_0x2900('0x188')]={'mapId':_0x31ee48,'eventId':_0x1fa83e},this[_0x2900('0x279')]=-0x2,this[_0x2900('0x172')]();if(!_0x346aac)_0x2c1561['PostMorphJS'][_0x2900('0x302')](this,_0x31ee48,_0x1fa83e,this);this['clearEventCache']();},Game_Event[_0x2900('0x133')][_0x2900('0x29a')]=function(_0x3fb9f7,_0x3b8fd9){_0x3fb9f7=_0x3fb9f7['toUpperCase']()[_0x2900('0x17')]();const _0xf28761=VisuMZ['EventTemplates'][_0x3fb9f7];if(!_0xf28761)return;const _0x2d5fc4=_0xf28761[_0x2900('0x2ee')],_0x1f2c5f=_0xf28761['EventID'];if(!this[_0x2900('0x1d6')](_0x2d5fc4,_0x1f2c5f))return;if(!_0x3b8fd9)_0xf28761[_0x2900('0x400')][_0x2900('0x302')](this,_0x2d5fc4,_0x1f2c5f,this);this[_0x2900('0x14e')](_0x2d5fc4,_0x1f2c5f,_0x3b8fd9);if(!_0x3b8fd9)_0xf28761[_0x2900('0x200')][_0x2900('0x302')](this,_0x2d5fc4,_0x1f2c5f,this);this[_0x2900('0x21')]();},Game_Event['prototype']['removeMorph']=function(){this[_0x2900('0x188')]=undefined,this[_0x2900('0x279')]=-0x2,this[_0x2900('0x172')]();},Game_Event[_0x2900('0x133')]['setupSpawn']=function(_0x5c4beb){const _0x3dbefa=VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')]['Template'],_0x2c9e73=_0x5c4beb[_0x2900('0x277')][_0x2900('0x2f3')]()[_0x2900('0x17')](),_0x412b72=!['',_0x2900('0xfe')][_0x2900('0x3fe')](_0x2c9e73);let _0x18dfee=0x0,_0x2bb968=0x0;if(_0x412b72){if('OCRnG'===_0x2900('0x3ae')){const _0x25699a=VisuMZ[_0x2900('0x3a3')][_0x2c9e73];if(!_0x25699a)return;_0x18dfee=_0x25699a[_0x2900('0x2ee')],_0x2bb968=_0x25699a['EventID'];}else{function _0x1f7213(){if(this[_0x2900('0x160')]===_0x1235e6)this['initEventsMoveCore']();const _0x3063ee=_0x2900('0x390')[_0x2900('0xc1')](_0x5bf08c,_0xf5bd12);delete this[_0x2900('0x160')][_0x3063ee];}}}else _0x18dfee=_0x5c4beb[_0x2900('0x22d')],_0x2bb968=_0x5c4beb[_0x2900('0x2d7')];if(!this['checkValidEventerMap'](_0x18dfee,_0x2bb968))return;if(_0x412b72){if(_0x2900('0x1c0')!=='fFfLn'){function _0x3fe718(){const _0x1b14db=_0x545324[_0x2900('0x28f')](_0x32588f(_0x102a2f['$1']));return this[_0x2900('0x2f')](_0x1b14db);}}else{const _0x8931a4=VisuMZ[_0x2900('0x3a3')][_0x2c9e73];_0x8931a4[_0x2900('0x31e')][_0x2900('0x302')](this,_0x18dfee,_0x2bb968,this);}}_0x3dbefa[_0x2900('0x31e')][_0x2900('0x302')](this,_0x18dfee,_0x2bb968,this),this['_eventSpawnData']=_0x5c4beb,this[_0x2900('0x279')]=-0x2,this['_mapId']=$gameMap[_0x2900('0x22d')](),this['_eventId']=_0x5c4beb['spawnEventId'],this['_spawnPreserved']=_0x5c4beb[_0x2900('0x206')],this[_0x2900('0x37a')](_0x5c4beb['x'],_0x5c4beb['y']),this[_0x2900('0x13a')](_0x5c4beb[_0x2900('0x7d')]),this['refresh']();if(_0x412b72){const _0x5cb7d6=VisuMZ[_0x2900('0x3a3')][_0x2c9e73];if(!_0x5cb7d6)return;_0x5cb7d6['PostSpawnJS'][_0x2900('0x302')](this,_0x18dfee,_0x2bb968,this);}_0x3dbefa[_0x2900('0x3fa')]['call'](this,_0x18dfee,_0x2bb968,this);const _0xf9eb6=SceneManager[_0x2900('0x21b')];if(_0xf9eb6&&_0xf9eb6[_0x2900('0x1e0')])_0xf9eb6['_spriteset'][_0x2900('0xba')](this);},Game_Event[_0x2900('0x133')][_0x2900('0x2fb')]=function(){return!!this[_0x2900('0x214')];},VisuMZ['EventsMoveCore'][_0x2900('0x153')]=Game_Event[_0x2900('0x133')][_0x2900('0x172')],Game_Event[_0x2900('0x133')]['refresh']=function(){VisuMZ[_0x2900('0x306')][_0x2900('0x153')][_0x2900('0x302')](this),this[_0x2900('0x381')]();},VisuMZ[_0x2900('0x306')][_0x2900('0x16d')]=Game_Event['prototype'][_0x2900('0x9')],Game_Event['prototype'][_0x2900('0x9')]=function(){VisuMZ[_0x2900('0x306')][_0x2900('0x16d')][_0x2900('0x302')](this),this[_0x2900('0xfb')]();},VisuMZ[_0x2900('0x306')]['Game_Event_setupPageSettings']=Game_Event[_0x2900('0x133')][_0x2900('0x41')],Game_Event[_0x2900('0x133')][_0x2900('0x41')]=function(){this['_activationProximityAutoTriggerBypass']=!![],VisuMZ[_0x2900('0x306')][_0x2900('0x2af')]['call'](this),this['setupEventsMoveCoreEffects'](),this[_0x2900('0x227')]=![];},Game_Event[_0x2900('0x133')][_0x2900('0x381')]=function(){if(!this[_0x2900('0x28f')]())return;this[_0x2900('0xfb')](),this['setupEventsMoveCoreNotetags'](),this[_0x2900('0x1f1')](),this[_0x2900('0x361')]();},Game_Event[_0x2900('0x133')][_0x2900('0x8f')]=function(){const _0x5a8306=this[_0x2900('0x28f')]()[_0x2900('0x116')];if(_0x5a8306==='')return;this['checkEventsMoveCoreStringTags'](_0x5a8306);},Game_Event[_0x2900('0x133')][_0x2900('0x1f1')]=function(){if(!this[_0x2900('0x1d3')]())return;const _0x28c29c=this[_0x2900('0x3d4')]();let _0xd7ae6e='';for(const _0xb5fbd0 of _0x28c29c){if([0x6c,0x198][_0x2900('0x3fe')](_0xb5fbd0[_0x2900('0x1ae')])){if(_0xd7ae6e!=='')_0xd7ae6e+='\x0a';_0xd7ae6e+=_0xb5fbd0[_0x2900('0x416')][0x0];}}this[_0x2900('0x1b3')](_0xd7ae6e);},Game_Event[_0x2900('0x133')][_0x2900('0xfb')]=function(){const _0x538123=VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')];this[_0x2900('0x217')]={'type':_0x2900('0x397'),'distance':0x0,'regionList':[]},this[_0x2900('0x14f')]=![],this[_0x2900('0x325')]=![],this[_0x2900('0x2b7')]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this['_eventIcon']={'iconIndex':0x0,'bufferX':_0x538123['Icon'][_0x2900('0x255')],'bufferY':_0x538123[_0x2900('0x3bb')][_0x2900('0x3a7')],'blendMode':_0x538123[_0x2900('0x3bb')][_0x2900('0x195')]},this[_0x2900('0x164')]={'text':'','visibleRange':_0x538123[_0x2900('0x1bf')]['VisibleRange'],'offsetX':_0x538123[_0x2900('0x1bf')][_0x2900('0x396')],'offsetY':_0x538123[_0x2900('0x1bf')][_0x2900('0x20b')]},this['_moveOnlyRegions']=[],this['_moveSynch']={'target':-0x1,'type':'random','delay':0x1},this[_0x2900('0x6e')]=![],this[_0x2900('0xad')]={'visible':!![],'filename':_0x538123[_0x2900('0x16b')][_0x2900('0x3dd')]},this['clearSpriteOffsets'](),this[_0x2900('0x2de')]();},Game_Event[_0x2900('0x133')][_0x2900('0x1b3')]=function(_0x4183f3){if(_0x4183f3[_0x2900('0x89')](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i))this[_0x2900('0x217')][_0x2900('0x19')]=JSON[_0x2900('0x139')]('['+RegExp['$1'][_0x2900('0x89')](/\d+/g)+']'),this['_activationProximity'][_0x2900('0x173')]=_0x2900('0x29e');else{if(_0x4183f3[_0x2900('0x89')](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)){if(_0x2900('0x11e')===_0x2900('0x204')){function _0x314a43(){_0x5a6472[_0x2900('0x306')][_0x2900('0x3ea')][_0x2900('0x302')](this,_0x4df515,_0x360b48),this[_0x2900('0x386')](),this['setupMorphEvent'](),this[_0x2900('0x27a')]();}}else type=String(RegExp['$1'])['toLowerCase']()[_0x2900('0x17')](),this[_0x2900('0x217')][_0x2900('0x173')]=type,this[_0x2900('0x217')][_0x2900('0x2fa')]=Number(RegExp['$2']);}}_0x4183f3[_0x2900('0x89')](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x2900('0x14f')]=!![]);_0x4183f3[_0x2900('0x89')](/<CLICK TRIGGER>/i)&&(this['_clickTrigger']=!![]);const _0x2b46e5=_0x4183f3[_0x2900('0x89')](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x2b46e5){if(_0x2900('0xe5')!==_0x2900('0x27c'))for(const _0x56888b of _0x2b46e5){if(_0x2900('0x159')===_0x2900('0x2e2')){function _0x1061bb(){_0x3ecaad[_0x2900('0xf4')]('ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20<Copy\x20Event>\x20usage.'['format'](_0x3036ee));}}else{if(_0x56888b[_0x2900('0x89')](/<HITBOX[ ](.*?):[ ](\d+)>/i)){if(_0x2900('0x162')===_0x2900('0x414')){function _0x326ea8(){return _0x3b84d4[_0x2900('0x306')][_0x2900('0x3e0')]['Movement']['DefaultShadow'];}}else{const _0x102dbc=String(RegExp['$1'])[_0x2900('0x112')]()[_0x2900('0x17')](),_0x288ac8=Number(RegExp['$2']);this[_0x2900('0x2b7')][_0x102dbc]=_0x288ac8;}}}}else{function _0x4fdd34(){return _0xf755e0['EventAllow']['includes'](_0x712e78)||_0x2fce3a[_0x2900('0x3ed')][_0x2900('0x3fe')](_0x2d85b5);}}}_0x4183f3['match'](/<ICON:[ ](\d+)>/i)&&(this[_0x2900('0x28c')][_0x2900('0xd3')]=Number(RegExp['$1']));if(_0x4183f3[_0x2900('0x89')](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if(_0x2900('0xf8')==='GFIAY'){function _0x6d2e9e(){return _0x2130fe[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x1bf')][_0x2900('0x15f')];}}else this[_0x2900('0x28c')][_0x2900('0x191')]=Number(RegExp['$1']);}if(_0x4183f3[_0x2900('0x89')](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if(_0x2900('0x13d')===_0x2900('0x13d'))this[_0x2900('0x28c')][_0x2900('0x179')]=Number(RegExp['$1']);else{function _0x4a9a27(){return _0x4e6154[_0x2900('0x27')]()?_0x3aa14e[_0x2900('0x133')][_0x2900('0x27')][_0x2900('0x302')](this):this[_0x2900('0x28c')];}}}_0x4183f3[_0x2900('0x89')](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x2900('0x191')]=Number(RegExp['$1']),this['_eventIcon'][_0x2900('0x179')]=Number(RegExp['$2']));if(_0x4183f3[_0x2900('0x89')](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x3289f1=String(RegExp['$1'])[_0x2900('0x2f3')]()[_0x2900('0x17')](),_0x586a01=['NORMAL','ADDITIVE',_0x2900('0x30e'),_0x2900('0x40a')];this['_eventIcon'][_0x2900('0x29')]=_0x586a01[_0x2900('0x35d')](_0x3289f1)['clamp'](0x0,0x3);}_0x4183f3[_0x2900('0x89')](/<LABEL:[ ](.*?)>/i)&&(this[_0x2900('0x164')][_0x2900('0x2a7')]=String(RegExp['$1'])[_0x2900('0x17')]());_0x4183f3[_0x2900('0x89')](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x2900('0x164')][_0x2900('0x2a7')]=String(RegExp['$1'])[_0x2900('0x17')]());if(_0x4183f3[_0x2900('0x89')](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if(_0x2900('0xe0')==='XdlEG')this[_0x2900('0x164')][_0x2900('0x152')]=Number(RegExp['$1']);else{function _0x30ae74(){this[_0x2900('0x164')][_0x2900('0x2a7')]=_0x429473(_0x3d6860['$1'])[_0x2900('0x17')]();}}}_0x4183f3[_0x2900('0x89')](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x2900('0x164')]['offsetY']=Number(RegExp['$1']));_0x4183f3['match'](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x2900('0x164')][_0x2900('0x152')]=Number(RegExp['$1']),this[_0x2900('0x164')][_0x2900('0x1f3')]=Number(RegExp['$2']));$gameTemp[_0x2900('0x345')](this);for(;;){if(this[_0x2900('0x164')][_0x2900('0x2a7')][_0x2900('0x89')](/\\V\[(\d+)\]/gi))this[_0x2900('0x164')][_0x2900('0x2a7')]=this[_0x2900('0x164')]['text'][_0x2900('0x282')](/\\V\[(\d+)\]/gi,(_0x2085d4,_0x3b65de)=>$gameVariables[_0x2900('0x250')](parseInt(_0x3b65de)));else break;}$gameTemp[_0x2900('0x213')]();_0x4183f3[_0x2900('0x89')](/<LABEL RANGE:[ ](\d+)>/i)&&(this[_0x2900('0x164')][_0x2900('0x247')]=Number(RegExp['$1']));if(_0x4183f3['match'](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x40d00e=JSON[_0x2900('0x139')]('['+RegExp['$1'][_0x2900('0x89')](/\d+/g)+']');this[_0x2900('0x2b5')]=this['_moveOnlyRegions'][_0x2900('0x36')](_0x40d00e),this[_0x2900('0x2b5')][_0x2900('0x11c')](0x0);}if(_0x4183f3[_0x2900('0x89')](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x341a49=String(RegExp['$1']);if(_0x341a49[_0x2900('0x89')](/PLAYER/i)){if(_0x2900('0x176')!==_0x2900('0x176')){function _0x35cb77(){return this[_0x2900('0x28c')];}}else this[_0x2900('0x362')][_0x2900('0x17a')]=0x0;}else{if(_0x341a49[_0x2900('0x89')](/EVENT[ ](\d+)/i)){if(_0x2900('0x24c')!==_0x2900('0x24c')){function _0x4e76bb(){_0x570c00['isSelfVariable'](_0x101141)?this[_0x2900('0x260')](_0x4dbbbc,_0x5b75c4):_0x216f71[_0x2900('0x306')]['Game_Variables_setValue'][_0x2900('0x302')](this,_0x2e6aff,_0x3d52bf);}}else this[_0x2900('0x362')][_0x2900('0x17a')]=Number(RegExp['$1']);}}}_0x4183f3['match'](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this[_0x2900('0x362')][_0x2900('0x173')]=String(RegExp['$1'])[_0x2900('0x112')]()[_0x2900('0x17')]());if(_0x4183f3[_0x2900('0x89')](/<MOVE SYNCH DELAY:[ ](\d+)>/i)){if(_0x2900('0x28e')!==_0x2900('0xc0'))this['_moveSynch']['delay']=Number(RegExp['$1']);else{function _0x4b947d(){if(_0xfd7d55['isPlaytest']())_0x4217c8['log'](_0x303e17);}}}_0x4183f3[_0x2900('0x89')](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x2900('0x6e')]=!![]);if(_0x4183f3[_0x2900('0x89')](/<HIDE SHADOW>/i)){if(_0x2900('0x343')!==_0x2900('0x343')){function _0x5160c7(){if(this[_0x2900('0x228')]===_0x45aaa8)this[_0x2900('0x3d')]();if(!_0x378ace)return;this[_0x2900('0x1f8')](_0x1e18e6[_0x2900('0x270')],_0x3e0e3b[_0x2900('0x111')]);}}else this[_0x2900('0xad')][_0x2900('0x167')]=![];}_0x4183f3[_0x2900('0x89')](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x2900('0xad')][_0x2900('0x38a')]=String(RegExp['$1']));_0x4183f3[_0x2900('0x89')](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x2900('0x109')]=Number(RegExp['$1']));if(_0x4183f3[_0x2900('0x89')](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)){if(_0x2900('0x7a')!=='CXEfT')this['_spriteOffsetY']=Number(RegExp['$1']);else{function _0x36646a(){var _0x4ccd9f=this['x']-this['_addedHitbox']['left'],_0x334b5a=this['x']+this[_0x2900('0x2b7')]['right'],_0x7c5fd0=this['y']-this[_0x2900('0x2b7')]['up'],_0x30ab19=this['y']+this['_addedHitbox'][_0x2900('0x35c')];return _0x4ccd9f<=_0x5a36a5&&_0x32c818<=_0x334b5a&&_0x7c5fd0<=_0x5b9e6f&&_0x4645e2<=_0x30ab19;}}}if(_0x4183f3['match'](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if('LGwoo'!==_0x2900('0x36e')){function _0x29b9a7(){if(_0x4f376a[_0x2900('0x2dd')])this[_0x2900('0x119')](_0x1274cb[_0x2900('0x2dd')]);}}else this['_spriteOffsetX']=Number(RegExp['$1']),this[_0x2900('0x2bc')]=Number(RegExp['$2']);}_0x4183f3[_0x2900('0x89')](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x2900('0x2b8')]=String(RegExp['$1'])[_0x2900('0x2f3')]()[_0x2900('0x17')]());},Game_Event[_0x2900('0x133')][_0x2900('0x361')]=function(){this[_0x2900('0x4f')]();},Game_Event[_0x2900('0x133')][_0x2900('0x12a')]=function(){if(this[_0x2900('0x14f')])return!![];return Game_Character[_0x2900('0x133')]['isNearTheScreen']['call'](this);},VisuMZ[_0x2900('0x306')][_0x2900('0x13')]=Game_Event[_0x2900('0x133')][_0x2900('0x421')],Game_Event[_0x2900('0x133')][_0x2900('0x421')]=function(){if(this['isPreventSelfMovement']())return;VisuMZ['EventsMoveCore'][_0x2900('0x13')]['call'](this);if(this[_0x2900('0x70')]()){if('uQlhK'!==_0x2900('0x18f')){function _0xe2aba(){const _0x517ceb=_0x2f60ba[_0x2900('0x2ea')](_0x4ab422-this['x']),_0x151b6c=_0x441af1['round'](_0x5bc91c-this['y']);this[_0x2900('0x84')](_0x517ceb,_0x151b6c);}}else VisuMZ[_0x2900('0x8a')](this[_0x2900('0x111')]);}},Game_Event[_0x2900('0x133')][_0x2900('0x33b')]=function(){const _0x56dc50=VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x16b')];if($gameMap[_0x2900('0x9a')]()&&_0x56dc50[_0x2900('0x2c0')])return!![];if($gameMessage[_0x2900('0x1b8')]()&&_0x56dc50['StopAutoMoveMessages'])return!![];if(!$gameSystem[_0x2900('0x2fd')]())return!![];if(this[_0x2900('0x240')]()>=0x0)return!![];return![];},Game_Event[_0x2900('0x133')]['updateShadowChanges']=function(){const _0x1d3112=SceneManager[_0x2900('0x21b')]['_spriteset'];if(_0x1d3112){if(_0x2900('0x1a2')===_0x2900('0x1a2')){const _0x5a04d0=_0x1d3112[_0x2900('0xed')](this);if(_0x5a04d0&&_0x5a04d0['_shadowSprite']&&_0x5a04d0[_0x2900('0x1a')][_0x2900('0xe8')]!==this[_0x2900('0x123')]()){if('oTxrf'!==_0x2900('0x27b'))_0x5a04d0[_0x2900('0x1a')][_0x2900('0xe8')]=this['shadowFilename'](),_0x5a04d0[_0x2900('0x1a')][_0x2900('0x15a')]=ImageManager[_0x2900('0x19a')](_0x5a04d0[_0x2900('0x1a')][_0x2900('0xe8')]);else{function _0x3dbd6b(){const _0x4eb7b3='%1%2'[_0x2900('0xc1')](_0x4d6027,_0x5d3832);_0x463ccc[_0x4eb7b3]&&(_0x5b1c53[_0x4eb7b3]=_0x286347[_0x4eb7b3][_0x2900('0x1ea')](0x0));}}}}else{function _0x4d16c0(){return this[_0x2900('0x2b3')](_0x71a7ef);}}}},Game_Event[_0x2900('0x133')][_0x2900('0x123')]=function(){return this['_shadowGraphic'][_0x2900('0x38a')];},Game_Event['prototype'][_0x2900('0x15')]=function(){if(!this[_0x2900('0xad')][_0x2900('0x167')])return![];return Game_CharacterBase[_0x2900('0x133')][_0x2900('0x15')]['call'](this);},Game_Event[_0x2900('0x133')][_0x2900('0x11f')]=function(){return this[_0x2900('0x164')][_0x2900('0x2a7')];},Game_Event['prototype'][_0x2900('0x151')]=function(){return this['_labelWindow'][_0x2900('0x247')];},Game_Event['prototype'][_0x2900('0x2fc')]=function(_0x4dd15f,_0x1fdc0b,_0x107211){if(this[_0x2900('0x39e')]())return this[_0x2900('0x67')](_0x4dd15f,_0x1fdc0b,_0x107211);if($gameMap['isRegionAllowPass'](_0x4dd15f,_0x1fdc0b,_0x107211,_0x2900('0x28f')))return!![];if($gameMap['isRegionForbidPass'](_0x4dd15f,_0x1fdc0b,_0x107211,'event'))return![];return Game_Character[_0x2900('0x133')][_0x2900('0x2fc')][_0x2900('0x302')](this,_0x4dd15f,_0x1fdc0b,_0x107211);},Game_Event[_0x2900('0x133')][_0x2900('0x39e')]=function(){if(this[_0x2900('0x2b5')]===undefined)this[_0x2900('0xfb')]();return this[_0x2900('0x2b5')][_0x2900('0x311')]>0x0;},Game_Event[_0x2900('0x133')][_0x2900('0x67')]=function(_0x1c221c,_0x28f791,_0xabbfe6){const _0x2708c6=$gameMap[_0x2900('0x20a')](_0x1c221c,_0xabbfe6),_0x5f236a=$gameMap[_0x2900('0x3ee')](_0x28f791,_0xabbfe6),_0x46f67a=$gameMap[_0x2900('0xc5')](_0x2708c6,_0x5f236a);return this[_0x2900('0x2b5')]['includes'](_0x46f67a);},VisuMZ[_0x2900('0x306')][_0x2900('0x253')]=Game_Event['prototype'][_0x2900('0x26f')],Game_Event[_0x2900('0x133')]['findProperPageIndex']=function(){return this[_0x2900('0x404')]=![],this[_0x2900('0x115')]=![],this[_0x2900('0x28f')]()?VisuMZ[_0x2900('0x306')][_0x2900('0x253')][_0x2900('0x302')](this):-0x1;},VisuMZ[_0x2900('0x306')][_0x2900('0x95')]=Game_Event['prototype']['meetsConditions'],Game_Event[_0x2900('0x133')]['meetsConditions']=function(_0x4ddbed){this[_0x2900('0x39b')](_0x4ddbed),$gameTemp[_0x2900('0x345')](this);const _0x2d824b=VisuMZ['EventsMoveCore'][_0x2900('0x95')][_0x2900('0x302')](this,_0x4ddbed);return $gameTemp[_0x2900('0x213')](),_0x2d824b;},Game_Event['prototype'][_0x2900('0xe4')]=function(){return this[_0x2900('0x404')];},Game_Event['prototype'][_0x2900('0x39b')]=function(_0x1404b9){const _0x1784fe=_0x1404b9[_0x2900('0x26e')];if(_0x1784fe['switch1Valid']&&DataManager[_0x2900('0x3d9')](_0x1784fe[_0x2900('0x175')]))this[_0x2900('0x404')]=!![];else{if(_0x1784fe[_0x2900('0x22b')]&&DataManager[_0x2900('0x3d9')](_0x1784fe[_0x2900('0x1da')]))this[_0x2900('0x404')]=!![];else _0x1784fe['variableValid']&&DataManager[_0x2900('0x5')](_0x1784fe['variableId'])&&(this[_0x2900('0x404')]=!![]);}},Game_Event['prototype'][_0x2900('0x236')]=function(){return this[_0x2900('0x325')];},Game_Event[_0x2900('0x133')]['onClickTrigger']=function(){$gameTemp['clearDestination'](),this['start']();},Game_Event[_0x2900('0x133')][_0x2900('0xe3')]=function(_0x55e772,_0x499a78){if(this[_0x2900('0x2b7')]){if(_0x2900('0x237')==='BsIpm')return this['posEventsMoveCore'](_0x55e772,_0x499a78);else{function _0x17777c(){const _0xcd7428=_0x2900('0x2e0')['format'](_0x195d12['charAt'](0x0)[_0x2900('0x2f3')]()+_0x191563[_0x2900('0x1ea')](0x1));if(_0x4af450[_0xcd7428])return _0x3dd665[_0xcd7428][_0x2900('0x3fe')](_0x455293);}}}else return Game_Character[_0x2900('0x133')][_0x2900('0xe3')]['call'](this,_0x55e772,_0x499a78);},Game_Event[_0x2900('0x133')][_0x2900('0x1eb')]=function(_0xb8c40b,_0x354690){var _0x1debea=this['x']-this[_0x2900('0x2b7')][_0x2900('0x2f0')],_0x110917=this['x']+this['_addedHitbox'][_0x2900('0x30a')],_0x1e4aea=this['y']-this[_0x2900('0x2b7')]['up'],_0x525b7c=this['y']+this['_addedHitbox'][_0x2900('0x35c')];return _0x1debea<=_0xb8c40b&&_0xb8c40b<=_0x110917&&_0x1e4aea<=_0x354690&&_0x354690<=_0x525b7c;},Game_Event[_0x2900('0x133')][_0x2900('0x265')]=function(_0x326344,_0x3946f5,_0x56edd0){for(let _0x33b840=-this[_0x2900('0x2b7')][_0x2900('0x2f0')];_0x33b840<=this[_0x2900('0x2b7')][_0x2900('0x30a')];_0x33b840++){if(_0x2900('0x307')!==_0x2900('0x307')){function _0x20abb6(){if([0x1,0x4,0x7][_0x2900('0x3fe')](_0x58f65f))_0x562cbd-=0x1;if([0x3,0x6,0x9]['includes'](_0x3efef9))_0x2f6339+=0x1;return this['roundX'](_0x25b934);}}else for(let _0xdf0ffe=-this['_addedHitbox']['up'];_0xdf0ffe<=this[_0x2900('0x2b7')]['down'];_0xdf0ffe++){if(!Game_Character[_0x2900('0x133')][_0x2900('0x265')]['call'](this,_0x326344+_0x33b840,_0x3946f5+_0xdf0ffe,_0x56edd0)){if('KvxgD'!==_0x2900('0x45')){function _0x56daa3(){_0x1e6ef4=this[_0x2900('0x31b')](_0x417e9d,_0x281e93);}}else return![];}}}return!![];},Game_Event[_0x2900('0x133')][_0x2900('0x2a5')]=function(_0x11ae93,_0x24b132){const _0x4fbfed=$gameMap[_0x2900('0x3da')](_0x11ae93,_0x24b132)[_0x2900('0x40')](_0x12fd84=>_0x12fd84!==this);return _0x4fbfed[_0x2900('0x311')]>0x0;},Game_Event[_0x2900('0x133')][_0x2900('0x373')]=function(_0x7d123a,_0x212749){if(!this[_0x2900('0x38b')]())return![];else{const _0x47b5fe=$gameMap[_0x2900('0x3da')](_0x7d123a,_0x212749)[_0x2900('0x40')](_0x5cfeba=>_0x5cfeba!==this&&_0x5cfeba[_0x2900('0x38b')]());return _0x47b5fe['length']>0x0;}},Game_Event[_0x2900('0x133')][_0x2900('0x3bc')]=function(){return this[_0x2900('0x217')][_0x2900('0x173')]||'none';},Game_Event[_0x2900('0x133')][_0x2900('0x38f')]=function(){return this[_0x2900('0x217')][_0x2900('0x2fa')]||0x0;},Game_Event['prototype'][_0x2900('0x337')]=function(){return this[_0x2900('0x217')]['regionList']||[];},Game_Event[_0x2900('0x133')][_0x2900('0x8b')]=function(){Game_Character[_0x2900('0x133')][_0x2900('0x8b')][_0x2900('0x302')](this);if([_0x2900('0x397'),_0x2900('0x29e')][_0x2900('0x3fe')](this['activationProximityType']()))return;$gamePlayer['checkEventTriggerEventsMoveCore']([0x2]);},VisuMZ[_0x2900('0x306')][_0x2900('0x3a1')]=Game_Event[_0x2900('0x133')][_0x2900('0x3')],Game_Event[_0x2900('0x133')]['checkEventTriggerAuto']=function(){if(this[_0x2900('0x2a4')]!==0x3)return;if(this[_0x2900('0x227')])return;if(!this[_0x2900('0x1de')](![]))return;if(!this[_0x2900('0xda')](![]))return;VisuMZ[_0x2900('0x306')][_0x2900('0x3a1')]['call'](this);},VisuMZ[_0x2900('0x306')][_0x2900('0x3f4')]=Game_Event[_0x2900('0x133')][_0x2900('0x349')],Game_Event['prototype'][_0x2900('0x349')]=function(){if(!this[_0x2900('0x3c')])return;if(!this[_0x2900('0x1de')](!![]))return;if(!this[_0x2900('0xda')](!![]))return;VisuMZ[_0x2900('0x306')][_0x2900('0x3f4')][_0x2900('0x302')](this);},Game_Event[_0x2900('0x133')][_0x2900('0x1de')]=function(_0x10530a){if(!_0x10530a&&$gameMap[_0x2900('0x9a')]())return![];if(!_0x10530a&&$gameMap[_0x2900('0x2ce')]())return![];if(this['activationRegionList']()<=0x0)return!![];return $gamePlayer[_0x2900('0x4')](this);},Game_Event[_0x2900('0x133')][_0x2900('0xda')]=function(_0x447748){if(!_0x447748&&$gameMap[_0x2900('0x9a')]())return![];if(!_0x447748&&$gameMap[_0x2900('0x2ce')]())return![];if([_0x2900('0x397'),_0x2900('0x29e')][_0x2900('0x3fe')](this['activationProximityType']()))return!![];return $gamePlayer[_0x2900('0x417')](this);},VisuMZ[_0x2900('0x8a')]=function(_0x3b5b5b){for(const _0x5b83de of $gameMap[_0x2900('0x30d')]()){if(_0x2900('0x2e5')===_0x2900('0x47')){function _0x2a5b1f(){return!![];}}else{if(!_0x5b83de)continue;_0x5b83de[_0x2900('0x240')]()===_0x3b5b5b&&_0x5b83de[_0x2900('0x24')]();}}},VisuMZ[_0x2900('0x3e8')]=function(_0x29f4b4){if(_0x29f4b4===0x0)return $gamePlayer;return $gameMap[_0x2900('0x28f')](_0x29f4b4);},Game_Event['prototype'][_0x2900('0x240')]=function(){return this[_0x2900('0x362')][_0x2900('0x17a')];},Game_Event[_0x2900('0x133')][_0x2900('0x2bd')]=function(){return this[_0x2900('0x362')][_0x2900('0x173')];},Game_Event[_0x2900('0x133')][_0x2900('0x2eb')]=function(){if(this[_0x2900('0x240')]()>=0x0){if(_0x2900('0x3f')!==_0x2900('0x321')){const _0x591be9=VisuMZ[_0x2900('0x3e8')](this[_0x2900('0x240')]());if(_0x591be9)return _0x591be9['realMoveSpeed']();}else{function _0x5a17ee(){return _0x2453ea[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x61')][_0x2900('0x15c')];}}}return Game_Character[_0x2900('0x133')][_0x2900('0x2eb')][_0x2900('0x302')](this);},Game_Event[_0x2900('0x133')][_0x2900('0x24')]=function(){this[_0x2900('0x362')][_0x2900('0x20')]=this[_0x2900('0x362')][_0x2900('0x20')]||0x0,this[_0x2900('0x362')][_0x2900('0x20')]--;if(this[_0x2900('0x362')][_0x2900('0x20')]>0x0)return;this[_0x2900('0x362')][_0x2900('0x20')]=this[_0x2900('0x362')][_0x2900('0x347')],this[_0x2900('0x196')]();},Game_Event[_0x2900('0x133')][_0x2900('0x196')]=function(){switch(this['moveSynchType']()){case'random':this['processMoveSynchRandom']();break;case _0x2900('0x3d5'):this[_0x2900('0x259')]();break;case _0x2900('0x3ec'):this['processMoveSynchAway']();break;case _0x2900('0x20f'):this['processMoveSynchCustom']();break;case'mimic':case _0x2900('0x1b7'):this['processMoveSynchMimic']();break;case _0x2900('0x3bf'):case'reverse\x20copy':this[_0x2900('0x3cb')]();break;case _0x2900('0x197'):case'horizontal\x20mirror':case'mirror\x20horz':case _0x2900('0x1fc'):this[_0x2900('0x38c')]();break;case _0x2900('0x25d'):case _0x2900('0x1ca'):case _0x2900('0x1dc'):case _0x2900('0x22'):this[_0x2900('0x183')]();break;default:this[_0x2900('0x348')]();break;}this[_0x2900('0x372')]();},Game_Event[_0x2900('0x133')]['processMoveSynchRandom']=function(){const _0x7873e1=[0x2,0x4,0x6,0x8];$gameMap[_0x2900('0x1e3')]()&&_0x7873e1[_0x2900('0x315')](0x1,0x3,0x7,0x9);const _0x395bf6=[];for(const _0x1ec8ef of _0x7873e1){if(this['canPass'](this['x'],this['y'],_0x1ec8ef))_0x395bf6[_0x2900('0x315')](_0x1ec8ef);}if(_0x395bf6['length']>0x0){if('gicVx'===_0x2900('0x391')){const _0x20aa82=_0x395bf6[Math[_0x2900('0x3a8')](_0x395bf6[_0x2900('0x311')])];this[_0x2900('0x157')](_0x20aa82);}else{function _0x229199(){return _0x49f3ac>0x0?0x4:0x6;}}}},Game_Event['prototype'][_0x2900('0x259')]=function(){const _0x99f2d3=VisuMZ[_0x2900('0x3e8')](this['moveSynchTarget']());this[_0x2900('0x23')](_0x99f2d3);},Game_Event['prototype'][_0x2900('0x1e5')]=function(){const _0x5597aa=VisuMZ[_0x2900('0x3e8')](this[_0x2900('0x240')]());this[_0x2900('0x2b3')](_0x5597aa);},Game_Event[_0x2900('0x133')][_0x2900('0x324')]=function(){this['updateRoutineMove']();},Game_Event[_0x2900('0x133')][_0x2900('0x110')]=function(){const _0x4818e1=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']());this[_0x2900('0x157')](_0x4818e1[_0x2900('0xc6')]());},Game_Event[_0x2900('0x133')][_0x2900('0x3cb')]=function(){const _0x437508=VisuMZ[_0x2900('0x3e8')](this['moveSynchTarget']()),_0x473a97=this[_0x2900('0x364')](_0x437508[_0x2900('0xc6')]());this[_0x2900('0x157')](this[_0x2900('0x364')](_0x437508['direction']()));},Game_Event[_0x2900('0x133')][_0x2900('0x38c')]=function(){const _0x4a8eb3=VisuMZ[_0x2900('0x3e8')](this[_0x2900('0x240')]()),_0x4701b7=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x4a8eb3[_0x2900('0xc6')]()];this[_0x2900('0x157')](_0x4701b7);},Game_Event[_0x2900('0x133')][_0x2900('0x183')]=function(){const _0x5c2040=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']()),_0x4e703a=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x5c2040[_0x2900('0xc6')]()];this[_0x2900('0x157')](_0x4e703a);},Game_Event[_0x2900('0x133')]['restoreSavedEventPosition']=function(){const _0xbab852=$gameSystem[_0x2900('0xb7')](this);if(!_0xbab852)return;this[_0x2900('0x37a')](_0xbab852['x'],_0xbab852['y']),this[_0x2900('0x13a')](_0xbab852[_0x2900('0x7d')]);if(this[_0x2900('0x279')]===_0xbab852[_0x2900('0xd0')]){if('rjVfY'!==_0x2900('0x393'))this['_moveRouteIndex']=_0xbab852[_0x2900('0x32e')];else{function _0x28c195(){this[_0x2900('0x404')]=!![];}}}},Game_Event[_0x2900('0x133')][_0x2900('0x320')]=function(){Game_Character[_0x2900('0x133')][_0x2900('0x320')][_0x2900('0x302')](this),this[_0x2900('0x12c')]();},Game_Event[_0x2900('0x133')][_0x2900('0xf6')]=function(){if($gameMap[_0x2900('0x29b')]())return!![];return this['_saveEventLocation'];},Game_Event[_0x2900('0x133')][_0x2900('0x12c')]=function(){if(!this[_0x2900('0xf6')]())return;this['saveEventLocation']();},Game_Event[_0x2900('0x133')]['saveEventLocation']=function(){$gameSystem[_0x2900('0x305')](this);},Game_Event[_0x2900('0x133')][_0x2900('0x3e2')]=function(){$gameSystem[_0x2900('0x145')](this);},Game_Event[_0x2900('0x133')][_0x2900('0x27')]=function(){return $gameSystem['getEventIconData']()?Game_Character['prototype'][_0x2900('0x27')][_0x2900('0x302')](this):this[_0x2900('0x28c')];},Game_Event[_0x2900('0x133')][_0x2900('0x398')]=function(){return this[_0x2900('0x115')];},VisuMZ[_0x2900('0x306')][_0x2900('0x24f')]=Game_Event[_0x2900('0x133')][_0x2900('0x219')],Game_Event[_0x2900('0x133')]['meetsConditions']=function(_0x3378a3){this[_0x2900('0x142')](_0x3378a3);const _0x4817cd=VisuMZ[_0x2900('0x306')][_0x2900('0x24f')]['call'](this,_0x3378a3);if(!_0x4817cd)return![];return this[_0x2900('0x177')](_0x3378a3);},Game_Event['prototype'][_0x2900('0x142')]=function(_0x1d19f2){VisuMZ['EventsMoveCore'][_0x2900('0x406')]['loadCPC'](_0x1d19f2),this[_0x2900('0x115')]=_0x1d19f2[_0x2900('0x117')][_0x2900('0x311')]>0x0;},Game_Event[_0x2900('0x133')][_0x2900('0x177')]=function(_0x3298e0){_0x3298e0[_0x2900('0x117')]===undefined&&VisuMZ['EventsMoveCore'][_0x2900('0x406')][_0x2900('0x226')](_0x3298e0);if(_0x3298e0['CPC'][_0x2900('0x311')]>0x0){if(_0x2900('0x3f2')==='ehklh'){function _0xf43d16(){const _0x37484d=this[_0x2900('0x364')](this[_0x2900('0x7d')]());return _0x1593e1['roundYWithDirection'](this['y'],_0x37484d);}}else return $gameMap['event'](this[_0x2900('0x111')])&&VisuMZ['EventsMoveCore']['CustomPageConditions']['metCPC'](_0x3298e0['CPC'],this[_0x2900('0x111')]);}return!![];},VisuMZ['EventsMoveCore']['Game_Troop_meetsConditionsCPC']=Game_Troop['prototype'][_0x2900('0x219')],Game_Troop[_0x2900('0x133')]['meetsConditions']=function(_0x1c558e){var _0x487102=VisuMZ['EventsMoveCore'][_0x2900('0x41e')]['call'](this,_0x1c558e);return _0x487102&&this[_0x2900('0x19c')](_0x1c558e);},Game_Troop['prototype'][_0x2900('0x19c')]=function(_0x1eb824){_0x1eb824['CPC']===undefined&&VisuMZ[_0x2900('0x306')][_0x2900('0x406')][_0x2900('0x226')](_0x1eb824);if(_0x1eb824['CPC'][_0x2900('0x311')]>0x0)return VisuMZ[_0x2900('0x306')]['CustomPageConditions']['metCPC'](_0x1eb824[_0x2900('0x117')],0x0);return!![];},VisuMZ['EventsMoveCore'][_0x2900('0x40d')]=Game_Interpreter['prototype'][_0x2900('0x358')],Game_Interpreter[_0x2900('0x133')][_0x2900('0x358')]=function(){if(this[_0x2900('0x85')]===_0x2900('0x1cc')){if(_0x2900('0x1ad')!==_0x2900('0x1e7')){if(window[this[_0x2900('0x205')]]){if(_0x2900('0x29d')===_0x2900('0x29d'))this['_waitMode']='',this[_0x2900('0x3e1')]();else{function _0x3e551e(){return 0x8;}}}else{if('qFvCI'==='qFvCI')return!![];else{function _0x2266b6(){this[_0x2900('0xe1')]['x']=0x1/_0x789b91[_0x2900('0x140')](),this[_0x2900('0xe1')]['y']=0x1/_0x170026[_0x2900('0x140')]();}}}}else{function _0x255109(){let _0x33f89c=0x0;_0x29a7f3['isSupportDiagonalMovement']()?_0x33f89c=this[_0x2900('0x31b')](_0x1fcdab,_0x35026c):_0x33f89c=this[_0x2900('0x2f1')](_0x34e896,_0x4d8400),this[_0x2900('0x157')](_0x33f89c),this[_0x2900('0x12')](!![]);}}}else{if(_0x2900('0x40e')!==_0x2900('0x40e')){function _0x12ca8e(){_0x54f888[_0x2900('0x34c')](_0x188b0,_0x235371),_0x5ab8fc[_0x2900('0x30')]=_0xbcf9d7[_0x2900('0x30')]||_0x24e22f['mapId'](),_0x4b6b1c[_0x2900('0x1fb')](_0x16d819[_0x2900('0x30')],_0x239b7e[_0x2900('0x2d5')]);}}else return VisuMZ['EventsMoveCore'][_0x2900('0x40d')][_0x2900('0x302')](this);}},VisuMZ['EventsMoveCore'][_0x2900('0x2f6')]=Game_Interpreter[_0x2900('0x133')]['executeCommand'],Game_Interpreter['prototype'][_0x2900('0x30f')]=function(){const _0x1c2b5f=$gameMap&&this[_0x2900('0x111')]?$gameMap['event'](this[_0x2900('0x111')]):null;$gameTemp[_0x2900('0x345')](_0x1c2b5f);const _0x30a0fd=VisuMZ[_0x2900('0x306')][_0x2900('0x2f6')]['call'](this);return $gameTemp['clearSelfTarget'](),_0x30a0fd;},VisuMZ[_0x2900('0x306')][_0x2900('0x308')]=Game_Interpreter[_0x2900('0x133')][_0x2900('0xb0')],Game_Interpreter[_0x2900('0x133')][_0x2900('0xb0')]=function(_0x501c99){return $gameTemp[_0x2900('0x1b1')](this),VisuMZ[_0x2900('0x306')][_0x2900('0x308')][_0x2900('0x302')](this,_0x501c99);},Game_Interpreter[_0x2900('0x133')]['pluginCommandCallEvent']=function(_0x336562){this[_0x2900('0x1e')]=_0x336562;const _0x5681b8=_0x2900('0x27d')[_0x2900('0xc1')](_0x336562[_0x2900('0x22d')][_0x2900('0x34e')](0x3));this[_0x2900('0x205')]=_0x2900('0x10c')+Graphics[_0x2900('0x272')]+'_'+this[_0x2900('0x2d7')](),DataManager[_0x2900('0x1e4')](this[_0x2900('0x205')],_0x5681b8),window[this[_0x2900('0x205')]]?this[_0x2900('0x3e1')]():this['setWaitMode'](_0x2900('0x1cc'));},Game_Interpreter[_0x2900('0x133')][_0x2900('0x3e1')]=function(){const _0x1c622b=this[_0x2900('0x1e')],_0x483e7b=window[this['_callEventMap']],_0x2d1f13=_0x483e7b[_0x2900('0x30d')][_0x1c622b[_0x2900('0x2d7')]];if(_0x2d1f13&&_0x2d1f13[_0x2900('0x2cc')][_0x1c622b[_0x2900('0x296')]-0x1]){if(_0x2900('0x17b')!=='EomMi'){const _0x2de168=_0x2d1f13['pages'][_0x1c622b[_0x2900('0x296')]-0x1][_0x2900('0x3d4')];this[_0x2900('0xdb')](_0x2de168,this[_0x2900('0x2d7')]());}else{function _0x3407c9(){const _0x157bce=_0x21cee3[_0x2900('0xb7')](this);if(!_0x157bce)return;this[_0x2900('0x37a')](_0x157bce['x'],_0x157bce['y']),this[_0x2900('0x13a')](_0x157bce[_0x2900('0x7d')]),this[_0x2900('0x279')]===_0x157bce[_0x2900('0xd0')]&&(this[_0x2900('0x1d8')]=_0x157bce[_0x2900('0x32e')]);}}}window[this['_callEventMap']]=undefined,this['_callEventMap']=undefined,this[_0x2900('0x1e')]=undefined;};function Game_CPCInterpreter(){this[_0x2900('0x41a')][_0x2900('0x382')](this,arguments);};Game_CPCInterpreter['prototype']=Object[_0x2900('0x3b5')](Game_Interpreter[_0x2900('0x133')]),Game_CPCInterpreter[_0x2900('0x133')][_0x2900('0x28d')]=Game_CPCInterpreter,Game_CPCInterpreter[_0x2900('0x133')][_0x2900('0xcb')]=function(){Game_Interpreter[_0x2900('0x133')][_0x2900('0xcb')][_0x2900('0x302')](this),this[_0x2900('0x19d')]=![];},Game_CPCInterpreter['prototype'][_0x2900('0x1b6')]=function(){while(this['isRunning']()){if(_0x2900('0x294')!==_0x2900('0x294')){function _0x4264b1(){if(_0x501828[_0x2900('0x21b')][_0x2900('0x28d')]===_0x3d86ee)return![];return _0x28808f['SelfSwitches'][_0x2900('0x3fe')](_0x4f5d3c);}}else this[_0x2900('0x30f')]();}},Game_CPCInterpreter[_0x2900('0x133')][_0x2900('0x38d')]=function(_0x3c0da3){Game_Interpreter[_0x2900('0x133')][_0x2900('0x38d')][_0x2900('0x302')](this,_0x3c0da3);if(this[_0x2900('0x8')]['some'](_0x2bfb49=>_0x2bfb49[_0x2900('0x89')](/<(?:CONDITION|CONDITIONS) MET>/i))){if('VzdBA'===_0x2900('0x369')){function _0x4596df(){return this['_moveSynch'][_0x2900('0x17a')];}}else this['_cpc']=!![];}return!![];},VisuMZ[_0x2900('0x306')][_0x2900('0x1a8')]=Scene_Map[_0x2900('0x133')]['startEncounterEffect'],Scene_Map[_0x2900('0x133')][_0x2900('0xe9')]=function(){VisuMZ[_0x2900('0x306')][_0x2900('0x1a8')][_0x2900('0x302')](this),this[_0x2900('0x1e0')][_0x2900('0x18b')]();},VisuMZ[_0x2900('0x306')][_0x2900('0x257')]=Scene_Load[_0x2900('0x133')][_0x2900('0xca')],Scene_Load[_0x2900('0x133')][_0x2900('0xca')]=function(){if($gameMap)$gameMap[_0x2900('0x21')]();VisuMZ[_0x2900('0x306')][_0x2900('0x257')]['call'](this);},VisuMZ['EventsMoveCore'][_0x2900('0x7c')]=Sprite_Character[_0x2900('0x133')][_0x2900('0x3e4')],Sprite_Character['prototype'][_0x2900('0x3e4')]=function(){VisuMZ[_0x2900('0x306')][_0x2900('0x7c')][_0x2900('0x302')](this),this[_0x2900('0x21d')](),this['createIconSprite']();},Sprite_Character[_0x2900('0x133')][_0x2900('0x21d')]=function(){this[_0x2900('0x17f')]=0xff;},Sprite_Character[_0x2900('0x133')][_0x2900('0x3d2')]=function(){this[_0x2900('0x7e')]=new Sprite(),this['_eventIconSprite'][_0x2900('0x15a')]=ImageManager[_0x2900('0x19a')](_0x2900('0x76')),this['_eventIconSprite']['setFrame'](0x0,0x0,0x0,0x0),this[_0x2900('0x7e')][_0x2900('0x39a')]['x']=0.5,this[_0x2900('0x7e')][_0x2900('0x39a')]['y']=0x1,this[_0x2900('0x7')](this[_0x2900('0x7e')]);},Sprite_Character[_0x2900('0x133')][_0x2900('0x207')]=function(){return this[_0x2900('0x3c5')]&&this['_characterName']['match'](/\[VS8\]/i);},Sprite_Character[_0x2900('0x133')][_0x2900('0x62')]=function(){return this[_0x2900('0x207')]()&&VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x61')][_0x2900('0x263')];},VisuMZ[_0x2900('0x306')][_0x2900('0x2d8')]=Sprite_Character[_0x2900('0x133')][_0x2900('0x372')],Sprite_Character[_0x2900('0x133')][_0x2900('0x372')]=function(){VisuMZ['EventsMoveCore']['Sprite_Character_update'][_0x2900('0x302')](this);VisuMZ[_0x2900('0x306')]['Settings'][_0x2900('0x16b')]['EnableDashTilt']&&this[_0x2900('0x102')]();if(this[_0x2900('0x1a')]){if(_0x2900('0xb4')!==_0x2900('0xb4')){function _0x4646f6(){if(!_0xf18ab3['EventsMoveCore'][_0x2900('0x3e0')][_0x2900('0x16b')][_0x2900('0x5c')])return;for(const _0x525300 of this[_0x2900('0x18')]){this[_0x2900('0x168')][_0x2900('0x1ba')](_0x525300[_0x2900('0x1a')]);}}}else this[_0x2900('0x245')]();}if(this['_eventIconSprite']){if('Uhcek'===_0x2900('0x3f0'))this[_0x2900('0x3be')]();else{function _0x27f605(){_0xf824fa['savePreservedMorphEventDataKey'](_0x4aa82d[_0x2900('0x31')],_0x302d61[_0x2900('0x81')],_0x4d4fa3['TemplateName'],_0xc098c['Step2MapId'],_0x3426a4[_0x2900('0xdc')]);}}}},VisuMZ[_0x2900('0x306')][_0x2900('0x2fe')]=Sprite_Character['prototype'][_0x2900('0x1f')],Sprite_Character['prototype'][_0x2900('0x1f')]=function(){return this[_0x2900('0x207')]()?this[_0x2900('0x223')]():VisuMZ[_0x2900('0x306')]['Sprite_Character_characterPatternY'][_0x2900('0x302')](this);},Sprite_Character[_0x2900('0x133')][_0x2900('0x223')]=function(){const _0x28711f=this[_0x2900('0xfa')]['direction'](),_0x3f93cc=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0x3f93cc[_0x28711f]-0x2)/0x2;},Sprite_Character[_0x2900('0x133')][_0x2900('0x102')]=function(){this['rotation']=0x0;if(this[_0x2900('0x135')]()){const _0x49dff4=VisuMZ[_0x2900('0x306')]['Settings'][_0x2900('0x16b')],_0x132da0=this[_0x2900('0xfa')][_0x2900('0x7d')]();if([0x1,0x4,0x7][_0x2900('0x3fe')](_0x132da0))this[_0x2900('0x288')]=_0x49dff4[_0x2900('0xab')];if([0x3,0x6,0x9][_0x2900('0x3fe')](_0x132da0))this['rotation']=_0x49dff4[_0x2900('0x322')];[0x2,0x8][_0x2900('0x3fe')](_0x132da0)&&(this[_0x2900('0x288')]=[-_0x49dff4[_0x2900('0xff')],0x0,_0x49dff4[_0x2900('0xff')]][this['_character'][_0x2900('0x2d')]()]);}},Sprite_Character[_0x2900('0x133')][_0x2900('0x135')]=function(){if(this[_0x2900('0x2ff')])return![];return this['_character'][_0x2900('0x2f4')]()&&!this[_0x2900('0xfa')][_0x2900('0x225')]()&&!this[_0x2900('0xfa')][_0x2900('0x3f1')]()&&this[_0x2900('0xf1')]()===0x0;},Sprite_Character[_0x2900('0x133')][_0x2900('0x245')]=function(){this['_shadowSprite']['x']=this[_0x2900('0xfa')][_0x2900('0x249')](),this['_shadowSprite']['y']=this[_0x2900('0xfa')][_0x2900('0x1c2')](),this[_0x2900('0x1a')][_0x2900('0x266')]=this[_0x2900('0x266')],this[_0x2900('0x1a')][_0x2900('0x167')]=this[_0x2900('0xfa')][_0x2900('0x15')](),this[_0x2900('0x1a')]['_hidden']=this['_hidden'];if(!this[_0x2900('0xfa')][_0x2900('0x1be')]())this['_shadowSprite'][_0x2900('0xe1')]['x']=Math[_0x2900('0x55')](0x1,this[_0x2900('0x1a')][_0x2900('0xe1')]['x']+0.1),this['_shadowSprite'][_0x2900('0xe1')]['y']=Math[_0x2900('0x55')](0x1,this['_shadowSprite']['scale']['y']+0.1);else{if(_0x2900('0x150')===_0x2900('0x2a1')){function _0x3e60f5(){const _0x1ba288=this[_0x2900('0x7d')](),_0x3f4fa7=_0x54ae0a[_0x2900('0x20a')](this['x'],_0x1ba288),_0x42f077=_0x704b96[_0x2900('0x3ee')](this['y'],_0x1ba288);this['startMapCommonEventOnOK'](_0x3f4fa7,_0x42f077);}}else this[_0x2900('0x1a')][_0x2900('0xe1')]['x']=Math[_0x2900('0x1df')](0x0,this[_0x2900('0x1a')][_0x2900('0xe1')]['x']-0.1),this[_0x2900('0x1a')][_0x2900('0xe1')]['y']=Math['max'](0x0,this['_shadowSprite']['scale']['y']-0.1);}},Sprite_Character['prototype'][_0x2900('0x3be')]=function(){const _0xaad2d7=this[_0x2900('0x7e')],_0x58676e=this[_0x2900('0xf1')]();if(_0x58676e<=0x0)return _0xaad2d7[_0x2900('0x9c')](0x0,0x0,0x0,0x0);else{const _0x29af16=ImageManager[_0x2900('0xa8')],_0x32ff1c=ImageManager[_0x2900('0x1c9')],_0x2b9d54=_0x58676e%0x10*_0x29af16,_0x115a4c=Math[_0x2900('0x64')](_0x58676e/0x10)*_0x32ff1c;_0xaad2d7[_0x2900('0x9c')](_0x2b9d54,_0x115a4c,_0x29af16,_0x32ff1c),this[_0x2900('0x167')]=!![];}const _0xcb07f7=this['_character']['getEventIconData']();if(this[_0x2900('0x62')]())this[_0x2900('0x273')](_0xaad2d7);else{if(_0x2900('0x10f')==='gBWuy')_0xaad2d7['x']=_0xcb07f7?_0xcb07f7[_0x2900('0x191')]:0x0,_0xaad2d7['y']=_0xcb07f7?-this['height']+_0xcb07f7['bufferY']:0x0;else{function _0x53982c(){if(_0x10732e===0x1)return this[_0x2900('0x265')](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x2a2323===0x3)return this[_0x2900('0x265')](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x350253===0x7)return this[_0x2900('0x265')](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x2ddc76===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x506f6a;}}}_0xaad2d7[_0x2900('0x29')]=_0xcb07f7?_0xcb07f7[_0x2900('0x29')]:0x0,this[_0x2900('0x1ba')](_0xaad2d7),this[_0x2900('0x7')](_0xaad2d7),_0xaad2d7[_0x2900('0x288')]=-this[_0x2900('0x288')];},Sprite_Character[_0x2900('0x133')][_0x2900('0x273')]=function(_0x706408){_0x706408['x']=0x0,_0x706408['y']=-this[_0x2900('0x131')]+this[_0x2900('0x131')]*0x2/0x5,this['_character'][_0x2900('0x2d')]()!==0x1&&(_0x706408['y']+=0x1);},Sprite_Character['prototype'][_0x2900('0xf1')]=function(){if(!this[_0x2900('0xfa')])return 0x0;const _0x2a88b7=this['_character']['getEventIconData']();return _0x2a88b7?_0x2a88b7[_0x2900('0xd3')]||0x0:0x0;},VisuMZ[_0x2900('0x306')][_0x2900('0x413')]=Sprite_Balloon['prototype'][_0x2900('0xa9')],Sprite_Balloon['prototype'][_0x2900('0xa9')]=function(_0x4f18d7,_0x62402c){VisuMZ[_0x2900('0x306')][_0x2900('0x413')][_0x2900('0x302')](this,_0x4f18d7,_0x62402c);if(VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x61')][_0x2900('0x126')]){if(_0x2900('0x300')!==_0x2900('0x300')){function _0x3f3b77(){if(_0x138e50['isAdvancedVariable'](_0x149740))return this['advancedValue'](_0x670f1e);else return _0xe3f7c1[_0x2900('0x317')](_0x570a45)?this['selfValue'](_0x462daa):_0x3a33aa[_0x2900('0x306')]['Game_Variables_value'][_0x2900('0x302')](this,_0x3f5936);}}else this[_0x2900('0x387')]['_character'][_0x2900('0x15d')](_0x62402c,this[_0x2900('0xd5')]);}},VisuMZ['EventsMoveCore'][_0x2900('0x218')]=Sprite_Balloon['prototype']['updatePosition'],Sprite_Balloon[_0x2900('0x133')]['updatePosition']=function(){VisuMZ[_0x2900('0x306')][_0x2900('0x218')]['call'](this),this['updateVS8BalloonOffsets']();},Sprite_Balloon[_0x2900('0x133')][_0x2900('0x2cb')]=function(){this[_0x2900('0x387')]['_character']['isSpriteVS8dir']()&&(this['x']+=VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x61')][_0x2900('0x3ad')],this['y']+=VisuMZ[_0x2900('0x306')]['Settings']['VS8'][_0x2900('0x2b6')]);},VisuMZ[_0x2900('0x306')][_0x2900('0x13e')]=Spriteset_Map[_0x2900('0x133')][_0x2900('0x335')],Spriteset_Map['prototype'][_0x2900('0x335')]=function(){VisuMZ[_0x2900('0x306')][_0x2900('0x13e')][_0x2900('0x302')](this),this[_0x2900('0xea')]();},VisuMZ[_0x2900('0x306')][_0x2900('0x2ef')]=Spriteset_Map[_0x2900('0x133')][_0x2900('0x3dc')],Spriteset_Map[_0x2900('0x133')][_0x2900('0x3dc')]=function(){VisuMZ[_0x2900('0x306')]['Spriteset_Map_createShadow']['call'](this),this[_0x2900('0x284')]();},Spriteset_Map[_0x2900('0x133')][_0x2900('0x284')]=function(){if(!VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')]['Movement'][_0x2900('0x5c')])return;for(const _0x3be3f9 of this['_characterSprites']){this[_0x2900('0x3ef')](_0x3be3f9);}},Spriteset_Map[_0x2900('0x133')][_0x2900('0x3ef')]=function(_0x2eb734){_0x2eb734[_0x2900('0x1a')]=new Sprite(),_0x2eb734[_0x2900('0x1a')][_0x2900('0xe8')]=_0x2eb734[_0x2900('0xfa')][_0x2900('0x123')](),_0x2eb734[_0x2900('0x1a')][_0x2900('0x15a')]=ImageManager[_0x2900('0x19a')](_0x2eb734[_0x2900('0x1a')][_0x2900('0xe8')]),_0x2eb734[_0x2900('0x1a')][_0x2900('0x39a')]['x']=0.5,_0x2eb734['_shadowSprite'][_0x2900('0x39a')]['y']=0x1,_0x2eb734[_0x2900('0x1a')]['z']=0x0,this['_tilemap']['addChild'](_0x2eb734[_0x2900('0x1a')]);},Spriteset_Map[_0x2900('0x133')]['hideShadows']=function(){if(!VisuMZ['EventsMoveCore'][_0x2900('0x3e0')][_0x2900('0x16b')]['ShowShadows'])return;for(const _0x20b1e7 of this[_0x2900('0x18')]){this[_0x2900('0x168')][_0x2900('0x1ba')](_0x20b1e7[_0x2900('0x1a')]);}},Spriteset_Map[_0x2900('0x133')][_0x2900('0xea')]=function(){this['_labelWindows']=[];for(const _0x466c7e of $gameMap[_0x2900('0x30d')]()){this[_0x2900('0x9b')](_0x466c7e);}},Spriteset_Map[_0x2900('0x133')]['createLabelWindowForTarget']=function(_0x226558){if(!this[_0x2900('0x3cf')](_0x226558))return;const _0x12acf3=new Window_EventLabel(_0x226558);_0x12acf3['z']=0x8,_0x12acf3['spriteId']=Sprite[_0x2900('0x39')]++,this[_0x2900('0x168')]['addChild'](_0x12acf3),this[_0x2900('0xc3')][_0x2900('0x315')](_0x12acf3);},Spriteset_Map[_0x2900('0x133')]['isTargetEventValidForLabelWindow']=function(_0x58c783){const _0x1345df=_0x58c783['event']();if(_0x1345df[_0x2900('0x116')][_0x2900('0x89')](/<LABEL:[ ](.*?)>/i))return!![];if(_0x1345df[_0x2900('0x116')]['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x1b51d9 of _0x1345df[_0x2900('0x2cc')]){let _0x2022d7='';for(const _0x5835d7 of _0x1b51d9['list']){[0x6c,0x198][_0x2900('0x3fe')](_0x5835d7[_0x2900('0x1ae')])&&(_0x2022d7+=_0x5835d7[_0x2900('0x416')][0x0]);}if(_0x2022d7[_0x2900('0x89')](/<LABEL:[ ](.*?)>/i))return!![];if(_0x2022d7[_0x2900('0x89')](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x2900('0x121')==='BoTYU')return!![];else{function _0x388f96(){if(_0x4e6240)this[_0x2900('0x3af')](_0x39dcc0['x'],_0x1346d1['y']);}}}}return![];},Spriteset_Map[_0x2900('0x133')][_0x2900('0xba')]=function(_0x1b6704){this[_0x2900('0x18')]=this[_0x2900('0x18')]||[];const _0x3cf816=new Sprite_Character(_0x1b6704);this[_0x2900('0x18')][_0x2900('0x315')](_0x3cf816),this[_0x2900('0x168')][_0x2900('0x7')](_0x3cf816),this[_0x2900('0x3ef')](_0x3cf816),this[_0x2900('0x9b')](_0x1b6704),_0x3cf816[_0x2900('0x372')]();},VisuMZ[_0x2900('0x306')][_0x2900('0x147')]=Window_Message[_0x2900('0x133')][_0x2900('0x2f8')],Window_Message[_0x2900('0x133')][_0x2900('0x2f8')]=function(){$gameMessage[_0x2900('0x29c')](),VisuMZ[_0x2900('0x306')][_0x2900('0x147')][_0x2900('0x302')](this),$gameTemp[_0x2900('0x213')]();},VisuMZ[_0x2900('0x306')][_0x2900('0x292')]=Window_ScrollText[_0x2900('0x133')]['startMessage'],Window_ScrollText[_0x2900('0x133')][_0x2900('0x2f8')]=function(){$gameMessage[_0x2900('0x29c')](),VisuMZ[_0x2900('0x306')][_0x2900('0x292')][_0x2900('0x302')](this),$gameTemp[_0x2900('0x213')]();};function Window_EventLabel(){this['initialize'](...arguments);}Window_EventLabel[_0x2900('0x133')]=Object[_0x2900('0x3b5')](Window_Base[_0x2900('0x133')]),Window_EventLabel['prototype'][_0x2900('0x28d')]=Window_EventLabel,Window_EventLabel[_0x2900('0x133')]['initialize']=function(_0x21154b){this[_0x2900('0x25')]=_0x21154b;const _0x2106d3=new Rectangle(0x0,0x0,Graphics[_0x2900('0x26')]/0x4,this[_0x2900('0x24b')](0x1));Window_Base[_0x2900('0x133')][_0x2900('0x41a')][_0x2900('0x302')](this,_0x2106d3),this[_0x2900('0x3c4')](0x2),this[_0x2900('0x5b')]='';},Window_EventLabel[_0x2900('0x133')][_0x2900('0x372')]=function(){Window_Base[_0x2900('0x133')]['update'][_0x2900('0x302')](this),this[_0x2900('0x27f')](),this[_0x2900('0x1c6')](),this[_0x2900('0x4a')](),this[_0x2900('0x363')]();},Window_EventLabel['prototype'][_0x2900('0x27f')]=function(){if(this[_0x2900('0x25')][_0x2900('0x11f')]()!==this['_text']){if(_0x2900('0x9e')===_0x2900('0x9e'))this['_text']=this[_0x2900('0x25')][_0x2900('0x11f')](),this[_0x2900('0x172')]();else{function _0x2afd4e(){_0x418cc0['removeTemporaryMapSpawnedEvents'](_0x5c3d7c);}}}},Window_EventLabel[_0x2900('0x133')][_0x2900('0x1c6')]=function(){this[_0x2900('0xe1')]['x']=0x1/$gameScreen[_0x2900('0x140')](),this[_0x2900('0xe1')]['y']=0x1/$gameScreen['zoomScale']();},Window_EventLabel[_0x2900('0x133')][_0x2900('0x4a')]=function(){const _0x2e5874=SceneManager[_0x2900('0x21b')]['_spriteset'][_0x2900('0xed')](this[_0x2900('0x25')]);this['x']=Math[_0x2900('0x2ea')](this[_0x2900('0x25')]['screenX']()-Math[_0x2900('0x64')](this['width']*this['scale']['x']/0x2)),this['x']+=this[_0x2900('0x25')][_0x2900('0x164')][_0x2900('0x152')],this['y']=this[_0x2900('0x25')][_0x2900('0x3ba')]()-_0x2e5874['height'],this['y']+=Math[_0x2900('0x2ea')]($gameSystem[_0x2900('0x278')]()*0.5),this['y']-=Math[_0x2900('0x2ea')](this['height']*this['scale']['y']),this['y']+=this[_0x2900('0x25')][_0x2900('0x164')][_0x2900('0x1f3')];},Window_EventLabel[_0x2900('0x133')]['updateOpacity']=function(){if(this['isLabelVisible']()){if(_0x2900('0xef')!==_0x2900('0xef')){function _0x373632(){this[_0x2900('0x164')][_0x2900('0x247')]=_0x8a7569(_0x5841c4['$1']);}}else this[_0x2900('0x319')]+=this[_0x2900('0x92')]();}else SceneManager[_0x2900('0x21b')][_0x2900('0x2b')]>0x0?this[_0x2900('0x319')]=0x0:this['contentsOpacity']-=this['opacitySpeed']();},Window_EventLabel[_0x2900('0x133')][_0x2900('0x2dc')]=function(){if(!$gameSystem[_0x2900('0x3a6')]())return![];if(this[_0x2900('0x25')]?.[_0x2900('0x141')])return![];if(SceneManager['_scene'][_0x2900('0x2b')]>0x0)return![];const _0x5a17a7=$gamePlayer['x'],_0x14b44c=$gamePlayer['y'],_0x5b846e=this['_event']['x'],_0x36404f=this[_0x2900('0x25')]['y'];if($gameMap[_0x2900('0x3c1')](_0x5a17a7,_0x14b44c,_0x5b846e,_0x36404f)>this[_0x2900('0x25')][_0x2900('0x151')]())return![];return!![];},Window_EventLabel[_0x2900('0x133')][_0x2900('0x92')]=function(){return VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x1bf')][_0x2900('0x2a6')];},Window_EventLabel['prototype']['resizeWindow']=function(){const _0x8b8fe6=this['textSizeEx'](this[_0x2900('0x5b')]);this['width']=_0x8b8fe6[_0x2900('0xe')]+($gameSystem[_0x2900('0x278')]()+this[_0x2900('0x379')]())*0x2,this[_0x2900('0x131')]=Math['max'](this[_0x2900('0x32')](),_0x8b8fe6[_0x2900('0x131')])+$gameSystem[_0x2900('0x278')]()*0x2,this[_0x2900('0x9f')]();},Window_EventLabel[_0x2900('0x133')]['lineHeight']=function(){return VisuMZ[_0x2900('0x306')][_0x2900('0x3e0')][_0x2900('0x1bf')][_0x2900('0x1aa')];},Window_EventLabel[_0x2900('0x133')][_0x2900('0x3e7')]=function(){Window_Base[_0x2900('0x133')][_0x2900('0x3e7')][_0x2900('0x302')](this),this[_0x2900('0x378')][_0x2900('0x2db')]=this[_0x2900('0x285')]();},Window_EventLabel[_0x2900('0x133')][_0x2900('0x285')]=function(){return VisuMZ[_0x2900('0x306')]['Settings'][_0x2900('0x1bf')][_0x2900('0x15f')];},Window_EventLabel[_0x2900('0x133')][_0x2900('0x172')]=function(){this['resizeWindow'](),this[_0x2900('0x378')][_0x2900('0xcb')]();const _0x5d7a60=this['_text'][_0x2900('0x1c3')](/[\r\n]+/);let _0x51c5a7=0x0;for(const _0x39e96d of _0x5d7a60){const _0x4df6a5=this[_0x2900('0x87')](_0x39e96d),_0x2b07b0=Math[_0x2900('0x64')]((this[_0x2900('0x71')]-_0x4df6a5[_0x2900('0xe')])/0x2);this[_0x2900('0x37c')](_0x39e96d,_0x2b07b0,_0x51c5a7),_0x51c5a7+=_0x4df6a5[_0x2900('0x131')];}},Window_EventLabel[_0x2900('0x133')]['processDrawIcon']=function(_0x2f5449,_0x1cfd08){_0x1cfd08[_0x2900('0xbb')]&&this['drawIcon'](_0x2f5449,_0x1cfd08['x']+0x2,_0x1cfd08['y']),_0x1cfd08['x']+=Math[_0x2900('0x55')](this['iconSize'](),ImageManager[_0x2900('0xa8')])+0x4;},Window_EventLabel[_0x2900('0x133')][_0x2900('0xb3')]=function(_0x419de9,_0x5bafa7,_0x1ae5ad){const _0x45a07a=ImageManager[_0x2900('0x19a')](_0x2900('0x76')),_0x5a141a=ImageManager['iconWidth'],_0x1c2d47=ImageManager[_0x2900('0x1c9')],_0x3e331e=_0x419de9%0x10*_0x5a141a,_0x140e71=Math['floor'](_0x419de9/0x10)*_0x1c2d47,_0x20caf0=Math['min'](this[_0x2900('0x309')]()),_0x100488=Math[_0x2900('0x55')](this[_0x2900('0x309')]());this['contents']['blt'](_0x45a07a,_0x3e331e,_0x140e71,_0x5a141a,_0x1c2d47,_0x5bafa7,_0x1ae5ad,_0x20caf0,_0x100488);},Window_EventLabel[_0x2900('0x133')][_0x2900('0x309')]=function(){return VisuMZ['EventsMoveCore'][_0x2900('0x3e0')][_0x2900('0x1bf')][_0x2900('0x155')];};