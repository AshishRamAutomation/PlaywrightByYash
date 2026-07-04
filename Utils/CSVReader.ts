import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

export class CsvReader {
  /**
   * Reads a CSV file synchronously and returns data matching a specific test name.
   * @param relativeFilePath - The path to the CSV file relative to project root
   * @param testName - The exact test name value to look up and isolate
   */
  static getDataForTest(relativeFilePath: string, testName: string): any {
    const safeRelativeFilePath = relativeFilePath.trim();
    const absolutePath = path.resolve(process.cwd(), safeRelativeFilePath);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`CSV file not found at: ${absolutePath}`);
    }

    // Read raw file content synchronously
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');

    // Parse records into an array of JSON objects
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    // Find and return the first row matching the provided test name string
    const testData = records.find((row: any) =>
      row.testName === testName ||
      row.TestName === testName ||
      row.testname === testName
    );

    if (!testData) {
      throw new Error(`No CSV test data row found matching test name: "${testName}"`);
    }

    return testData;
    
  }
}