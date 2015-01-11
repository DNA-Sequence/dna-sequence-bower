(function(dna) {

    QUnit.test( "dna sequence process Global", function( assert ) {
        try{
            console.log("\n**********************\n");
            var teste2 = new dna.InputAlignGlobalLocal();

            teste2.id = 2;
            teste2.typeElement = dna.TypeElement.NUCLEOTIDE;
//            teste2.sequenceA = "TTTTGAGGTCATCTGTTGTTCAAACCTCWTATGGTGAAATTTTTGCTAAACATAGAGAACCAAATTTGGAAATTATTCGTGAGGTTGTTGATTCCAAACATATTGTTTTTGATGTGTTGGCACAATTCTTAATCAATCCAGACCCATGGGTTGCCATTGCTGCCGCTGAAGTTTATGTCAGACGTTCATACCGTGCTTATGATTTGGGTACAATTGAATATCATGTTAATGACAGACTTCCTATTGTTGAATGGAAATTCAAGTTGGCTAATATGGGAGCYGCTGGTGTAAACGATGCTCAACAGGCTGCTGCTGCCGGTGGCGATGATTCGACATCTATGAAACATGCAGCTTCTGTGTCTGATTTGACCTTTGTTGTTGATTCTAAAACCGAGCATTCCACAAGA";
//            teste2.sequenceB = "TTTTGAGGTCATCTGTTGTTCAAACCTCWTATGGTGAAATTTTTGCTAAACATAGAGAACCAAATTTGGAAATTATTCGTGAGGTTGTTGATTCCAAACATATTGTTTTTGATGTGTTGGCACAATTCTTAATCAATCCAGACCCATGGGTTGCCATTGCTGCCGCTGAAGTTTATGTCAGACGTTCATACCGTGCTTATGATTTGGGTACAATTGAATATCATGTTAATGACAGACTTCCTATTGTTGAATGGAAATTCAAGTTGGCTAATATGGGAGCYGCTGGTGTAAACGATGCTCAACAGGCTGCTGCTGCCGGTGGCGATGATTCGACATCTATGAAACATGCAGCTTCTGTGTCTGATTTGACCTTTGTTGTTGATTCTAAAACCGAGCATTCCACAAGA";

            teste2.sequenceA = "TTTTG";
            teste2.sequenceB = "TTGGA";

            teste2.methodSequencing = dna.MethodSequencing.GLOBAL;
            teste2.gap = -1;
            teste2.match = 2;
            teste2.misMatch = -2;


            var calculation = dna.CalculationFactory.createCalculation(teste2);

            calculation.calculationNode();
            calculation.findAligns();

            assert.ok(calculation.getOutputAlign(), "Find Aligns");

            var c = dna.Connected;
            var inputResultAlign = new dna.InputResultAlign();
            inputResultAlign.connecteds = [c.N, c.NW, c.W];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.N, c.NW, c.W]" );

            inputResultAlign.connecteds = [c.N, c.W, c.NW];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.N, c.W, c.NW]" );

            inputResultAlign.connecteds = [c.NW, c.N, c.W];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.NW, c.N, c.W]" );

            inputResultAlign.connecteds = [c.NW, c.W, c.N];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.NW, c.W, c.N]" );

            inputResultAlign.connecteds = [c.W, c.NW, c.W];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.W, c.NW, c.W]" );

            inputResultAlign.connecteds = [c.W, c.N, c.NW];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.W, c.N, c.NW]" );

        } catch (e){
            console.log(e);
            console.log(e.stack);
            assert.throws(function (){
                return "ERROR";
            }, e);
        }
    });

    QUnit.test( "dna sequence process Local", function( assert ) {
        try{
            console.log("\n**********************\n");
            var teste2 = new dna.InputAlignGlobalLocal();

            teste2.id = 2;
            teste2.typeElement = dna.TypeElement.NUCLEOTIDE;
//            teste2.sequenceA = "TTTTGAGGTCATCTGTTGTTCAAACCTCWTATGGTGAAATTTTTGCTAAACATAGAGAACCAAATTTGGAAATTATTCGTGAGGTTGTTGATTCCAAACATATTGTTTTTGATGTGTTGGCACAATTCTTAATCAATCCAGACCCATGGGTTGCCATTGCTGCCGCTGAAGTTTATGTCAGACGTTCATACCGTGCTTATGATTTGGGTACAATTGAATATCATGTTAATGACAGACTTCCTATTGTTGAATGGAAATTCAAGTTGGCTAATATGGGAGCYGCTGGTGTAAACGATGCTCAACAGGCTGCTGCTGCCGGTGGCGATGATTCGACATCTATGAAACATGCAGCTTCTGTGTCTGATTTGACCTTTGTTGTTGATTCTAAAACCGAGCATTCCACAAGA";
//            teste2.sequenceB = "TTTTGAGGTCATCTGTTGTTCAAACCTCWTATGGTGAAATTTTTGCTAAACATAGAGAACCAAATTTGGAAATTATTCGTGAGGTTGTTGATTCCAAACATATTGTTTTTGATGTGTTGGCACAATTCTTAATCAATCCAGACCCATGGGTTGCCATTGCTGCCGCTGAAGTTTATGTCAGACGTTCATACCGTGCTTATGATTTGGGTACAATTGAATATCATGTTAATGACAGACTTCCTATTGTTGAATGGAAATTCAAGTTGGCTAATATGGGAGCYGCTGGTGTAAACGATGCTCAACAGGCTGCTGCTGCCGGTGGCGATGATTCGACATCTATGAAACATGCAGCTTCTGTGTCTGATTTGACCTTTGTTGTTGATTCTAAAACCGAGCATTCCACAAGA";
            teste2.sequenceA = "TTTTG";
            teste2.sequenceB = "TTGGA";

            teste2.methodSequencing = dna.MethodSequencing.LOCAL;
            teste2.gap = -1;
            teste2.match = 2;
            teste2.misMatch = -2;

            var calculation = dna.CalculationFactory.createCalculation(teste2);

            calculation.calculationNode();
            calculation.findAligns();

            assert.ok(calculation.getOutputAlign(), "Find Aligns");

            var c = dna.Connected;
            var inputResultAlign = new dna.InputResultAlign();
            inputResultAlign.connecteds = [c.N, c.NW, c.W];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.N, c.NW, c.W]" );

            inputResultAlign.connecteds = [c.N, c.W, c.NW];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.N, c.W, c.NW]" );

            inputResultAlign.connecteds = [c.NW, c.N, c.W];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.NW, c.N, c.W]" );

            inputResultAlign.connecteds = [c.NW, c.W, c.N];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.NW, c.W, c.N]" );

            inputResultAlign.connecteds = [c.W, c.NW, c.W];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.W, c.NW, c.W]" );

            inputResultAlign.connecteds = [c.W, c.N, c.NW];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.W, c.N, c.NW]" );

        } catch (e){
            assert.throws(function (){
                return "ERROR";
            }, e);
        }
    });

    QUnit.test( "dna sequence process SemiGlobal", function( assert ) {
        try{
            console.log("\n**********************\n");
            var teste2 = new dna.InputAlignGlobalLocal();

            teste2.id = 2;
            teste2.typeElement = dna.TypeElement.NUCLEOTIDE;
//            teste2.sequenceA = "TTTTGAGGTCATCTGTTGTTCAAACCTCWTATGGTGAAATTTTTGCTAAACATAGAGAACCAAATTTGGAAATTATTCGTGAGGTTGTTGATTCCAAACATATTGTTTTTGATGTGTTGGCACAATTCTTAATCAATCCAGACCCATGGGTTGCCATTGCTGCCGCTGAAGTTTATGTCAGACGTTCATACCGTGCTTATGATTTGGGTACAATTGAATATCATGTTAATGACAGACTTCCTATTGTTGAATGGAAATTCAAGTTGGCTAATATGGGAGCYGCTGGTGTAAACGATGCTCAACAGGCTGCTGCTGCCGGTGGCGATGATTCGACATCTATGAAACATGCAGCTTCTGTGTCTGATTTGACCTTTGTTGTTGATTCTAAAACCGAGCATTCCACAAGA";
//            teste2.sequenceB = "TTTTGAGGTCATCTGTTGTTCAAACCTCWTATGGTGAAATTTTTGCTAAACATAGAGAACCAAATTTGGAAATTATTCGTGAGGTTGTTGATTCCAAACATATTGTTTTTGATGTGTTGGCACAATTCTTAATCAATCCAGACCCATGGGTTGCCATTGCTGCCGCTGAAGTTTATGTCAGACGTTCATACCGTGCTTATGATTTGGGTACAATTGAATATCATGTTAATGACAGACTTCCTATTGTTGAATGGAAATTCAAGTTGGCTAATATGGGAGCYGCTGGTGTAAACGATGCTCAACAGGCTGCTGCTGCCGGTGGCGATGATTCGACATCTATGAAACATGCAGCTTCTGTGTCTGATTTGACCTTTGTTGTTGATTCTAAAACCGAGCATTCCACAAGA";
            teste2.sequenceA = "TTTTG";
            teste2.sequenceB = "TTGGA";

            teste2.methodSequencing = dna.MethodSequencing.SEMIGLOBAL;
            teste2.gap = -1;
            teste2.match = 2;
            teste2.misMatch = -2;

            var calculation = dna.CalculationFactory.createCalculation(teste2);

            calculation.calculationNode();
            calculation.findAligns();

            assert.ok(calculation.getOutputAlign(), "Find Aligns");

            var c = dna.Connected;
            var inputResultAlign = new dna.InputResultAlign();
            inputResultAlign.connecteds = [c.N, c.NW, c.W];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.N, c.NW, c.W]" );

            inputResultAlign.connecteds = [c.N, c.W, c.NW];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.N, c.W, c.NW]" );

            inputResultAlign.connecteds = [c.NW, c.N, c.W];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.NW, c.N, c.W]" );

            inputResultAlign.connecteds = [c.NW, c.W, c.N];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.NW, c.W, c.N]" );

            inputResultAlign.connecteds = [c.W, c.NW, c.W];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.W, c.NW, c.W]" );

            inputResultAlign.connecteds = [c.W, c.N, c.NW];

            calculation.setInputResultAlign(inputResultAlign);

            calculation.findAlign();
            console.log("\n**********************\n");
            assert.ok(calculation.getOutputResultAlign(), "find Align [c.W, c.N, c.NW]" );

        } catch (e){
            assert.throws(function (){
                return "ERROR";
            }, e);
        }
    });

}(window.dna));
