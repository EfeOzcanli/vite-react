import React from 'react'

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
]
