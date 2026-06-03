<!-- copy start-->
    <div id="preload" class="hidden"></div>
    <div class="container my-5 p-5 cool_page">
        <div id="setup">
            <div id="load"></div>
            <div class="row win">
                <h1 id="title" class="DOWNHEEL"></h1>

                <p>
                    Remember The Princess? After all her spectral adventures, ghostly inconveniences,
                    and deeply questionable career choices, her royal butt deserves some treatment.
                    On her way from <em>Hauntosphere</em> back to her beloved castle, <em>Castle Creep</em>,
                    she stopped for a little mountain recreation known as DownHeel, or, among
                    medical professionals, ButtBoarding&reg; (the term invented by Trina Selič).
                </p>

                <p>
                    The sport is simple, elegant, and only slightly suicidal. You place your royal bum
                    on a snowy slope, point your heels downward, surrender your dignity to gravity,
                    and slide faster and faster toward the finish line. Ideally, you arrive alive.
                    Traditionally, this is considered the polite way to finish.
                </p>

                <p>
                    Steering is recommended, braking is encouraged, and avoiding walls is generally
                    seen as a sign of intelligence. Rocks, trees, corners, suspicious blood stains,
                    and sudden architectural decisions may appear along the way. Some of them are
                    decorative. Some of them used to be players.
                </p>

                <p>
                    Your mission is to guide The Princess safely down the slope as fast as possible.
                    If you succeed, glory awaits. If you fail, the mountain gets another red mark,
                    the wall gets another compliment, and The Princess gets another reason to insult
                    your entire bloodline.
                </p>

                <div>
                    <p>
                        Choose the name by which you want to be remembered in the best results:
                        <input type="text" id="princess" value="The Princess" maxlength="12">
                    </p>
                </div>
            </div>
        </div>

        <div class="row my-5">
            <div id="debug" class="section">
                <fieldset>
                    <legend>
                        Engine versions:
                    </legend>
                    <p>My custom game engine ENGINE is made from following sub-modules:</p>
                    ENGINE: <span id="engine_version"></span><br>
                    GRID: <span id="grid_version"></span><br>
                    MAZE: <span id="maze_version"></span><br>
                    IAM: <span id="iam_version"></span><br>
                    Prototype LIB: <span id="lib_version"></span><br>
                    WebGL: <span id="webgl_version"></span><br>
                    MAP Tools: <span id="maptools_version"></span><br>
                    SPEECH: <span id="speech_version"></span><br>
                    <br>
                    <p id="speech_sources"></p>
                </fieldset>
            </div>
        </div>


        <div>
            <p id="buttons">
            <div>
                <input type='button' id='pause' value='Pause Game [F4]' disabled="disabled">
                <input type='button' id='toggleHelp' value='Show/Hide Instructions'>
                <input type='button' id='toggleAbout' value='About'>
                <input type='button' id='toggleVersion' value='Version'>
            </div>
            </p>
        </div>

        <div id="help" class="section">
            <fieldset>

                <legend>
                    Survival guide:
                </legend>
                <div class="row">
                    <p>Braking may help preserve the structural integrity of your skull.</p>
                    <p>Brakes become less effective on steeper slopes, because gravity is a bitch.</p>
                    <p>Brake while you still have time, not while you are busy becoming dead.</p>
                    <p>Turning uphill can also reduce speed, assuming you still believe in steering.</p>
                </div>

                <div class="row my-3">

                    <p><strong>KEYS:</strong></p>

                    <p><kbd>W</kbd> ... start sliding, hold to start faster</p>
                    <p><kbd>S</kbd> ... break</p>
                    <p><kbd>Q</kbd> ... turn left</p>
                    <p><kbd>E</kbd> ... turn right</p>
                    <p><kbd>F4</kbd> ... pause/resume game</p>

                </div>

            </fieldset>
        </div>

        <div id="about" class="section">
            <fieldset>
                <legend>
                    About:
                </legend>
                <div class="row">
                    <div class="col-12 col-lg-3 my-2 d-flex align-items-center justify-content-center">
                        <img src="/Images/OlympicSkier.webp" alt="Olympic Skier" class="img-fluid border-dark rounded-2"
                            title="Olympic Skier">
                    </div>

                    <div class="col-12 col-lg-6 my-2">
                        <p>
                            In my formative years, I spent a suspicious amount of time playing classic C64 skiing gems
                            like
                            <a href="https://www.c64-wiki.com/wiki/Olympic_Skier" target="_blank"
                                rel="noopener noreferrer">Olympic Skier</a>
                            and
                            <a href="https://www.lemon64.com/game/slalom" target="_blank"
                                rel="noopener noreferrer">Slalom</a>,
                            also known as <em>Ski64</em>. Decades later, instead of doing something sensible with my
                            life, I decided to
                            recreate some of that downhill chaos in 3D, with a princess, procedural mountain topology,
                            fixed terrain
                            sections, and a brave attempt to understand non-cubic world geometry without crying into the
                            keyboard.
                        </p>

                        <p>
                            The result is a game about speed, survival, questionable royal decision-making, and the
                            aerodynamic
                            properties of a princess sliding down a mountain on her butt.
                        </p>
                    </div>

                    <div class="col-12 col-lg-3 my-2 d-flex align-items-center justify-content-center">
                        <img src="/Images/Slalom.webp" alt="Slalom" class="img-fluid border-dark rounded-2"
                            title="Slalom, Ski64">
                    </div>
                </div>
            </fieldset>
        </div>

        <p class="version terminal" id="version"></p>
        <p id="conv" class="warning">Loading insane amount of data ... just a minute or two ... be patient
            ... I hope you have good internet speed ... this game is huge (###Mb)!
        </p>
    </div>

    <div class="container">
        <div id="game" class="winTrans"></div>
        <div id="bottom" class="cb" style="margin-top: 1024px"></div>
        <div id="temp" class="hidden"></div>
        <div id="temp2" class="hidden"></div>
    </div>
    <!-- COPY END -->