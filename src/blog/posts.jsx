import React from 'react'
import { Link } from 'react-router-dom'

// Blog registry — the single source of truth for the EMKE blog.
//
// To publish a post, append an object here. Everything else is automatic:
// it appears on /blog, gets its own prerendered /blog/<slug> page with meta
// tags, shows the Blog link in the navbar, and is added to sitemap.xml at
// build time. While this list is empty, /blog is prerendered with noindex
// and the navbar hides the Blog link.
//
// Shape:
// {
//   slug: 'url-safe-slug',            // becomes /blog/<slug>
//   title: 'Post Title',              // page <title> + card heading
//   description: 'One-two sentences', // meta description + card text
//   date: '2026-07-10',               // YYYY-MM-DD, also sitemap lastmod
//   readingMinutes: 6,
//   body: (
//     <>
//       <p>Paragraphs as JSX. Use h2/h3 for sections.</p>
//     </>
//   ),
// }

export const posts = [
  {
    slug: 'how-to-take-progress-photos',
    title: 'How to Take Progress Photos That Actually Show Change (Trackr Guide)',
    description:
      'A practical guide on how to take progress photos: lighting, angles, poses, and frequency that make real change visible — plus the mistakes that hide it.',
    date: '2026-07-08',
    readingMinutes: 8,
    body: (
      <>
        <p>
          Most progress photos fail before the shutter ever clicks. Different lighting, a
          different mirror, a slightly different angle — and suddenly you can't tell whether
          you lost fat or just stood closer to the window. Then you compare two photos taken
          four weeks apart, see nothing, and conclude the training isn't working. Often it
          is working. The photos just weren't taken in a way that could show it.
        </p>
        <p>
          This guide covers how to take progress photos properly: the setup, the poses, how
          often to shoot, and how to actually read what you see. None of it requires
          equipment beyond the phone you already own. It just requires consistency, which is
          harder than it sounds and exactly why most people get it wrong.
        </p>

        <h2>Why photos beat the scale</h2>
        <p>
          The scale gives you one number, and that number is noisy. Water, glycogen, sodium,
          what you ate last night, where you are in your cycle — day to day, your weight can
          swing by a kilogram or more without any real change in body composition. Worse,
          the scale can't tell the difference between losing fat and losing muscle, or
          between gaining muscle and gaining fat.
        </p>
        <p>
          Photos can. If you're in a recomposition phase — building muscle while losing fat —
          the scale might not move for two months while your body visibly changes shape.
          Waistline tighter, shoulders rounder, the vague outline of an ab. Without photos,
          that entire phase reads as "no progress" and people quit right when things are
          working. The photo is the record that keeps you honest in both directions: it
          shows change the scale hides, and it refuses to flatter you when nothing has
          actually changed.
        </p>

        <h2>The one rule: control every variable except your body</h2>
        <p>
          A progress photo is a before-and-after experiment, and your body is the only
          variable you want changing between shots. Everything else — light, angle,
          distance, clothing, pose, time of day — needs to stay fixed. Every variable you
          let drift becomes noise, and after a few weeks the noise is louder than the
          signal.
        </p>

        <h3>Lighting: overhead, consistent, never a window</h3>
        <p>
          Lighting is the biggest offender. Photographers manipulate light to create or
          erase definition all the time — harsh overhead light carves out abs that
          soft frontal light completely flattens. If your week-one photo was taken in soft
          morning window light and your week-eight photo under a bathroom bulb, you're
          comparing lighting setups, not bodies.
        </p>
        <p>
          Pick one room with a consistent artificial light source, ideally overhead, and use
          it every time. Close the curtains so daylight can't interfere — daylight changes
          with weather, season, and hour, and you can't control any of those. Artificial
          light is boringly repeatable, which is exactly what you want.
        </p>

        <h3>Angle and distance: mark the spot</h3>
        <p>
          Prop your phone against the same shelf or use a small tripod, at roughly hip-to-
          chest height, and put a piece of tape on the floor where your feet go. It feels
          excessive until you see what a camera can do: shot from below you look taller and
          leaner; from above, shorter and heavier. Six inches closer to the lens and your
          proportions shift. A tape mark and a fixed phone position eliminate all of it in
          ten seconds.
        </p>
        <p>
          Use the rear camera with the timer, not a mirror selfie. Mirror shots lock one arm
          into holding the phone, add glass reflections and smudges, and make your framing
          depend on how you're standing that day. The timer frees both arms for proper poses
          and keeps the frame identical.
        </p>

        <h3>Clothing: same outfit, minimal coverage</h3>
        <p>
          Wear the same thing in every photo, and keep it minimal — shorts for men, shorts
          and a sports bra for women. Loose clothing hides the exact areas you're trying to
          track. And resist upgrading the outfit when you start feeling better about
          yourself; the moment you switch from baggy shorts to fitted ones, your photo
          history breaks in half. Same goes for grooming, tan, and anything else that
          changes how skin reads on camera.
        </p>

        <h3>Time of day: morning, before anything</h3>
        <p>
          Shoot in the morning, after the bathroom, before food or water. This is your
          least-inflated, most repeatable state. An evening photo after a salty dinner and a
          hard workout can look dramatically different from a morning photo of the same
          body. Morning-fasted is the standard because it's the one condition you can
          reproduce every single time.
        </p>

        <h2>The poses that actually tell you something</h2>
        <p>
          You don't need a bodybuilder's posing routine. Four shots cover almost everything:
        </p>
        <ul>
          <li>
            <strong>Front, relaxed.</strong> Arms slightly away from your sides, feet on the
            tape mark, breathing normally. Not sucked in, not pushed out — just standing.
            This is your most honest photo and the hardest one to take, because every
            instinct says to flex or straighten up. Don't.
          </li>
          <li>
            <strong>Side, relaxed.</strong> Turn ninety degrees, arms hanging naturally.
            This is where fat loss shows first for most people — the stomach profile changes
            before anything on the front view does.
          </li>
          <li>
            <strong>Back, relaxed.</strong> The view you never see and the one where back
            development, posture, and love handles live. Awkward to set up, which is why the
            timer matters.
          </li>
          <li>
            <strong>One flexed shot, if you want it.</strong> Front double biceps or
            whatever you like — but treat it as a bonus, always in addition to the relaxed
            set, and flex the same way each time. Flexed-only histories are unreliable
            because flexing is a skill that improves with practice, and better flexing looks
            like muscle you didn't gain.
          </li>
        </ul>
        <p>
          Keep your posture neutral in every shot: stand tall, shoulders where they normally
          sit, no sucking in the gut. The goal is a repeatable neutral, not your best angle.
          You're not posting these — you're collecting data.
        </p>

        <h2>How often: every two weeks is the sweet spot</h2>
        <p>
          Daily photos are a trap. Visible body composition change takes weeks, so daily
          comparisons show nothing but water fluctuation, and staring at nothing every
          morning erodes motivation fast. Monthly works but gives you thin data.
        </p>
        <p>
          Every two weeks hits the balance: enough time for real change to register, frequent
          enough to build a dense history. Put it on a recurring calendar slot — say, every
          other Sunday morning — so it becomes automatic rather than a mood-dependent
          decision. The people with useless photo histories aren't the ones who chose the
          wrong interval; they're the ones who shot whenever they happened to feel lean.
        </p>

        <h2>Reading your photos: muscle vs. fat, and the right comparisons</h2>
        <p>
          The first skill is patience with the timeline. Never compare this week to last
          week — compare today to six, eight, twelve weeks ago. Adjacent photos almost
          always look identical; that's normal and means nothing. The comparison that
          matters is the long jump.
        </p>
        <p>
          The second skill is knowing what each kind of change looks like. Fat loss shows up
          as sharper edges: the waistline in the side shot pulls in, the jawline tightens,
          existing muscle gets more visible even though it hasn't grown. Muscle gain shows
          up as changed silhouette: shoulders wider relative to the waist, legs filling the
          same shorts differently, the back photo getting broader. If your weight is flat
          but the side shot is shrinking while your shoulders look fuller, that's
          recomposition — the exact outcome the scale is structurally incapable of showing
          you.
        </p>
        <p>
          Pair photos with the scale rather than replacing it. Weight trend plus photo trend
          together tell you what's actually happening: weight down and photos unchanged over
          twelve weeks might mean muscle loss; weight flat and photos improving means keep
          doing exactly what you're doing.
        </p>

        <h2>The psychology: why this works when motivation doesn't</h2>
        <p>
          You see yourself in the mirror every day, which makes you the worst possible judge
          of your own gradual change. The brain normalizes slow shifts — it's the same
          reason you don't notice a child growing but a relative who visits twice a year
          does. Progress photos are that twice-a-year relative, on demand.
        </p>
        <p>
          This matters most in the middle stretch of any fitness effort — weeks six through
          sixteen, roughly — when novelty has worn off and results feel invisible. That's
          where most people quit. A side-by-side from week one is often the single strongest
          counterargument available, because it's not a feeling or a number; it's your own
          body, on record. Plenty of people who "saw no results" pull up their week-one
          photo and go quiet.
        </p>
        <p>
          It cuts the other way too, and that's just as valuable. If twelve weeks of photos
          genuinely show nothing, you don't need more motivation — you need to change the
          program or the diet. Photos convert vague frustration into a concrete decision.
        </p>

        <h2>Common mistakes that ruin photo histories</h2>
        <ul>
          <li>
            <strong>Changing the setup mid-journey.</strong> New apartment, new mirror, new
            lighting — and the history splits into incomparable eras. If you must move,
            rebuild the setup as closely as possible and note the change.
          </li>
          <li>
            <strong>Only shooting on good days.</strong> Skipping photo day because you feel
            bloated biases your entire record toward your best moments and makes real
            progress invisible. Shoot on schedule, regardless.
          </li>
          <li>
            <strong>Sucking in or subtly flexing "relaxed" shots.</strong> You're only lying
            to the one person the photos are for.
          </li>
          <li>
            <strong>Using filters or auto-enhancement.</strong> Turn off beauty modes and
            smart HDR adjustments if you can; they alter contrast and skin rendering
            unpredictably between shots.
          </li>
          <li>
            <strong>Letting photos rot in the camera roll.</strong> Progress photos buried
            between screenshots and dog pictures never get compared. If they're not
            organized and dated somewhere you can view them side by side, they may as well
            not exist.
          </li>
        </ul>

        <h2>Keeping the record in one place</h2>
        <p>
          That last mistake is the quiet killer, and it's the reason we built photos
          directly into Trackr. Each weight entry can carry a progress photo, so the photo
          and the number live on the same timeline — you scroll back through your history
          and see the week-one shot next to the week-one weight, then watch both move
          together. No digging through the camera roll, no guessing which photo was from
          which month.
        </p>
        <p>
          Whatever tool you use — Trackr, a dedicated album, a folder on your laptop — the
          requirement is the same: dated, organized, and viewable side by side. The system
          matters more than the app.
        </p>

        <h2>The checklist</h2>
        <ul>
          <li>Same room, artificial light, curtains closed</li>
          <li>Phone fixed at the same height, rear camera, timer</li>
          <li>Tape mark on the floor for your feet</li>
          <li>Same minimal outfit every time</li>
          <li>Morning, fasted, after the bathroom</li>
          <li>Front, side, and back — relaxed; flexed only as a bonus</li>
          <li>Every two weeks, on a scheduled day, good day or bad</li>
          <li>Compare across months, not weeks</li>
          <li>Store them dated and organized, next to your weight data</li>
        </ul>
        <p>
          Ten minutes every other week. That's the entire cost of a photographic record that
          will, at some point in the next few months, be the thing that keeps you going —
          or the thing that tells you, clearly and without drama, that it's time to adjust.
          Either way, you'll know. Which is the whole point of tracking anything.
        </p>
      </>
    ),
  },
  {
    slug: 'how-to-build-a-tracking-habit',
    title: 'How to Build a Tracking Habit That Sticks',
    description:
      'Most tracking habits die in week two. Here is a practical way to build one that lasts, starting with one metric and entries that take under 30 seconds.',
    date: '2026-07-10',
    readingMinutes: 6,
    body: (
      <>
        <p>
          Everyone starts tracking the same way. You download a new app in a burst of
          motivation and log five metrics before breakfast on day one.
        </p>
        <p>
          By week two the entries thin out. By week four the habit is gone, and the data you
          did collect tells you nothing, because four weeks of patchy logging is not enough
          to show a trend.
        </p>
        <p>
          The problem is almost never discipline. It is design. Most people build a tracking
          routine that only works on their most motivated days, then blame themselves when
          an ordinary Tuesday kills it. This guide is about building the opposite: a routine
          so small and so anchored to your existing day that quitting takes more effort than
          continuing.
        </p>

        <h2>Why tracking habits fail</h2>
        <p>
          Several separate habits usually get bundled into one. Measuring is one action and
          logging is another, and reviewing your results is a third with a completely
          different cost. When you try to do all of them daily, the heaviest one drags the
          rest down.
        </p>
        <p>
          There is also the perfectionism trap. Miss one day and the streak is broken. The
          chart has a gap. For a lot of people that gap feels like failure, so they stop
          looking at the chart, and then they stop logging at all.
        </p>
        <p>
          The fix for both is the same: shrink the habit until it survives your worst day,
          not just your best one.
        </p>

        <h2>Step 1: Track one thing, not five</h2>
        <p>
          Pick the single number that matters most for your current goal. Cutting weight?
          Track bodyweight. Building strength? Track your main lift. That is it for the
          first month.
        </p>
        <p>
          This feels too easy, which is exactly the point. A habit forms through repetition,
          and repetition only happens when the action is light enough to repeat on a
          stressful day, or on a morning when you would rather not know the number.
        </p>
        <p>
          Once the first metric is automatic, adding a second costs almost nothing. Adding
          five on day one costs you the whole habit.
        </p>

        <h2>Step 2: Anchor it to something you already do</h2>
        <p>
          A tracking habit that floats freely in your day will lose to whatever else is
          happening. A habit attached to an existing routine does not need to be remembered
          at all.
        </p>
        <p>
          The classic anchor for bodyweight is the morning bathroom visit: wake up, use the
          toilet, step on the scale, log it. Same time, same conditions, so the data stays
          comparable. For workout tracking, the anchor is the workout itself. You log the
          set during the rest period, not "later tonight," because later tonight does not
          exist.
        </p>
        <p>
          Write the anchor down as a sentence: "After I brush my teeth, I weigh in and log
          it." If you cannot phrase it that way, you do not have an anchor yet. You have an
          intention.
        </p>

        <h2>Step 3: Get each entry under 30 seconds</h2>
        <p>
          Time yourself once. Open the app or the notebook and enter the number. If that
          takes more than 30 seconds, the habit has a leak, and leaks compound daily.
        </p>
        <p>
          Common leaks are easy to find. Maybe your log asks for ten fields when you only
          care about one. Maybe your spreadsheet needs a laptop, so gym-day numbers sit in
          your head until they evaporate.
        </p>
        <p>
          Cut every field that is not your one metric. If your tool will not let you, change
          tools. This sounds drastic, but a tracking system you avoid opening is worth
          exactly nothing.
        </p>

        <h2>Step 4: Let the tool do the remembering</h2>
        <p>
          Here is the failure mode nobody warns you about: you stay consistent for months,
          and the record still ends up useless because the pieces do not connect. You scroll
          through old progress photos wondering what you weighed in each one. The answer is
          in a different app, on a different timeline, and matching them up by date is
          miserable.
        </p>
        <p>
          So pick tools that connect the dots for you. This is the exact problem Trackr was
          built around: every progress photo you take gets tagged with your current weight
          automatically, so the before-and-after record builds itself while you just show
          up.
        </p>
        <p>
          Whatever tool you use, the principle holds. Anything the system can remember for
          you, it should. Your job is the 30-second entry. The tool's job is everything
          after.
        </p>

        <h2>Step 5: Review weekly, not daily</h2>
        <p>
          Daily numbers are noisy. Bodyweight swings a kilo or more with water and food
          timing, and staring at that noise every morning is how people convince themselves
          nothing is working.
        </p>
        <p>
          Log daily, judge weekly. Pick one day, Sunday works, and look at the seven-day
          picture instead of any single reading. Weekly averages smooth out the noise and
          show the actual direction. This one change protects more tracking habits than any
          motivational trick, because it separates the act of logging from the emotion of
          the result.
        </p>

        <h2>What to do when you break the streak</h2>
        <p>
          You will miss a day. The habit does not die when you miss one. It dies when
          missing one turns into missing a week, because the gap starts to feel like a
          verdict.
        </p>
        <p>
          Use the two-day rule: never miss twice in a row. One missed day is a data point.
          Two is the start of a new habit, the habit of not tracking.
        </p>
        <p>
          And when you come back, do not backfill. Do not estimate what you weighed on the
          days you missed. Just log today. A record with honest gaps beats a record padded
          with guesses, and the fastest way back into rhythm is the next real entry, not an
          accounting exercise about the ones you skipped.
        </p>

        <h2>The 30-day version of this plan</h2>
        <p>Put simply, here is the whole system:</p>
        <ul>
          <li>
            <strong>Week 1:</strong> one metric tied to one anchor, with entries under 30
            seconds.
          </li>
          <li>
            <strong>Week 2:</strong> same, plus set your weekly review day.
          </li>
          <li>
            <strong>Week 3:</strong> expect a missed day. Apply the two-day rule and move
            on.
          </li>
          <li>
            <strong>Week 4:</strong> review the month. If the habit held, add a second
            metric. If it wobbled, shrink it again instead of pushing harder.
          </li>
        </ul>
        <p>
          Thirty days of one boring number beats ninety days of ambitious plans you
          abandoned. The boring number compounds.
        </p>

        <h2>FAQ</h2>
        <h3>How long does it take to build a tracking habit?</h3>
        <p>
          Research on habit formation puts the range anywhere from three weeks to several
          months, and the honest answer is that it depends on how small the habit is. A
          20-second weigh-in anchored to your morning routine can feel automatic within a
          month. A 10-minute logging session rarely becomes automatic at all.
        </p>
        <h3>Should I track every day or is a few times a week enough?</h3>
        <p>
          For bodyweight, daily entries reviewed weekly give you the cleanest trend, because
          averages need data points. For workouts, track every session you do, whether that
          is twice a week or five times. The rule is to match tracking frequency to the
          thing itself, then judge the results on a weekly rhythm either way.
        </p>
        <h3>What should I do after missing a whole week?</h3>
        <p>
          Log today and say nothing to yourself about the gap. Do not backfill, and do not
          add extra metrics to compensate. If a whole week slipped, the habit was probably
          too big, so shrink it: fewer fields and a stronger anchor.
        </p>
        <p>
          If you want a tracker that handles the remembering for you, with progress photos
          that tag themselves with your weight,{' '}
          <Link to="/trackr">Trackr</Link> is on the App Store and Google Play. Start with
          one metric. The rest can wait.
        </p>
      </>
    ),
  },
  {
    slug: 'trackr-vs-spreadsheet-daily-tracking',
    title: 'Trackr vs. Spreadsheet: Which Is Better for Daily Tracking?',
    description:
      'An honest comparison of Trackr and spreadsheets for daily fitness tracking. The spreadsheet is genuinely better at some things. Here is where each one wins.',
    date: '2026-07-10',
    readingMinutes: 5,
    body: (
      <>
        <p>
          We build Trackr, so you would expect this comparison to end with "download the
          app." It mostly does, but not entirely, because spreadsheets are genuinely good at
          things no fitness app will ever match. If you have been tracking your weight or
          your lifts in Google Sheets for two years and it works, some of what follows will
          confirm you were right.
        </p>
        <p>
          The real question is narrower than "which tool is better." It is: which tool
          survives daily use, at the gym or half-asleep on the scale, on a day when
          motivation is gone? That is where the two options separate.
        </p>

        <h2>The short answer</h2>
        <p>
          A spreadsheet wins on flexibility and control. Trackr wins on friction, and
          friction is what decides whether you are still tracking in month three. If you
          love building systems and actually maintain them, keep the sheet. If your last
          three spreadsheets died quietly by week four, the app is the better bet.
        </p>
        <p>Here are the honest details.</p>

        <h2>What a spreadsheet genuinely does better</h2>
        <h3>Total flexibility</h3>
        <p>
          A spreadsheet tracks anything. Weight next to sleep hours next to your grocery
          budget, in whatever layout you invent. No app matches that, Trackr included.
          Trackr is built for fitness, meaning your bodyweight and photos plus your
          performance on specific lifts. If your tracking system spans your whole life, a
          sheet is the right container for the rest of it.
        </p>
        <h3>Custom analysis</h3>
        <p>
          Formulas are a superpower. Want a 7-day rolling average with a custom smoothing
          window, or a chart comparing your cut this year against last year? A spreadsheet
          does it exactly your way. Apps give you the views their designers chose. For most
          people those views are enough, but "most people" is not everyone.
        </p>
        <h3>A file you own forever</h3>
        <p>
          A spreadsheet is a file. You can back it up anywhere and open it in twenty years.
          That kind of portability is a real argument, and pretending otherwise would be
          dishonest. It is worth saying that Trackr keeps your data private and on your
          device rather than mining it, with cloud backup as a premium option, but a plain
          file you control is still the simplest form of ownership there is.
        </p>

        <h2>Where spreadsheets fall apart for daily tracking</h2>
        <h3>Friction at the moment of entry</h3>
        <p>
          The whole game of daily tracking is the ten seconds after you step off the scale
          or finish a set. A spreadsheet on your phone means finding the file, waiting for
          it to load, pinching to zoom into the right cell, and fat-fingering the wrong row.
          Every one of those steps is a chance to say "I'll do it later." Later is where
          tracking habits go to die.
        </p>
        <h3>Photos do not fit in cells</h3>
        <p>
          Progress photos are the most convincing record of a body transformation, and
          spreadsheets have no good place for them. So photos end up in your camera roll
          while numbers live in the sheet, and six months later you are scrolling through
          hundreds of pictures trying to remember what you weighed in each one. Trackr
          closes that gap automatically: every progress photo is tagged with your current
          weight, so the before-and-after pairs build themselves.
        </p>
        <h3>No feedback loop</h3>
        <p>
          A sheet records. It does not respond. There is no streak telling you that you have
          logged twelve weeks straight, and nothing flags a personal record when your bench
          press finally moves. You can build some of that with formulas, and a few people
          do. Most never will, and the motivational loop is a bigger part of long-term
          consistency than it sounds.
        </p>

        <h2>What Trackr actually does</h2>
        <p>To keep the comparison concrete, here is what is in the app, without embellishment:</p>
        <ul>
          <li>
            <strong>Weight tracking over time</strong>, with your bodyweight history in one
            timeline.
          </li>
          <li>
            <strong>Progress photos tagged with your weight automatically</strong>, for real
            before-and-after comparisons.
          </li>
          <li>
            <strong>Exercise tracking with personal records</strong>, across lifts like
            bench press, squat, deadlift, and overhead press.
          </li>
          <li>
            <strong>Workout history and streaks</strong>, so consistency is visible at a
            glance.
          </li>
          <li>
            <strong>An overall score</strong> that rolls your consistency and progress,
            together with your achievements, into one number you can watch move.
          </li>
        </ul>
        <p>
          It runs on iOS and Android, and your data stays private on your device. Cloud
          backup is there for premium users.
        </p>
        <p>
          Notice what is missing from that list: macros, for example, or custom life
          metrics. Trackr does not try to be everything. If your tracking needs are mostly
          your weight and photos plus how your lifts are moving, that focus is a feature. If
          they are broader, see the verdict below.
        </p>

        <h2>The verdict, by person</h2>
        <p>
          <strong>Keep the spreadsheet if</strong> you track many unrelated things in one
          system, or you have an entrenched sheet with years of history that is still
          getting daily entries. Do not fix what works.
        </p>
        <p>
          <strong>Use Trackr if</strong> your entries happen on your phone at the gym or on
          the scale, or your past attempts at tracking died from friction rather than lack
          of interest.
        </p>
        <p>
          <strong>Use both if</strong> you want the app for daily capture and a spreadsheet
          for occasional deep analysis. Plenty of careful trackers run exactly this split:
          the phone does the logging, the sheet does the quarterly review.
        </p>

        <h2>FAQ</h2>
        <h3>Can I use Trackr and a spreadsheet together?</h3>
        <p>
          Yes, and it is a sensible setup. Let the app handle the daily grind where friction
          matters most, then keep a sheet for any custom analysis or non-fitness metrics you
          care about. The mistake is making the spreadsheet the daily entry point when your
          entries happen away from a desk.
        </p>
        <h3>Is my data safe in an app compared to my own file?</h3>
        <p>
          That is a fair concern. Trackr stores your data privately on your device by
          default, and cloud backup is available as a premium feature rather than a silent
          default. A spreadsheet file you back up yourself is still the most direct form of
          control, so if that matters more to you than convenience, the sheet is a
          legitimate choice.
        </p>
        <h3>Is a spreadsheet enough for tracking weight loss?</h3>
        <p>
          Honestly, yes, if you use it. A weekly-averaged weight column and a chart cover
          the analytical side of a cut completely. The reason people fail with spreadsheet
          weight tracking is rarely the tool's math. It is the daily entry friction, and
          that is the one thing you should judge any tracking setup on before anything else.
        </p>
        <p>
          If the friction argument sounds like your last three abandoned sheets, try{' '}
          <Link to="/trackr">Trackr</Link> on the App Store or Google Play and give it the
          same 30 days you gave the spreadsheet. Keep whichever one you are still using at
          the end.
        </p>
      </>
    ),
  },
]
